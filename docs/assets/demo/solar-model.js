// docs/assets/demo/solar-model.js
//
// Synthetic solar generation model. Pure ES module — zero DOM, zero window references.
// Produces NGSI-LD-shaped {value, observedAt} observations from building entity data.
//
// Two modes:
//   generateHistorical — past N days, deterministic per-building cloud cover
//   generateForecast   — forward window driven by Open-Meteo hourly data
//
// Skill: ngsi-ld-authoring (see .claude/skills/ngsi-ld-authoring/SKILL.md)

// ---- Internal helpers ----

/** Convert degrees to radians. */
function _toRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Day-of-year (1–365) from a UTC Date.
 * @param {Date} date
 * @returns {number}
 */
function _dayOfYear(date) {
  const jan1 = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.floor((date.getTime() - jan1) / 86400000) + 1;
}

/**
 * Centroid of a GeoJSON polygon outer ring.
 * @param {number[][]} ring  Array of [lon, lat] pairs (closed — first === last).
 * @returns {number[]}       [lon, lat]
 */
function _centroid(ring) {
  const n = ring.length - 1; // exclude closing duplicate
  let lon = 0, lat = 0;
  for (let i = 0; i < n; i++) {
    lon += ring[i][0];
    lat += ring[i][1];
  }
  return [lon / n, lat / n];
}

/**
 * Deterministic pseudo-random in [0, 1) using a linear congruential generator.
 * Same seed always produces the same value — essential for repeatable historical data.
 * @param {number} seed  Integer seed.
 * @returns {number}
 */
function _seededRandom(seed) {
  return ((seed * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/**
 * Derive a numeric seed from a string (entity id).
 * Uses djb2-style hash.
 * @param {string} str
 * @returns {number}  Non-negative integer.
 */
function _stringSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

/**
 * Compute the clear-sky cos(zenith) for a given latitude, day-of-year, and UTC hour.
 * Returns 0 for sub-horizon angles (night).
 *
 * Formula:
 *   declination  = 23.45° × sin(360°/365 × (284 + doy))
 *   hour_angle   = 15° × (utcHour − 12)
 *   cos(zenith)  = sin(lat)×sin(dec) + cos(lat)×cos(dec)×cos(ha)
 *
 * @param {number} latDeg   Latitude in degrees.
 * @param {number} doy      Day of year (1–365).
 * @param {number} utcHour  UTC hour (0–23).
 * @returns {number}  cos(zenith), clamped to [0, 1].
 */
function _cosZenith(latDeg, doy, utcHour) {
  const dec = _toRad(23.45 * Math.sin(_toRad(360 / 365 * (284 + doy))));
  const lat = _toRad(latDeg);
  const ha  = _toRad(15 * (utcHour - 12));
  return Math.max(0, Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(ha));
}

/**
 * Convert a building entity's installedCapacity, tiltAngle, and a GHI value (W/m²) to
 * generated power in kW, applying a tilt-angle boost factor.
 *
 * @param {number} installedCapacityKw  Nameplate capacity in kW.
 * @param {number} tiltAngleDeg         Panel tilt in degrees from horizontal.
 * @param {number} ghiWm2               Global Horizontal Irradiance in W/m².
 * @returns {number}  Generated power in kW, rounded to 2 decimal places.
 */
function _power(installedCapacityKw, tiltAngleDeg, ghiWm2) {
  const tiltBoost = 1 + (tiltAngleDeg / 90) * 0.2;
  const kw        = installedCapacityKw * (ghiWm2 / 1000) * tiltBoost;
  return Math.round(Math.max(0, kw) * 100) / 100;
}

// ---- Exports ----

/**
 * Generate synthetic historical generatedPower observations for a building.
 *
 * Produces one observation per UTC hour for the past `days` days, working backwards
 * from the current moment. Cloud cover is seeded per (building-id, day-index) so the
 * same building always produces the same historical curve for a given calendar day.
 *
 * @param {Object} building  Full NGSI-LD Building entity.
 * @param {number} [days=7]  Number of past days to generate.
 * @returns {{ value: number, observedAt: string }[]}
 *   Array of `days × 24` observations in chronological order.
 */
export function generateHistorical(building, days = 7) {
  const ring  = building.location.value.coordinates[0];
  const [, latDeg] = _centroid(ring);
  const cap   = building.installedCapacity.value;
  const tilt  = building.tiltAngle.value;
  const idSeed = _stringSeed(building.id);

  const nowMs    = Date.now();
  const startMs  = nowMs - days * 86400000;
  const result   = [];

  for (let d = 0; d < days; d++) {
    const dayStartMs  = startMs + d * 86400000;
    const date        = new Date(dayStartMs);
    const doy         = _dayOfYear(date);
    const cloudFactor = _seededRandom(idSeed + d); // 0–1, deterministic per building+day

    for (let h = 0; h < 24; h++) {
      const ts     = dayStartMs + h * 3600000;
      const cz     = _cosZenith(latDeg, doy, new Date(ts).getUTCHours());
      const ghi    = 1000 * cz * (1 - 0.75 * cloudFactor);
      const value  = _power(cap, tilt, ghi);
      result.push({ value, observedAt: new Date(ts).toISOString() });
    }
  }

  return result;
}

/**
 * Generate forecast generatedPower observations from Open-Meteo hourly data.
 *
 * Uses shortwave_radiation (W/m²) directly when available — it already incorporates
 * cloud effects. Falls back to cloud-cover-modulated clear-sky GHI when radiation
 * data is absent for a given hour.
 *
 * @param {Object} building      Full NGSI-LD Building entity.
 * @param {Object} weatherData   Open-Meteo hourly response:
 *   { hourly: { time: string[], cloudcover?: number[], shortwave_radiation?: number[] } }
 *   time strings are in the format "YYYY-MM-DDTHH:MM" (local or UTC, treated as UTC).
 * @returns {{ value: number, observedAt: string }[]}
 *   One observation per entry in weatherData.hourly.time.
 */
export function generateForecast(building, weatherData) {
  const ring  = building.location.value.coordinates[0];
  const [, latDeg] = _centroid(ring);
  const cap   = building.installedCapacity.value;
  const tilt  = building.tiltAngle.value;

  const times      = weatherData.hourly.time;
  const cloudcover = weatherData.hourly.cloudcover || [];
  const radiation  = weatherData.hourly.shortwave_radiation || [];

  return times.map((timeStr, i) => {
    // Normalise to UTC ISO — append ':00Z' if no timezone marker present
    const isoStr = /[Zz]$|[+-]\d{2}:\d{2}$/.test(timeStr) ? timeStr : timeStr + ':00Z';
    const date   = new Date(isoStr);

    let ghi;
    if (radiation[i] != null) {
      // shortwave_radiation from Open-Meteo is actual (cloud-affected) W/m²
      ghi = radiation[i];
    } else {
      // Fallback: clear-sky modulated by cloud cover percentage
      const cloudFactor = (cloudcover[i] ?? 0) / 100;
      const cz  = _cosZenith(latDeg, _dayOfYear(date), date.getUTCHours());
      ghi = 1000 * cz * (1 - 0.75 * cloudFactor);
    }

    return {
      value:      _power(cap, tilt, ghi),
      observedAt: date.toISOString()
    };
  });
}
