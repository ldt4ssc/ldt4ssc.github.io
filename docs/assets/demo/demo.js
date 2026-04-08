// docs/assets/demo/demo.js
//
// UI wiring for the solar LDT demo. Imports all logic modules and wires
// them to the DOM. No business logic lives here — this module only calls
// broker / solar-model / overpass / weather and renders their results.
//
// Skill: solar-demo-ui (see .claude/skills/solar-demo-ui/SKILL.md)

import maplibregl          from 'https://esm.sh/maplibre-gl@4?bundle';
import * as echarts        from 'https://esm.sh/echarts@5';
import * as broker         from './broker.js';
import { generateHistorical, generateForecast } from './solar-model.js';
import { fetchBuildings }  from './overpass.js';
import { fetchForecast }   from './weather.js';

// ── Module-level state ────────────────────────────────────────────────────

const state = {
  selectedEntityId: null,        // currently selected building URN
  scenario:         'historical', // 'historical' | 'forecast'
  weatherData:      null,         // last fetchForecast().data
  queryHighlight:   null,         // Set<entityId> of last query-console results, or null
  lat:              49.6116,
  lon:              6.1319,
};

let map              = null;
let chartInstance    = null;
let hoveredEntityId  = null;
let focusedListIndex = -1;

// ── Utility helpers ───────────────────────────────────────────────────────

/**
 * Syntax-highlight a JSON string by wrapping tokens in <span> elements.
 * HTML-safe: escapes < > & in string values before injection.
 * @param {string} json  Already-formatted JSON string.
 * @returns {string}     HTML string.
 */
function highlightJson(json) {
  // Escape HTML in the full string first, then re-wrap tokens
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Regex groups:
  // 1. Object key (string followed by colon)
  // 2. String value (not followed by colon)
  // 3. Number
  // 4. Keyword (true/false/null)
  return escaped.replace(
    /(&quot;(?:(?!&quot;).)*&quot;\s*:)|(&quot;(?:(?!&quot;).)*&quot;)|([-\d.+eE]+\b)|(true|false|null)/g,
    (_, key, str, num, kw) => {
      if (key) return `<span class="demo-json-key">${key}</span>`;
      if (str) return `<span class="demo-json-string">${str}</span>`;
      if (num) return `<span class="demo-json-number">${num}</span>`;
      if (kw)  return `<span class="demo-json-keyword">${kw}</span>`;
      return _;
    }
  );
}

/**
 * Compute the bounding box [[minLon, minLat], [maxLon, maxLat]] of a list
 * of NGSI-LD Building entities based on their location polygon.
 * @param {Object[]} entities
 * @returns {number[][] | null}
 */
function computeBounds(entities) {
  let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
  let found = false;
  for (const e of entities) {
    const ring = e.location?.value?.coordinates?.[0];
    if (!ring) continue;
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      found = true;
    }
  }
  return found ? [[minLon, minLat], [maxLon, maxLat]] : null;
}

/**
 * Construct a full NGSI-LD Building entity from an Overpass GeoJSON feature.
 * @param {Object} feature  GeoJSON Feature with properties from overpass.js
 * @returns {Object}  Full NGSI-LD entity object.
 */
function buildEntityFromFeature(feature) {
  const p = feature.properties;
  return {
    id:   `urn:ngsi-ld:Building:demo:osm-way-${p.osmId}`,
    type: 'Building',
    name: {
      type:  'Property',
      value: p.name || `Building ${p.osmId}`,
    },
    location: {
      type:  'GeoProperty',
      value: feature.geometry,
    },
    rooftopArea: {
      type:     'Property',
      value:    p.rooftopArea,
      unitCode: 'MTK',
    },
    installedCapacity: {
      type:     'Property',
      value:    p.installedCapacity,
      unitCode: 'KWT',
    },
    tiltAngle: {
      type:     'Property',
      value:    p.tiltAngle,
      unitCode: 'DD',
    },
    generatedPower: {
      type:       'Property',
      value:      0,
      unitCode:   'KWT',
      observedAt: new Date().toISOString(),
    },
    '@context': [
      'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.8.jsonld',
      './solar-demo-context.jsonld',
    ],
  };
}

/**
 * Build an approximate circle as a closed GeoJSON ring (lon/lat pairs).
 * @param {number} centerLng
 * @param {number} centerLat
 * @param {number} radiusM   Radius in metres.
 * @param {number} [steps=32]
 * @returns {number[][]}  Closed outer ring.
 */
