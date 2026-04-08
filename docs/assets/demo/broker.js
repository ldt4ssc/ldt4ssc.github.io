// docs/assets/demo/broker.js
//
// In-browser NGSI-LD-shaped broker. Pure ES module — zero DOM, zero window references.
// Mimics Stellio's API surface so visitors can explore NGSI-LD concepts without a backend.
// Every exported function attaches a non-enumerable ._curl property to its return value
// containing the equivalent curl command against a hypothetical https://stellio.example.org.
//
// Skill: ngsi-ld-authoring (see .claude/skills/ngsi-ld-authoring/SKILL.md)

// ---- Internal storage ----

const _store    = new Map(); // entityId → entity object (mutable current state)
const _temporal = new Map(); // entityId → Map(attrName → Array<{type, value, unitCode?, observedAt?}>)

// ---- curl helper constants ----

const _STELLIO   = 'https://stellio.example.org';
const _CTX_URL   = 'https://knowledgehub.ldt4ssc.eu/assets/demo/solar-demo-context.jsonld';
const _LINK      = `<${_CTX_URL}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`;
const _CT        = 'application/json';

// ---- Internal helpers ----

/** Attach a non-enumerable, writable ._curl property to obj and return obj. */
function _attach(obj, curlStr) {
  Object.defineProperty(obj, '_curl', { value: curlStr, enumerable: false, writable: true });
  return obj;
}

/** Build a curl command string for the given HTTP method, path, and optional body. */
function _buildCurl(method, path, body) {
  let cmd = `curl -X ${method} '${_STELLIO}${path}'`;
  cmd += `\n  -H 'Content-Type: ${_CT}'`;
  cmd += `\n  -H 'Link: ${_LINK}'`;
  if (body !== undefined) {
    cmd += `\n  -d '${JSON.stringify(body)}'`;
  }
  return cmd;
}

/**
 * Compute the centroid of a GeoJSON polygon outer ring.
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
 * Haversine distance in metres between two [lon, lat] points.
 * @param {number[]} a  [lon, lat]
 * @param {number[]} b  [lon, lat]
 * @returns {number}  Distance in metres.
 */
function _haversineM(a, b) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat +
            Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * sinLon * sinLon;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// ---- Exported broker functions ----

/**
 * Create a new entity in the broker.
 * Equivalent to POST /ngsi-ld/v1/entities
 * Throws if the entity id already exists.
 *
 * @param {Object} entity  Full NGSI-LD entity (id, type, attributes, @context).
 * @returns {Object}       Empty result object with ._curl.
 */
export function createEntity(entity) {
  if (_store.has(entity.id)) {
    throw new Error(`Entity '${entity.id}' already exists — use updateAttribute to modify it`);
  }

  // Store a shallow copy so external mutations don't silently affect broker state
  _store.set(entity.id, { ...entity });

  // Seed temporal store with any initial time-varying attributes (those with observedAt)
  const tmap = new Map();
  for (const [key, attr] of Object.entries(entity)) {
    if (attr && typeof attr === 'object' && attr.type === 'Property' && attr.observedAt) {
      const entry = { type: 'Property', value: attr.value, observedAt: attr.observedAt };
      if (attr.unitCode) entry.unitCode = attr.unitCode;
      tmap.set(key, [entry]);
    }
  }
  _temporal.set(entity.id, tmap);

  return _attach({}, _buildCurl('POST', '/ngsi-ld/v1/entities', entity));
}

/**
 * Retrieve a single entity by id.
 * Equivalent to GET /ngsi-ld/v1/entities/{id}
 * Throws if the entity does not exist.
 *
 * @param {string} id  Entity URN.
 * @returns {Object}   Shallow copy of the stored entity with ._curl.
 */
export function getEntity(id) {
  if (!_store.has(id)) {
    throw new Error(`Entity '${id}' not found`);
  }
  const entity = { ..._store.get(id) };
  return _attach(entity, _buildCurl('GET', `/ngsi-ld/v1/entities/${id}`));
}

