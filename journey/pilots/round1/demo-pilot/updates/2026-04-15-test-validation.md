---
schema_version: 1
type: asset
date: 2026-03-10
title: "Cross-city mobility data model v1.0 released"
tags:
  - mobility
  - data-models
  - interoperability
work_strand: WS2
authors:
  - name: "Jane Doe"
    organisation: "City of Example"
  - name: "John Smith"
    organisation: "Tech Partner Ltd"
related_assets:
  - "https://github.com/example-pilot/data-model-v1"
  - "https://smartdatamodels.org/example"
---

We are releasing version 1.0 of the shared mobility data model we developed
for cross-city queries.

## What the asset is

The model extends the NGSI-LD `Vehicle` and `Road` entity types with a
small set of additional properties needed to support cross-city queries
across heterogeneous municipal datasets. It includes:

- Harmonised timestamp conventions (UTC, ISO 8601).
- A common road-segment identifier format.
- Shared enumeration for vehicle classes used by both cities.

## How to use it

The model is published in our repository under an open licence (CC BY 4.0).
Technical documentation and usage examples are in the repository's `docs/`
folder. We have tested integration against Orion and Stellio context
brokers.

## What comes next

We will contribute this model to the LDT4SSC Assets and Services Repository
once the submission process is finalised. In the meantime, it is available
at the link in the front matter and we welcome feedback from other pilots
who might use or extend it.