function _buildCirclePolygon(centerLng, centerLat, radiusM, steps = 32) {
  const coords = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const dLat  = (radiusM / 110540) * Math.cos(angle);
    const dLon  = (radiusM / (111320 * Math.cos(centerLat * Math.PI / 180))) * Math.sin(angle);
    coords.push([centerLng + dLon, centerLat + dLat]);
  }
  return coords;
}

/**
 * Highlight a set of entities on the map as query results.
 * Matched entities turn amber; unmatched are dimmed.
 * Pass null to clear the highlight and restore default opacity.
 * @param {string[] | null} matchedIds  Array of full entity URNs, or null to clear.
 */
function applyQueryHighlight(matchedIds) {
  state.queryHighlight = matchedIds ? new Set(matchedIds) : null;
  if (map) {
    const all = broker.queryEntities({ type: 'Building' });
    for (const entity of all) {
      const matched = state.queryHighlight ? state.queryHighlight.has(entity.id) : false;
      map.setFeatureState(
        { source: 'buildings-source', id: entity.id },
        { queryMatch: matched }
      );
    }
    if (state.queryHighlight) {
      map.setPaintProperty('buildings-fill', 'fill-opacity', [
        'case',
        ['boolean', ['feature-state', 'queryMatch'], false], 0.0,
        0.15,
      ]);
    } else {
      map.setPaintProperty('buildings-fill', 'fill-opacity', [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 0.75,
        0.55,
      ]);
    }
  }
  // Refresh entity list to show/clear query-match styling
  renderEntityList();
  updateClearButton();
}

// ── Map initialisation ────────────────────────────────────────────────────

/**
 * Initialise the MapLibre GL map and return the instance.
 * All sources, layers, and event handlers are set up inside map.on('load').
 * @returns {maplibregl.Map}
 */
function initMap() {
  const m = new maplibregl.Map({
    container:          'map',
    attributionControl: false,
    center:             [state.lon, state.lat],
    zoom:               14,
    style: {
      version: 8,
      sources: {
        'osm': {
          type:        'raster',
          tiles:       ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize:    256,
          attribution: '© OpenStreetMap contributors',
          maxzoom:     19,
        },
      },
      layers: [{
        id:      'osm',
        type:    'raster',
        source:  'osm',
        paint:   { 'raster-opacity': 0.7 },  // muted so data layer dominates
      }],
    },
  });

  m.on('load', () => {
    addMapSources(m);
    addMapLayers(m);
    wireMapEvents(m);
  });

  return m;
}

/** Add GeoJSON sources for buildings and selection highlight. */
function addMapSources(m) {
  m.addSource('buildings-source', {
    type:      'geojson',
    data:      { type: 'FeatureCollection', features: [] },
    promoteId: 'entityId',  // allows setFeatureState with string IDs
  });

  m.addSource('selected-source', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });
}

/** Add building polygon layers in correct z-order. */
function addMapLayers(m) {
  // All-buildings fill
  m.addLayer({
    id:     'buildings-fill',
    type:   'fill',
    source: 'buildings-source',
    paint:  {
      'fill-color':   '#e8a33d',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 0.75,
        0.55,
      ],
    },
  });

  // All-buildings stroke
  m.addLayer({
    id:     'buildings-stroke',
    type:   'line',
    source: 'buildings-source',
    paint:  {
      'line-color': '#c47f1a',
      'line-width': 1,
    },
  });

  // Query-console highlight layer — amber fill for matched buildings
  m.addLayer({
    id:     'buildings-query',
    type:   'fill',
    source: 'buildings-source',
    paint:  {
      'fill-color':   '#f59e0b',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'queryMatch'], false], 0.85,
        0,
      ],
    },
  });

  // Selected building fill (above others)
  m.addLayer({
    id:     'selected-fill',
    type:   'fill',
    source: 'selected-source',
    paint:  {
      'fill-color':   '#e8a33d',
      'fill-opacity': 0.85,
    },
  });

  // Selected building stroke
  m.addLayer({
    id:     'selected-stroke',
    type:   'line',
    source: 'selected-source',
    paint:  {
      'line-color': '#c47f1a',
      'line-width': 2.5,
    },
  });
}