/**
 * Query entities with optional type and geo filters.
 * Equivalent to GET /ngsi-ld/v1/entities?...
 *
 * Supported filters:
 *   type        — exact match on entity type
 *   georel      — 'near;maxDistance==<metres>' — tests entity centroid distance to query Point
 *   geometry    — 'Point' (required with georel=near)
 *   coordinates — [lon, lat] of the query point
 *
 * @param {Object} [params]
 * @param {string} [params.type]
 * @param {string} [params.georel]       e.g. 'near;maxDistance==200'
 * @param {string} [params.geometry]     'Point'
 * @param {Array}  [params.coordinates]  [lon, lat]
 * @returns {Array}  Array of shallow-copied matching entities with ._curl on the array.
 */
export function queryEntities({ type, georel, geometry, coordinates } = {}) {
  let results = [..._store.values()];

  if (type) {
    results = results.filter(e => e.type === type);
  }

  // georel=near;maxDistance==<N> with geometry=Point
  if (georel && georel.startsWith('near') && geometry === 'Point' && Array.isArray(coordinates)) {
    const match = georel.match(/maxDistance==(\d+(\.\d+)?)/);
    const maxDist = match ? parseFloat(match[1]) : Infinity;
    const queryPoint = coordinates; // [lon, lat]
    results = results.filter(e => {
      const loc = e.location;
      if (!loc?.value?.coordinates?.[0]) return false;
      const centroid = _centroid(loc.value.coordinates[0]);
      return _haversineM(queryPoint, centroid) <= maxDist;
    });
  }

  const arr = results.map(e => ({ ...e }));

  // Build curl using proper NGSI-LD geo-query syntax (human-readable, not percent-encoded)
  const parts = [];
  if (type)        parts.push(`type=${type}`);
  if (georel)      parts.push(`georel=${georel}`);
  if (geometry)    parts.push(`geometry=${geometry}`);
  if (coordinates) parts.push(`coordinates=${JSON.stringify(coordinates)}`);
  if (georel)      parts.push(`geoproperty=location`);
  const qs = parts.length ? `?${parts.join('&')}` : '';

  return _attach(arr, _buildCurl('GET', `/ngsi-ld/v1/entities${qs}`));
}

/**
 * Clear the temporal history of a single attribute on an entity.
 * Used internally before re-seeding to avoid duplicate observations.
 * No direct Stellio equivalent.
 *
 * @param {string} id        Entity URN.
 * @param {string} attrName  Attribute name.
 */
export function clearTemporalAttr(id, attrName) {
  const tmap = _temporal.get(id);
  if (tmap) tmap.delete(attrName);
}

/**
 * Update a single attribute on an existing entity.
 * Appends the new observation to the temporal store.
 * Equivalent to PATCH /ngsi-ld/v1/entities/{id}/attrs/{attrName}
 * Throws if the entity does not exist.
 *
 * @param {string} id          Entity URN.
 * @param {string} attrName    Attribute name (lowerCamelCase).
 * @param {*}      value       New attribute value.
 * @param {string} [observedAt] ISO 8601 UTC timestamp (required for time-varying attrs).
 * @returns {Object}  Empty result object with ._curl.
 */
export function updateAttribute(id, attrName, value, observedAt) {
  if (!_store.has(id)) {
    throw new Error(`Entity '${id}' not found`);
  }

  const entity   = _store.get(id);
  const existing = entity[attrName];

  // Update current state (mutate stored entity in place)
  if (existing && typeof existing === 'object') {
    entity[attrName] = { ...existing, value };
    if (observedAt !== undefined) entity[attrName].observedAt = observedAt;
  } else {
    entity[attrName] = { type: 'Property', value };
    if (observedAt !== undefined) entity[attrName].observedAt = observedAt;
  }

  // Append to temporal history
  if (!_temporal.has(id)) _temporal.set(id, new Map());
  const tmap = _temporal.get(id);
  if (!tmap.has(attrName)) tmap.set(attrName, []);

  const obs = { type: 'Property', value };
  if (existing?.unitCode) obs.unitCode = existing.unitCode;
  if (observedAt !== undefined) obs.observedAt = observedAt;
  tmap.get(attrName).push(obs);

  const body = { value };
  if (observedAt !== undefined) body.observedAt = observedAt;

  return _attach({}, _buildCurl('PATCH', `/ngsi-ld/v1/entities/${id}/attrs/${attrName}`, body));
}

