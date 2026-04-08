# pip install httpx
#
# tools/fetch_fallback_data.py
#
# Re-generate the bundled fallback dataset under docs/assets/demo/fallback/.
# Fetches live data from Overpass API (building footprints) and Open-Meteo
# (7-day hourly forecast) for a given location, then writes:
#
#   docs/assets/demo/fallback/buildings.geojson
#   docs/assets/demo/fallback/forecast.json
#
# Usage:
#   python tools/fetch_fallback_data.py [--lat 49.6116] [--lon 6.1319] [--radius 500]
#
# Default location: Luxembourg City (Kirchberg area)

import argparse
import json
import math
import sys
from pathlib import Path

import httpx

# ---- Paths ----

_REPO_ROOT  = Path(__file__).resolve().parent.parent
_FALLBACK   = _REPO_ROOT / 'docs' / 'assets' / 'demo' / 'fallback'

# ---- Constants ----

_OVERPASS_URL   = 'https://overpass-api.de/api/interpreter'
_OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'
_MAX_BUILDINGS  = 200
_TIMEOUT        = 30.0  # seconds

# ---- Helpers ----

def _polygon_area_m2(ring: list[list[float]]) -> float:
    """Shoelace formula → m², approximate (flat-earth) for small polygons."""
    n = len(ring) - 1  # exclude closing duplicate
    lat_sum = sum(pt[1] for pt in ring[:n])
    lat_centroid = lat_sum / n if n > 0 else 0

    area_deg2 = 0.0
    j = n - 1
    for i in range(n):
        area_deg2 += ring[j][0] * ring[i][1]
        area_deg2 -= ring[i][0] * ring[j][1]
        j = i
    area_deg2 = abs(area_deg2) / 2.0

    m_per_deg_lon = 111320.0 * math.cos(math.radians(lat_centroid))
    m_per_deg_lat = 110540.0
    return area_deg2 * m_per_deg_lon * m_per_deg_lat


def _overpass_to_features(elements: list[dict]) -> list[dict]:
    """Convert Overpass way elements (with geometry) to GeoJSON Features."""
    features = []
    for way in elements:
        geom = way.get('geometry')
        if not geom or len(geom) < 3:
            continue

        # Overpass gives {lat, lon} — swap to GeoJSON [lon, lat]
        ring = [[pt['lon'], pt['lat']] for pt in geom]
        if ring[0] != ring[-1]:
            ring.append(ring[0][:])

        rooftop_area       = round(_polygon_area_m2(ring), 1)
        installed_capacity = round(rooftop_area * 0.70 * 0.15, 2)

        features.append({
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [ring],
            },
            'properties': {
                'osmId':            way['id'],
                'name':             (way.get('tags') or {}).get('name'),
                'rooftopArea':      rooftop_area,
                'installedCapacity': installed_capacity,
                'tiltAngle':        30,
            },
        })
    return features


# ---- Fetch functions ----

def fetch_buildings(lat: float, lon: float, radius_m: int = 500) -> tuple[list[dict], int]:
    """Fetch building footprints from Overpass. Returns (features, count)."""
    query = (
        f'[out:json][timeout:25][maxsize:50000000];\n'
        f'way["building"](around:{radius_m},{lat},{lon});\n'
        f'out geom;'
    )
    print(f'  → POST {_OVERPASS_URL}  (radius={radius_m}m around {lat},{lon})')

    with httpx.Client(timeout=_TIMEOUT) as client:
        resp = client.post(
            _OVERPASS_URL,
            data={'data': query},
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
        )
    resp.raise_for_status()

    elements = resp.json().get('elements', [])[:_MAX_BUILDINGS]
    features = _overpass_to_features(elements)
    return features, len(elements)


def fetch_forecast(lat: float, lon: float) -> dict:
    """Fetch 7-day hourly forecast from Open-Meteo."""
    params = {
        'latitude':      lat,
        'longitude':     lon,
        'hourly':        'cloudcover,shortwave_radiation',
        'forecast_days': 7,
        'timezone':      'auto',
    }
    print(f'  → GET {_OPEN_METEO_URL}')

    with httpx.Client(timeout=_TIMEOUT) as client:
        resp = client.get(_OPEN_METEO_URL, params=params)
    resp.raise_for_status()
    return resp.json()


# ---- Main ----

def main() -> None:
    parser = argparse.ArgumentParser(
        description='Regenerate docs/assets/demo/fallback/ from live APIs.'
    )
    parser.add_argument('--lat',    type=float, default=49.6116, help='Latitude  (default: Luxembourg City)')
    parser.add_argument('--lon',    type=float, default=6.1319,  help='Longitude (default: Luxembourg City)')
    parser.add_argument('--radius', type=int,   default=500,     help='Search radius in metres (default: 500)')
    args = parser.parse_args()

    _FALLBACK.mkdir(parents=True, exist_ok=True)

    # Buildings
    print('Fetching buildings from Overpass …')
    features, raw_count = fetch_buildings(args.lat, args.lon, args.radius)
    buildings_path = _FALLBACK / 'buildings.geojson'
    buildings_path.write_text(
        json.dumps({'type': 'FeatureCollection', 'features': features}, indent=2),
        encoding='utf-8',
    )
    print(f'  ✓ {len(features)} buildings written  (raw Overpass count: {raw_count}, capped at {_MAX_BUILDINGS})')

    # Forecast
    print('Fetching forecast from Open-Meteo …')
    forecast = fetch_forecast(args.lat, args.lon)
    forecast_path = _FALLBACK / 'forecast.json'
    forecast_path.write_text(json.dumps(forecast, indent=2), encoding='utf-8')
    n_hours = len(forecast.get('hourly', {}).get('time', []))
    print(f'  ✓ {n_hours} forecast hours written')

    print(f'\nWritten {len(features)} buildings and {n_hours} forecast hours for lat={args.lat} lon={args.lon}')
    print(f'  {buildings_path.relative_to(_REPO_ROOT)}')
    print(f'  {forecast_path.relative_to(_REPO_ROOT)}')


if __name__ == '__main__':
    try:
        main()
    except httpx.HTTPStatusError as exc:
        print(f'HTTP error: {exc.response.status_code} from {exc.request.url}', file=sys.stderr)
        sys.exit(1)
    except httpx.RequestError as exc:
        print(f'Request failed: {exc}', file=sys.stderr)
        sys.exit(1)