/** Wire mousemove, mouseleave, and click on the map. */
function wireMapEvents(m) {
  m.on('mousemove', 'buildings-fill', (e) => {
    m.getCanvas().style.cursor = 'pointer';
    if (e.features.length > 0) {
      const id = e.features[0].properties.entityId;
      if (id !== hoveredEntityId) {
        setHoveredEntity(id);
      }
    }
  });

  m.on('mouseleave', 'buildings-fill', () => {
    m.getCanvas().style.cursor = '';
    setHoveredEntity(null);
  });

  // Keep lat/lon inputs and state in sync with map center as user pans/zooms
  m.on('moveend', () => {
    const center = m.getCenter();
    state.lat = center.lat;
    state.lon = center.lng;
    document.getElementById('lat-input').value = center.lat.toFixed(6);
    document.getElementById('lon-input').value = center.lng.toFixed(6);
  });

  m.on('click', (e) => {
    const features = m.queryRenderedFeatures(e.point, { layers: ['buildings-fill'] });
    if (features.length > 0) {
      selectEntity(features[0].properties.entityId);
    } else {
      selectEntity(null);
    }
  });
}

/**
 * Sync the buildings-source GeoJSON from broker state.
 * Called after any broker mutation that affects building geometry or existence.
 */
function updateMapBuildings() {
  if (!map) return;
  const entities = broker.queryEntities({ type: 'Building' });
  const features = entities.map(e => ({
    type:       'Feature',
    geometry:   e.location.value,
    properties: {
      entityId: e.id,
      name:     e.name?.value || e.id,
    },
  }));
  map.getSource('buildings-source').setData({ type: 'FeatureCollection', features });
}

/**
 * Set the selected-source to a single building polygon (or empty).
 * @param {string | null} entityId
 */
function updateMapSelection(entityId) {
  if (!map) return;
  if (!entityId) {
    map.getSource('selected-source').setData({ type: 'FeatureCollection', features: [] });
    return;
  }
  try {
    const entity = broker.getEntity(entityId);
    map.getSource('selected-source').setData({
      type:     'FeatureCollection',
      features: [{
        type:       'Feature',
        geometry:   entity.location.value,
        properties: { entityId },
      }],
    });
  } catch (_) {
    map.getSource('selected-source').setData({ type: 'FeatureCollection', features: [] });
  }
}

/**
 * Update hover feature state and entity list row highlight.
 * @param {string | null} entityId
 */
function setHoveredEntity(entityId) {
  if (hoveredEntityId && map) {
    map.setFeatureState({ source: 'buildings-source', id: hoveredEntityId }, { hover: false });
  }
  hoveredEntityId = entityId;
  if (entityId && map) {
    map.setFeatureState({ source: 'buildings-source', id: entityId }, { hover: true });
  }
  // Sync list highlight
  document.querySelectorAll('#entity-list li').forEach(li => {
    if (li.dataset.id === entityId) {
      li.classList.add('demo-entity-hovered');
    } else {
      li.classList.remove('demo-entity-hovered');
    }
  });
}

// ── Initialization flow ───────────────────────────────────────────────────

/**
 * Seed historical temporal data for a single entity.
 * Pushes 7×24 = 168 observations into the broker temporal store.
 * @param {Object} entity  Full NGSI-LD entity.
 */
async function seedHistoricalData(entity) {
  const observations = generateHistorical(entity);
  for (const obs of observations) {
    broker.updateAttribute(entity.id, 'generatedPower', obs.value, obs.observedAt);
  }
}

/**
 * Handle "Fetch buildings" button click.
 * Full async initialization flow: fetch → create entities → seed data → render.
 */
async function handleFetchBuildings() {
  const latVal = parseFloat(document.getElementById('lat-input').value);
  const lonVal = parseFloat(document.getElementById('lon-input').value);
  if (isNaN(latVal) || isNaN(lonVal)) {
    setStatus('init-status', 'Enter valid latitude and longitude.', 'error');
    return;
  }
  state.lat = latVal;
  state.lon = lonVal;

  const btn = document.getElementById('fetch-btn');
  btn.disabled    = true;
  btn.textContent = 'Loading…';
  setStatus('init-status', '', '');

  try {
    const result = await fetchBuildings(state.lat, state.lon);

    if (result.warning) {
      setStatus('init-status', result.warning, 'error');
    }

    let newCount = 0;
    for (const feature of result.features) {
      const entity = buildEntityFromFeature(feature);
      try {
        broker.createEntity(entity);
        await seedHistoricalData(entity);
        newCount++;
      } catch (e) {
        if (!e.message.includes('already exists')) throw e;
        // silently skip duplicates (re-fetch scenario)
      }
    }

    updateMapBuildings();
    applyQueryHighlight(null);

    // Fit map to all entities
    const allEntities = broker.queryEntities({ type: 'Building' });
    const bounds = computeBounds(allEntities);
    if (bounds) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 17 });
    }

    if (!result.warning) {
      const src = result.source === 'live' ? 'live Overpass API' :
                  result.source === 'cache' ? 'cache' : 'bundled fallback';
      setStatus('init-status',
        `Loaded ${result.features.length} buildings from ${src}${newCount < result.features.length ? ` (${result.features.length - newCount} already in broker)` : ''}.`,
        'success');
    }

    renderEntityList();
    document.getElementById('sec-entities').open = true;

    // If in forecast mode, pre-fetch weather
    if (state.scenario === 'forecast') {
      const wr = await fetchForecast(state.lat, state.lon);
      state.weatherData = wr.data;
      if (wr.warning) setStatus('init-status', wr.warning, 'error');
      renderScenarioSection();
    }

  } catch (err) {
    setStatus('init-status', `Error: ${err.message}`, 'error');
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Fetch buildings';
  }
}