/**
 * Delete an entity and its temporal history.
 * Equivalent to DELETE /ngsi-ld/v1/entities/{id}
 * Throws if the entity does not exist.
 *
 * @param {string} id  Entity URN.
 * @returns {Object}   Empty result object with ._curl.
 */
export function deleteEntity(id) {
  if (!_store.has(id)) {
    throw new Error(`Entity '${id}' not found`);
  }
  _store.delete(id);
  _temporal.delete(id);
  return _attach({}, _buildCurl('DELETE', `/ngsi-ld/v1/entities/${id}`));
}

/**
 * Retrieve the temporal evolution of an entity's attributes.
 * Equivalent to GET /ngsi-ld/v1/temporal/entities/{id}
 * Throws if the entity does not exist.
 *
 * Time-varying attributes (those with temporal history) are returned as arrays of
 * observations, optionally filtered by timerel + timeAt.
 *
 * @param {string} id          Entity URN.
 * @param {string} [timerel]   'after' | 'before'
 * @param {string} [timeAt]    ISO 8601 UTC timestamp for timerel comparison.
 * @returns {Object}  Entity with time-varying attrs as arrays + ._curl.
 */
export function getTemporalEntity(id, timerel, timeAt) {
  if (!_store.has(id)) {
    throw new Error(`Entity '${id}' not found`);
  }

  const entity = { ..._store.get(id) };
  const tmap   = _temporal.get(id) || new Map();

  for (const [attrName, observations] of tmap.entries()) {
    let filtered = observations;
    if (timerel && timeAt) {
      if (timerel === 'after') {
        filtered = observations.filter(o => o.observedAt && o.observedAt > timeAt);
      } else if (timerel === 'before') {
        filtered = observations.filter(o => o.observedAt && o.observedAt < timeAt);
      }
    }
    entity[attrName] = [...filtered];
  }

  const parts = [];
  if (timerel) parts.push(`timerel=${timerel}`);
  if (timeAt)  parts.push(`timeAt=${timeAt}`);
  const qs = parts.length ? `?${parts.join('&')}` : '';

  return _attach(entity, _buildCurl('GET', `/ngsi-ld/v1/temporal/entities/${id}${qs}`));
}

/**
 * Export the complete broker state as a serialisable snapshot.
 * No direct Stellio equivalent — this is a broker-level utility.
 *
 * @returns {{ entities: Object[], temporal: Object }}  Snapshot with ._curl.
 */
export function exportAll() {
  const entities = [..._store.values()].map(e => ({ ...e }));
  const temporal = {};
  for (const [entityId, tmap] of _temporal.entries()) {
    temporal[entityId] = {};
    for (const [attrName, observations] of tmap.entries()) {
      temporal[entityId][attrName] = [...observations];
    }
  }
  const data = { entities, temporal };
  return _attach(data, '# exportAll — no direct Stellio equivalent\n# Snapshot of all broker entities and temporal histories');
}

/**
 * Replace the broker state with a previously-exported snapshot.
 * Clears all current entities before importing.
 * No direct Stellio equivalent — this is a broker-level utility.
 *
 * @param {{ entities: Object[], temporal: Object }} data  Snapshot produced by exportAll().
 * @returns {{ count: number }}  Number of entities imported, with ._curl.
 */
export function importAll(data) {
  _store.clear();
  _temporal.clear();

  let count = 0;
  for (const entity of (data.entities || [])) {
    _store.set(entity.id, { ...entity });
    _temporal.set(entity.id, new Map());
    count++;
  }

  for (const [entityId, attrMap] of Object.entries(data.temporal || {})) {
    if (!_temporal.has(entityId)) _temporal.set(entityId, new Map());
    const tmap = _temporal.get(entityId);
    for (const [attrName, observations] of Object.entries(attrMap)) {
      tmap.set(attrName, [...observations]);
    }
  }

  const result = { count };
  return _attach(result, '# importAll — no direct Stellio equivalent\n# Restores a broker snapshot produced by exportAll()');
}
