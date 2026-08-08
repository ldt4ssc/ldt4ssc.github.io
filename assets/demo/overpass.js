// docs/assets/demo/overpass.js
//
// Overpass API client for fetching OSM building footprints.
// Pure ES module — zero DOM, zero window references.
//
// Public API:
//   fetchBuildings(lat, lon, radiusM = 500)
//   → { features: GeoJSON.Feature[], source: 'live'|'cache'|'fallback', warning?: string }
//
// Skill: ngsi-ld-authoring (see .claude/skills/ngsi-ld-authoring/SKILL.md)

const _OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const _CACHE_PREFIX = 'ldt4ssc_overpass_';
const _TIMEOUT_MS   = 15000;
const _MAX_BUILDINGS = 200;

// ---- Internal helpers ----

/**
 * Squared Euclidean distance from an Overpass element's centroid to (lat, lon).
 * Used for proximity sorting only — no need for true distance.
 * @param {Object} element  Overpass way element with geometry array.
 * @param {number} lat
 * @param {number} lon
 * @returns {number}
 */
function _dist2(element, lat, lon) {
  const geom = element.geometry;
  if (!geom || geom.length === 0) return Infinity;
  let sumLat = 0, sumLon = 0;
  for (const pt of geom) { sumLat += pt.lat; sumLon += pt.lon; }
  const cLat = sumLat / geom.length;
  const cLon = sumLon / geom.length;
  return (cLat - lat) ** 2 + (cLon - lon) ** 2;
}

/**
 * Return a new array of elements sorted by ascending distance from (lat, lon).
 * @param {Object[]} elements
 * @param {number} lat
 * @param {number} lon
 * @returns {Object[]}
 */
function _sortByDistance(elements, lat, lon) {
  return [...elements].sort((a, b) => _dist2(a, lat, lon) - _dist2(b, lat, lon));
}

/**
 * Compute the area of a closed GeoJSON ring ([lon, lat] pairs) in m²
 * using the Shoelace formula with WGS84 degree-to-metre scaling.
 *
 * @param {number[][]} ring  Closed polygon outer ring — first === last.
 * @returns {number}  Area in m², always positive.
 */
function _polygonAreaM2(ring) {
  // Compute centroid latitude for scaling
  const n = ring.length - 1;
  let latSum = 0;
  for (let i = 0; i < n; i++) latSum += ring[i][1];
  const latCentroid = latSum / n;

  // Shoelace formula on raw degree coordinates
  let areaDeg2 = 0;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    areaDeg2 += ring[j][0] * ring[i][1];
    areaDeg2 -= ring[i][0] * ring[j][1];
  }
  areaDeg2 = Math.abs(areaDeg2) / 2;

  // Scale to m²: 1° lon ≈ 111320·cos(lat) m, 1° lat ≈ 110540 m
  const mPerDegLon = 111320 * Math.cos(latCentroid * Math.PI / 180);
  const mPerDegLat = 110540;
  return areaDeg2 * mPerDegLon * mPerDegLat;
}

/**
 * Convert an array of Overpass `way` elements (with `geometry` arrays) to
 * GeoJSON Features with solar-relevant properties.
 *
 * @param {Object[]} elements  Overpass way elements.
 * @returns {Object[]}  GeoJSON Feature objects.
 */
function _overpassToFeatures(elements) {
  const features = [];

  for (const way of elements) {
    if (!way.geometry || way.geometry.length < 3) continue;

    // Overpass geometry: [{lat, lon}, ...] — convert to GeoJSON [lon, lat]
    const ring = way.geometry.map(pt => [pt.lon, pt.lat]);

    // Ensure ring is closed
    const first = ring[0], last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      ring.push([first[0], first[1]]);
    }

    const rooftopArea      = Math.round(_polygonAreaM2(ring) * 10) / 10;
    const installedCapacity = Math.round(rooftopArea * 0.70 * 0.15 * 100) / 100;

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [ring]
      },
      properties: {
        osmId:            way.id,
        name:             way.tags?.name || null,
        rooftopArea,
        installedCapacity,
        tiltAngle:        30
      }
    });
  }

  return features;
}

// ---- Public API ----

/**
 * Fetch building footprints around a point from Overpass API.
 * Results are cached in sessionStorage for the session.
 * Falls back to the bundled dataset on any network/API error.
 *
 * @param {number} lat      Latitude in degrees (WGS84).
 * @param {number} lon      Longitude in degrees (WGS84).
 * @param {number} [radiusM=500]  Search radius in metres.
 * @returns {Promise<{ features: Object[], source: string, warning?: string }>}
 */
export async function fetchBuildings(lat, lon, radiusM = 500) {
  const cacheKey = `${_CACHE_PREFIX}${lat.toFixed(3)}_${lon.toFixed(3)}`;

  // --- Cache hit ---
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return { features: JSON.parse(cached), source: 'cache' };
  }

  // --- Live fetch ---
  const query = `[out:json][timeout:25][maxsize:50000000];\nway["building"](around:${radiusM},${lat},${lon});\nout geom;`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), _TIMEOUT_MS);

  try {
    const resp = await fetch(_OVERPASS_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    `data=${encodeURIComponent(query)}`,
      signal:  controller.signal
    });

    clearTimeout(timer);

    if (!resp.ok) {
      throw new Error(`Overpass returned HTTP ${resp.status}`);
    }

    const json     = await resp.json();
    const sorted   = _sortByDistance(json.elements || [], lat, lon);
    const elements = sorted.slice(0, _MAX_BUILDINGS);
    const features = _overpassToFeatures(elements);

    sessionStorage.setItem(cacheKey, JSON.stringify(features));
    return { features, source: 'live' };

  } catch (err) {
    clearTimeout(timer);
    console.warn('[overpass.js] Live fetch failed, using fallback:', err.message);
    return _loadFallback();
  }
}

/**
 * Load the bundled fallback building dataset.
 * @returns {Promise<{ features: Object[], source: 'fallback', warning: string }>}
 */
async function _loadFallback() {
  const resp     = await fetch('./fallback/buildings.geojson');
  const geojson  = await resp.json();
  return {
    features: geojson.features || [],
    source:   'fallback',
    warning:  'Could not reach Overpass API — showing bundled example data.'
  };
}