// ── Entity selection ──────────────────────────────────────────────────────

/**
 * Select an entity (or deselect with null). Syncs all panels.
 * @param {string | null} entityId
 */
function selectEntity(entityId) {
  state.selectedEntityId = entityId;
  focusedListIndex = -1;
  updateMapSelection(entityId);
  renderEntityList();
  renderChart();
  renderRawPanel();
  // Pre-fill temporal and patch console inputs with the selected entity's short ID
  const shortId = entityId ? entityId.split(':').pop() : '';
  const temporalInput = document.getElementById('qp-entity-id');
  if (temporalInput) temporalInput.value = shortId;
  const patchInput = document.getElementById('qp-patch-id');
  if (patchInput) patchInput.value = shortId;
  updateClearButton();
}

/** Show the "Clear selection" button whenever there is an active selection or query highlight. */
function updateClearButton() {
  const btn = document.getElementById('clear-selection-btn');
  if (!btn) return;
  btn.hidden = !state.selectedEntityId && !state.queryHighlight;
}

// ── Sidebar renderers ─────────────────────────────────────────────────────

/**
 * Render the entity list from current broker state, applying the filter.
 */
function renderEntityList() {
  const filter  = (document.getElementById('entity-filter').value || '').toLowerCase();
  const entities = broker.queryEntities({ type: 'Building' });
  // Only log when not already logged by updateMapBuildings (avoid duplicate on fetch flow)

  const base = filter
    ? entities.filter(e =>
        (e.name?.value || '').toLowerCase().includes(filter) ||
        e.id.toLowerCase().includes(filter))
    : entities;

  // Sort: highlighted (selected or query-matched) entities float to the top
  const isHighlighted = (e) =>
    e.id === state.selectedEntityId ||
    (state.queryHighlight && state.queryHighlight.has(e.id));
  const filtered = [
    ...base.filter(isHighlighted),
    ...base.filter(e => !isHighlighted(e)),
  ];

  document.getElementById('entity-count').textContent = entities.length;

  const ul = document.getElementById('entity-list');
  ul.innerHTML = '';

  for (let i = 0; i < filtered.length; i++) {
    const e  = filtered[i];
    const li = document.createElement('li');
    li.dataset.id   = e.id;
    li.dataset.index = i;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', isHighlighted(e) ? 'true' : 'false');

    if (isHighlighted(e))          li.classList.add('demo-entity-selected');
    if (e.id === hoveredEntityId)  li.classList.add('demo-entity-hovered');

    const nameEl = document.createElement('span');
    nameEl.className    = 'demo-entity-name';
    nameEl.textContent  = e.name?.value || e.id;

    const idEl = document.createElement('span');
    idEl.className   = 'demo-entity-id';
    // Show last segment of URN for compactness
    idEl.textContent = e.id.split(':').pop();

    li.appendChild(nameEl);
    li.appendChild(idEl);

    li.addEventListener('click', () => selectEntity(e.id));
    ul.appendChild(li);
  }

  // Keyboard navigation (arrow keys on the <ul>)
  ul.onkeydown = (evt) => {
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(evt.key)) return;
    evt.preventDefault();
    const items = [...ul.querySelectorAll('li')];
    if (!items.length) return;
    if (evt.key === 'ArrowDown') {
      focusedListIndex = Math.min(focusedListIndex + 1, items.length - 1);
    } else if (evt.key === 'ArrowUp') {
      focusedListIndex = Math.max(focusedListIndex - 1, 0);
    } else if ((evt.key === 'Enter' || evt.key === ' ') && focusedListIndex >= 0) {
      selectEntity(items[focusedListIndex].dataset.id);
      return;
    }
    if (focusedListIndex >= 0) {
      const target = items[focusedListIndex];
      target.scrollIntoView({ block: 'nearest' });
      selectEntity(target.dataset.id);
    }
  };
}

