---
schema_version: 1
type: general
date: 2026-10-15
title: "Madrid Open Data catalog audit completed to power the multi-resolution H3 Smart Mesh"
tags:
  - smart-mesh
  - open-data
  - geospatial
  - mobility
  - green-it
  - h3
work_strand: WS1
authors:
  - name: "Andrés Julián"
    organisation: "capillar IT"
  - name: "Javier Esquillor"
    organisation: "capillar IT"
related_assets:
  - "https://github.com/Capillar-IT/ldt4ssc-newg/blob/main/docs/madrid-open-data-h3-smart-mesh.md"
  - "https://datos.madrid.es/dataset"
  - "https://gemelo.madrid.es/en/"
---

We have completed a comprehensive technical audit and live stream verification of the **Madrid Open Data Portal (`datos.madrid.es`)**, `informo.madrid.es`, and `mc30.es` across 131 catalog entries to map the real-time and structural city feeds that power the **NeWG+ H3 Spatial Smart Mesh**.

## Key findings: Zero-hardware city context baseline

Direct inspection of the live XML, KML, and JSON streams confirms that Madrid already publishes all foundational real-time and structural layers needed to initialize the multi-resolution **Uber H3 Smart Mesh** without deploying redundant roadside traffic sensors:

1. **Real-Time Street Closures & Roadworks (`Calles Cortadas` — every 5 minutes)**:
   - Surface street and municipal tunnel incidences via `incid_aytomadrid.xml` (`202062-0`) and KML vector geometries (`PTINFO.kml`, `208252-0`), complemented by M-30 ring-road active closures (`incidencias.xml`, `212171-0`) and scheduled maintenance (`ObrasPlanificados.xml`, `212422-0`).
   - Every `<Incidencia>` record provides native WGS84 (`latitud`, `longitud`) and UTM coordinates, start/end validity windows (`fh_inicio`, `fh_final`), and cause flags (`es_obras`, `es_accidente`, `es_contaminacion`) for immediate H3 cell and edge indexing.
2. **Traffic Speed, Road Load & Level of Service (every 5 minutes across 4,000+ loop detectors)**:
   - Live loop telemetry (`pm.xml`, `202087-0`) reporting intensity (`<intensidad>`), occupancy (`<ocupacion>`), load (`<carga>` 0–100%), and service level (`<nivelServicio>` 0–3), paired with M-30 travel-time estimations (`EstimacionesTrafico.xml`, `212132-0`) and the structural **Annual Average Daily Speed by Street Segment (`300340-0-trafico-velocidad`)**.
3. **Urban Freight & Loading Bay Saturation (`DUM 360`)**:
   - Geolocated inventory of public loading/unloading bays (`208072-0-carga-descarga`) combined with historical **DUM 360 check-in/check-out ticket logs (`300747-0-tiques-carga-descarga`)**, enabling hourly bay-occupancy probability curves around **Mercado de Maravillas** (and extensible via `200967-0-mercados` across Madrid's municipal market network).
4. **Environmental, ZBE & Food-Safety Layers**:
   - Real-time hourly Air Quality API (`calair_tiemporeal.json`, `212531-0`), Low Emission Zone (ZBE) OCR camera locations (`300654-0`), public EV fast-charging stations (`208979-0`), Mercamadrid wholesale volumes (`300357-0`), and Madrid Salud food-safety inspection baselines (`300382-0`).

## Multi-resolution H3 indexing & Green IT selective ingestion

Using these verified feeds, the NeWG+ Smart Mesh structures urban context across three spatial resolutions:

- **H3 Resolution 8 (≈ 0.74 km²)**: Macro-corridors (M-30 trunk routes from Mercamadrid), real-time NO₂ / PM₂.₅ / PM₁₀ air quality interpolation, and district/neighborhood aggregation.
- **H3 Resolution 9 (≈ 0.105 km²)**: 5-minute effective traversal speed `V_H3(t)` combining structural segment speed (`300340-0`) with live road load (`pm.xml`) and active street-closure blocks (`202062-0`).
- **H3 Resolution 10 (≈ 0.015 km²)**: Micro-logistics dock capacity and DUM 360 loading-bay saturation probability `P_sat(h, t + ΔETA)` at each destination market node.

In line with our **Eco-Design / Green IT** commitment supervised with **Mines Paris — PSL**, external high-cost feeds (such as FCD/telco packages) are only activated in H3 cells and time windows where the marginal gain in ETA and time-window precision justifies the additional data, compute, and energy cost—targeting a **60–80% reduction in compute overhead** compared to continuous raw streaming.

Full technical details and dataset mappings are documented in [`docs/madrid-open-data-h3-smart-mesh.md`](https://github.com/Capillar-IT/ldt4ssc-newg/blob/main/docs/madrid-open-data-h3-smart-mesh.md).
