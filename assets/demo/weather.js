// docs/assets/demo/weather.js
//
// Open-Meteo forecast client.
// Pure ES module — zero DOM, zero window references.
//
// Public API:
//   fetchForecast(lat, lon)
//   → { data: OpenMeteoHourlyResponse, source: 'live'|'cache'|'fallback', warning?: string }
//
// Skill: ngsi-ld-authoring (see .claude/skills/ngsi-ld-authoring/SKILL.md)

const _OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';
const _ARCHIVE_URL    = 'https://archive-api.open-meteo.com/v1/archive';
const _CACHE_PREFIX   = 'ldt4ssc_weather_';
const _CACHE_PREFIX_H = 'ldt4ssc_hist_';
const _TIMEOUT_MS     = 15000;

// ---- Public API ----

/**
 * Fetch a 7-day hourly weather forecast from Open-Meteo.
 * Returns cloudcover (%) and shortwave_radiation (W/m²) per hour.
 * Results are cached in sessionStorage for the session.
 * Falls back to the bundled forecast on any network/API error.
 *
 * @param {number} lat  Latitude in degrees (WGS84).
 * @param {number} lon  Longitude in degrees (WGS84).
 * @returns {Promise<{ data: Object, source: string, warning?: string }>}
 *   data shape: { hourly: { time: string[], cloudcover: number[], shortwave_radiation: number[] } }
 */
export async function fetchForecast(lat, lon) {
  const cacheKey = `${_CACHE_PREFIX}${lat.toFixed(3)}_${lon.toFixed(3)}`;

  // --- Cache hit ---
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return { data: JSON.parse(cached), source: 'cache' };
  }

  // --- Live fetch ---
  const params = new URLSearchParams({
    latitude:     lat,
    longitude:    lon,
    hourly:       'cloudcover,shortwave_radiation',
    forecast_days: 7,
    timezone:     'auto'
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), _TIMEOUT_MS);

  try {
    const resp = await fetch(`${_OPEN_METEO_URL}?${params}`, {
      signal: controller.signal
    });

    clearTimeout(timer);

    if (!resp.ok) {
      throw new Error(`Open-Meteo returned HTTP ${resp.status}`);
    }

    const data = await resp.json();
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return { data, source: 'live' };

  } catch (err) {
    clearTimeout(timer);
    console.warn('[weather.js] Live fetch failed, using fallback:', err.message);
    return _loadFallback();
  }
}

/**
 * Fetch past N days of hourly weather from the Open-Meteo ERA5 archive.
 * Returns the same data shape as fetchForecast.
 * On any error returns { data: null } so the caller can fall back to synthetic generation.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {number} [days=7]
 * @returns {Promise<{ data: Object|null, source: 'live'|'cache'|'fallback', warning?: string }>}
 */
export async function fetchHistorical(lat, lon, days = 7) {
  const endDate   = new Date(Date.now() - 86400000);        // yesterday (latest available)
  const startDate = new Date(endDate.getTime() - (days - 1) * 86400000);
  const fmt = d => d.toISOString().slice(0, 10);            // YYYY-MM-DD

  const cacheKey = `${_CACHE_PREFIX_H}${lat.toFixed(3)}_${lon.toFixed(3)}_${fmt(startDate)}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return { data: JSON.parse(cached), source: 'cache' };

  const params = new URLSearchParams({
    latitude:   lat,
    longitude:  lon,
    hourly:     'cloudcover,shortwave_radiation',
    start_date: fmt(startDate),
    end_date:   fmt(endDate),
    timezone:   'auto',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), _TIMEOUT_MS);

  try {
    const resp = await fetch(`${_ARCHIVE_URL}?${params}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!resp.ok) throw new Error(`Open-Meteo archive HTTP ${resp.status}`);
    const data = await resp.json();
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return { data, source: 'live' };
  } catch (err) {
    clearTimeout(timer);
    console.warn('[weather.js] Historical fetch failed, falling back to synthetic:', err.message);
    return {
      data:    null,
      source:  'fallback',
      warning: 'Could not reach Open-Meteo archive — historical data is synthetic.',
    };
  }
}

/**
 * Load the bundled fallback forecast dataset.
 * @returns {Promise<{ data: Object, source: 'fallback', warning: string }>}
 */
async function _loadFallback() {
  const resp = await fetch('./fallback/forecast.json');
  const data = await resp.json();
  return {
    data,
    source:  'fallback',
    warning: 'Could not reach Open-Meteo — showing bundled example forecast.'
  };
}