/**
 * Sync the scenario toggle buttons and weather summary panel.
 */
function renderScenarioSection() {
  const btnHist = document.getElementById('toggle-historical');
  const btnFore = document.getElementById('toggle-forecast');
  const summary = document.getElementById('weather-summary');

  const isHistorical = state.scenario === 'historical';
  btnHist.classList.toggle('demo-toggle-active', isHistorical);
  btnFore.classList.toggle('demo-toggle-active', !isHistorical);
  btnHist.setAttribute('aria-pressed', String(isHistorical));
  btnFore.setAttribute('aria-pressed', String(!isHistorical));

  if (!isHistorical && state.weatherData) {
    summary.removeAttribute('hidden');
    const cc   = state.weatherData.hourly.cloudcover        || [];
    const rad  = state.weatherData.hourly.shortwave_radiation || [];
    const src  = state.weatherData._source || 'live';

    const validCc  = cc.filter(v => v != null);
    const validRad = rad.filter(v => v != null);
    const meanCc   = validCc.length  ? Math.round(validCc.reduce((a, b) => a + b, 0)  / validCc.length)  : '—';
    const meanRad  = validRad.length ? Math.round(validRad.reduce((a, b) => a + b, 0) / validRad.length) : '—';

    const srcClass = `demo-source-${src}`;
    const srcLabel = src === 'live' ? 'Live Open-Meteo' :
                     src === 'cache' ? 'Cached' : 'Bundled fallback';

    summary.innerHTML = `
      <div class="demo-weather-stat">
        <span class="demo-weather-stat-label">Mean cloud cover</span>
        <span class="demo-weather-stat-value">${meanCc}<span class="demo-weather-stat-unit"> %</span></span>
      </div>
      <div class="demo-weather-stat">
        <span class="demo-weather-stat-label">Mean shortwave</span>
        <span class="demo-weather-stat-value">${meanRad}<span class="demo-weather-stat-unit"> W/m²</span></span>
      </div>
      <div class="demo-source-badge ${srcClass}">Source: ${srcLabel}</div>
    `;
  } else {
    summary.setAttribute('hidden', '');
  }
}

/**
 * Render the ECharts time-series for the currently selected entity.
 * For forecast mode, lazily fetches weather data if not yet available.
 */
async function renderChart() {
  const hint = document.getElementById('chart-hint');

  if (!state.selectedEntityId) {
    hint.removeAttribute('hidden');
    return;
  }

  let observations;
  try {
    if (state.scenario === 'historical') {
      const temporal = broker.getTemporalEntity(state.selectedEntityId);
      observations   = temporal.generatedPower || [];
    } else {
      // Forecast mode
      if (!state.weatherData) {
        const wr = await fetchForecast(state.lat, state.lon);
        state.weatherData     = wr.data;
        state.weatherData._source = wr.source;
        if (wr.warning) setStatus('init-status', wr.warning, 'error');
        renderScenarioSection();
      }
      const entity = broker.getEntity(state.selectedEntityId);
      observations = generateForecast(entity, state.weatherData);
    }
  } catch (err) {
    hint.textContent = `Could not load data: ${err.message}`;
    hint.removeAttribute('hidden');
    return;
  }

  if (!observations || observations.length === 0) {
    hint.textContent = 'No time-series data available for this entity.';
    hint.removeAttribute('hidden');
    return;
  }

  hint.setAttribute('hidden', '');
  updateChart(observations);
}

/**
 * Lazily initialize ECharts and update the chart with new observations.
 * @param {{ value: number, observedAt: string }[]} observations
 */
function updateChart(observations) {
  const el = document.getElementById('chart');
  if (!chartInstance) {
    chartInstance = echarts.init(el);
  }
  chartInstance.setOption(buildChartOption(observations), true);
}

/**
 * Build the ECharts option object for the given observations.
 * In forecast mode, the tooltip also shows cloud cover at the same index.
 * @param {{ value: number, observedAt: string }[]} observations
 * @returns {Object}  ECharts option.
 */
