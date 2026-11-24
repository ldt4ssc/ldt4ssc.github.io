---
schema_version: 1
type: general
date: 2026-11-19
title: "H3 Smart Mesh POC architecture and dynamic spatial-temporal granularity framework defined with Mines Paris - PSL"
tags:
  - smart-mesh
  - h3
  - simulation
  - green-it
  - urban-logistics
  - mercamadrid
work_strand: WS1
authors:
  - name: "Andrés Julián"
    organisation: "capillar IT"
  - name: "Yu Liu"
    organisation: "Mines Paris - PSL"
  - name: "Javier Esquillor"
    organisation: "capillar IT"
  - name: "Alberto L."
    organisation: "capillar IT"
related_assets:
  - "https://github.com/Capillar-IT/ldt4ssc-newg/blob/main/docs/architecture.md"
  - "https://github.com/Capillar-IT/ldt4ssc-newg/blob/main/docs/madrid-emt-and-open-data-catalog.md"
---

Through our November bi-weekly technical working sessions between **capillar IT** and **Mines Paris — PSL**, we have defined the **H3 Spatial Smart Mesh Proof-of-Concept (POC) architecture** and the **spatial-temporal granularity evaluation framework** supporting the **Mercamadrid → Mercado de Maravillas** pilot corridor in Madrid.

## 1. Two-stage H3 Smart Mesh POC architecture

To deliver fast operational validation while keeping compute and infrastructure lean, the Smart Mesh rollout is structured in two progressive stages:

- **Stage 1 — PostgreSQL + H3 Spatial Mesh Baseline**: Ingests Madrid's verified open datasets (`informo.madrid.es` traffic intensity and incidents, `datos.madrid.es` structural segment speeds and DUM loading bays, and **EMT Madrid** off-street parking availability) into **PostgreSQL with the H3 spatial extension**, exposing lightweight coordinate-to-hexagon context queries (`GeoJSON` / `REST`) to compute cell-level traversal speed and curb friction along the **Mercamadrid → Mercado de Maravillas** corridor.
- **Stage 2 — Governed Data-Space Publication & Selective Live Ingestion**: Publishes curated H3 context entities (`NGSI-LD`) through the federated data-space layer and activates dynamic real-time stream ingestion only in cells and time windows where operational uncertainty requires higher frequency.

## 2. Fixed vs. dynamic H3 granularity framework (`R8`, `R9`, `R10`)

Together with **Mines Paris — PSL** (integrating corridor data with **AnyLogic** simulation models), we established the experimental framework to measure how spatial and temporal resolution impacts routing, ETA reliability, and environmental footprint (`Green IT`):

- **Three harmonised variable domains**:
  1. *Vehicle profile*: Payload capacity, vehicle dimensions, access class, and drivetrain (`EV` range under refrigerated load vs. combustion).
  2. *Delivery environment*: Segment speeds, active streetworks/incidents, low-emission zone (`ZBE`) rules, and on-street/off-street parking constraints around **Mercado de Maravillas** (height limits, bay size, rotation, and real-time slot availability).
  3. *Perishable freight*: Volume/weight, handling constraints, cold-chain temperature/humidity requirements (and associated `CO₂` impact), and overlapping B2B/HORECA delivery time windows.
- **Dynamic resolution selection**: Rather than querying the entire metropolitan grid at maximum density, the framework benchmarks **fixed resolution** against **dynamic complexity-driven resolution** across **H3 R8 (≈ 0.74 km²)**, **R9 (≈ 0.105 km²)**, and **R10 (≈ 0.015 km²)**—comparing pre-departure planning estimates against real-time street-level conditions as delivery vehicles approach **Mercado de Maravillas**.