function buildChartOption(observations) {
  // Sort chronologically — broker appends in push order which may not be sorted
  const sorted = [...observations].sort((a, b) => new Date(a.observedAt) - new Date(b.observedAt));
  const data = sorted.map(o => [+new Date(o.observedAt), o.value]);
  const isForecast = state.scenario === 'forecast';
  const cloudcover = isForecast ? (state.weatherData?.hourly?.cloudcover || []) : [];
  const times      = isForecast ? (state.weatherData?.hourly?.time       || []) : [];

  return {
    grid: { top: 12, right: 12, bottom: 48, left: 52 },
    xAxis: {
      type:        'time',
      axisLabel:   {
        fontSize:    11,
        color:       '#5c6370',
        formatter:   (val) => {
          const d = new Date(val);
          const day  = d.getUTCDate().toString().padStart(2, '0');
          const mon  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()];
          const hh   = d.getUTCHours().toString().padStart(2, '0');
          const mm   = d.getUTCMinutes().toString().padStart(2, '0');
          return `${day} ${mon}\n${hh}:${mm}`;
        },
      },
      minInterval: 3600 * 1000 * 6,  // tick every 6 h
      splitLine:   { show: false },
      axisLine:    { lineStyle: { color: '#d7dbe3' } },
    },
    yAxis: {
      type:        'value',
      min:         0,
      name:        'kW',
      nameTextStyle: { color: '#5c6370', fontSize: 11 },
      axisLabel:   { fontSize: 11, color: '#5c6370' },
      splitLine:   { lineStyle: { color: '#e3e6eb' } },
      axisLine:    { show: false },
    },
    tooltip: {
      trigger:   'axis',
      formatter: (params) => {
        if (!params || !params.length) return '';
        const p   = params[0];
        const ts  = new Date(p.axisValue);
        const day = ts.getUTCDate().toString().padStart(2, '0');
        const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][ts.getUTCMonth()];
        const hh  = ts.getUTCHours().toString().padStart(2, '0');
        const mm  = ts.getUTCMinutes().toString().padStart(2, '0');
        let html  = `<b>${day} ${mon} ${hh}:${mm}</b><br>${p.value[1].toFixed(2)} kW`;

        if (isForecast && times.length) {
          // Find closest time index
          const iso     = ts.toISOString().slice(0, 16);  // YYYY-MM-DDTHH:MM
          const idx     = times.findIndex(t => t.startsWith(iso));
          const cc      = idx >= 0 ? cloudcover[idx] : null;
          if (cc != null) html += `<br>Cloud cover: ${cc}%`;
        }
        return html;
      },
    },
    series: [{
      type:        'line',
      data,
      smooth:      false,
      symbol:      'none',
      lineStyle:   { color: '#c47f1a', width: 1.5 },
      areaStyle:   null,
      emphasis:    {
        areaStyle: { color: 'rgba(232, 163, 61, 0.18)' },
      },
    }],
  };
}

/**
 * Render the Raw NGSI-LD panel (JSON tab) for the selected entity.
 */
function renderRawPanel() {
  const jsonPre  = document.getElementById('raw-json');
  const curlPre  = document.getElementById('raw-curl');

  if (!state.selectedEntityId) {
    jsonPre.innerHTML  = '';
    curlPre.textContent = '';
    return;
  }

  try {
    const entity  = broker.getEntity(state.selectedEntityId);
    jsonPre.innerHTML   = highlightJson(JSON.stringify(entity, null, 2));
    curlPre.textContent = entity._curl || '';
  } catch (_) {
    jsonPre.innerHTML   = '';
    curlPre.textContent = '';
  }
}

/** Refresh all sidebar panels from current state. */
function renderAll() {
  renderEntityList();
  renderScenarioSection();
  renderChart();
  renderRawPanel();
}

// ── Export / Import ───────────────────────────────────────────────────────

function handleExport() {
  try {
    const data  = broker.exportAll();
    const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/ld+json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = 'ldt-demo-export.jsonld';
    a.click();
    URL.revokeObjectURL(url);
    setStatus('export-status', `Exported ${data.entities.length} entities.`, 'success');
  } catch (err) {
    setStatus('export-status', `Export failed: ${err.message}`, 'error');
  }
}

async function handleImport(file) {
  if (!file) return;
  try {
    const text   = await file.text();
    const data   = JSON.parse(text);
    const result = broker.importAll(data);
    state.selectedEntityId = null;
    state.weatherData      = null;
    updateMapBuildings();
    updateMapSelection(null);
    renderAll();
    setStatus('export-status', `Imported ${result.count} entities.`, 'success');

    // Fit map to imported entities
    const entities = broker.queryEntities({ type: 'Building' });
    const bounds   = computeBounds(entities);
    if (bounds && map) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 17 });
    }
    if (entities.length > 0) {
      document.getElementById('sec-entities').open = true;
    }
  } catch (err) {
    setStatus('export-status', `Import failed: ${err.message}`, 'error');
  }
}

// ── Address search ────────────────────────────────────────────────────────

function initAddressSearch() {
  const input   = document.getElementById('address-input');
  const results = document.getElementById('address-results');
  let timer     = null;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 3) { closeAddressDropdown(); return; }
    timer = setTimeout(() => fetchAddressSuggestions(q), 400);
  });

  input.addEventListener('blur', () => {
    setTimeout(closeAddressDropdown, 150);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAddressDropdown();
  });
}

async function fetchAddressSuggestions(query) {
  try {
    const url  = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;
    const resp = await fetch(url, { headers: { 'Referer': 'https://knowledgehub.ldt4ssc.eu' } });
    if (!resp.ok) { closeAddressDropdown(); return; }
    const data = await resp.json();
    renderAddressDropdown(data);
  } catch (_) {
    closeAddressDropdown();
  }
}

function renderAddressDropdown(results) {
  const ul = document.getElementById('address-results');
  ul.innerHTML = '';
  if (!results || !results.length) { ul.setAttribute('hidden', ''); return; }

  for (const r of results) {
    const li = document.createElement('li');
    li.textContent = r.display_name;
    li.addEventListener('mousedown', (e) => {
      e.preventDefault();  // prevent blur from firing first
      const lat = parseFloat(r.lat);
      const lon = parseFloat(r.lon);
      document.getElementById('lat-input').value = lat.toFixed(6);
      document.getElementById('lon-input').value = lon.toFixed(6);
      state.lat = lat;
      state.lon = lon;
      if (map) map.flyTo({ center: [lon, lat], zoom: 15 });
      document.getElementById('address-input').value = '';
      closeAddressDropdown();
    });
    ul.appendChild(li);
  }
  ul.removeAttribute('hidden');
}

function closeAddressDropdown() {
  document.getElementById('address-results').setAttribute('hidden', '');
}

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Set the text content and style class of a status paragraph.
 * @param {string} elementId
 * @param {string} message
 * @param {'error'|'success'|'info'|''} type
 */
function setStatus(elementId, message, type) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className   = 'demo-status' + (type ? ` demo-status-${type}` : '');
}

// ── Query console ─────────────────────────────────────────────────────────

/**
 * Execute the query console operation, update map highlight, and show curl.
 */
async function handleRunQuery() {
  const op      = document.getElementById('query-op').value;
  const curlEl  = document.getElementById('query-curl');
  const copyBtn = document.getElementById('query-copy-btn');

  setStatus('query-status', 'Running…', 'info');
  curlEl.textContent = '';
  copyBtn.hidden     = true;

  try {
    if (op === 'queryEntities') {
      const radius = parseFloat(document.getElementById('qp-radius').value) || 200;
      const ring   = _buildCirclePolygon(state.lon, state.lat, radius);
      const result = broker.queryEntities({
        type:        'Building',
        georel:      'within',
        geometry:    'Polygon',
        coordinates: [ring],
      });
      applyQueryHighlight(result.map(e => e.id));
      if (result.length > 0) selectEntity(result[0].id);
      setStatus('query-status', `${result.length} building(s) matched within ${radius} m`, 'success');
      curlEl.textContent = result._curl || '';
      copyBtn.hidden     = !result._curl;

    } else if (op === 'getTemporalEntity') {
      const shortId = document.getElementById('qp-entity-id').value.trim();
      if (!shortId) { setStatus('query-status', 'Enter an entity ID.', 'error'); return; }
      const fullId  = shortId.startsWith('urn:') ? shortId
        : `urn:ngsi-ld:Building:demo:${shortId}`;
      const timerel = document.getElementById('qp-timerel').value;
      const timeAtRaw = document.getElementById('qp-timeat').value;
      const timeAt  = timeAtRaw ? new Date(timeAtRaw).toISOString() : undefined;
      const result  = broker.getTemporalEntity(fullId, timerel, timeAt);
      const observations = Array.isArray(result.generatedPower) ? result.generatedPower : [];
      applyQueryHighlight([fullId]);
      selectEntity(fullId);
      // Override chart with time-filtered observations from the query
      const hint = document.getElementById('chart-hint');
      if (observations.length > 0) {
        hint.setAttribute('hidden', '');
        updateChart(observations);
      } else {
        hint.textContent = 'No observations in that time range.';
        hint.removeAttribute('hidden');
      }
      const obsCount = observations.length;
      setStatus('query-status', `Found — ${obsCount} generatedPower observation(s)`, 'success');
      curlEl.textContent = result._curl || '';
      copyBtn.hidden     = !result._curl;

    } else if (op === 'patchAttr') {
      const shortId = document.getElementById('qp-patch-id').value.trim();
      if (!shortId) { setStatus('query-status', 'Enter an entity ID.', 'error'); return; }
      const fullId   = shortId.startsWith('urn:') ? shortId
        : `urn:ngsi-ld:Building:demo:${shortId}`;
      const attrName = document.getElementById('qp-attr-name').value;
      const rawVal   = document.getElementById('qp-attr-value').value.trim();
      const value    = rawVal !== '' && !isNaN(rawVal) ? parseFloat(rawVal) : rawVal;
      const result   = broker.updateAttribute(fullId, attrName, value, new Date().toISOString());
      applyQueryHighlight([fullId]);
      setStatus('query-status', `Patched ${attrName} on ${shortId.split(':').pop()}`, 'success');
      curlEl.textContent = result._curl || '';
      copyBtn.hidden     = !result._curl;
      renderAll();
    }
  } catch (err) {
    setStatus('query-status', err.message, 'error');
  }
}

// ── Main entry point ──────────────────────────────────────────────────────

function main() {
  // Initialise map
  map = initMap();

  // Seed lat/lon inputs from default state
  document.getElementById('lat-input').value = state.lat;
  document.getElementById('lon-input').value = state.lon;

  // Address search
  initAddressSearch();

  // Fetch buildings
  document.getElementById('fetch-btn').addEventListener('click', handleFetchBuildings);

  // Entity filter
  document.getElementById('entity-filter').addEventListener('input', renderEntityList);

  // Clear selection
  document.getElementById('clear-selection-btn').addEventListener('click', () => {
    selectEntity(null);
    applyQueryHighlight(null);
  });

  // Scenario toggle
  document.getElementById('toggle-historical').addEventListener('click', () => {
    if (state.scenario === 'historical') return;
    state.scenario = 'historical';
    renderScenarioSection();
    renderChart();
  });
  document.getElementById('toggle-forecast').addEventListener('click', () => {
    if (state.scenario === 'forecast') return;
    state.scenario = 'forecast';
    renderScenarioSection();
    renderChart();
  });

  // Raw NGSI-LD tabs
  document.getElementById('tab-json').addEventListener('click', () => {
    document.getElementById('tab-json').classList.add('demo-tab-active');
    document.getElementById('tab-curl').classList.remove('demo-tab-active');
    document.getElementById('tab-json').setAttribute('aria-selected', 'true');
    document.getElementById('tab-curl').setAttribute('aria-selected', 'false');
    document.getElementById('raw-panel-json').removeAttribute('hidden');
    document.getElementById('raw-panel-curl').setAttribute('hidden', '');
  });
  document.getElementById('tab-curl').addEventListener('click', () => {
    document.getElementById('tab-curl').classList.add('demo-tab-active');
    document.getElementById('tab-json').classList.remove('demo-tab-active');
    document.getElementById('tab-curl').setAttribute('aria-selected', 'true');
    document.getElementById('tab-json').setAttribute('aria-selected', 'false');
    document.getElementById('raw-panel-curl').removeAttribute('hidden');
    document.getElementById('raw-panel-json').setAttribute('hidden', '');
  });

  // Copy curl
  document.getElementById('copy-curl-btn').addEventListener('click', () => {
    const text = document.getElementById('raw-curl').textContent;
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copy-curl-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
      });
    }
  });

  // Query console
  document.getElementById('query-op').addEventListener('change', () => {
    const op = document.getElementById('query-op').value;
    document.getElementById('qp-geo').hidden      = op !== 'queryEntities';
    document.getElementById('qp-temporal').hidden = op !== 'getTemporalEntity';
    document.getElementById('qp-patch').hidden    = op !== 'patchAttr';
  });
  document.getElementById('query-run-btn').addEventListener('click', handleRunQuery);
  document.getElementById('query-copy-btn').addEventListener('click', () => {
    const text = document.getElementById('query-curl').textContent;
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('query-copy-btn');
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy curl'; }, 1500);
      });
    }
  });

  // Export / Import
  document.getElementById('export-btn').addEventListener('click', handleExport);
  document.getElementById('import-input').addEventListener('change', (e) => {
    handleImport(e.target.files[0]);
    e.target.value = '';  // allow re-import of same file
  });

  // ECharts resize on window resize and when chart section is opened
  window.addEventListener('resize', () => { chartInstance?.resize(); });
  document.getElementById('sec-chart').addEventListener('toggle', () => {
    if (document.getElementById('sec-chart').open) {
      setTimeout(() => { chartInstance?.resize(); }, 50);
    }
  });
}

main();
