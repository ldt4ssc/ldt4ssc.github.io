---
title: Pilot obligations
---

# Pilot obligations

What an awarded pilot has to do, build, assess and publish during implementation — gathered
from the Call for Pilots Manuals and grouped by theme rather than by call section, so you can
find an obligation by what it concerns rather than by where it appeared in the call text.

!!! pilot "Reading the codes"
    **Rq** = requirement (binding) · **Rc** = recommendation (expected, not binding).

    **Codes differ between work strands.** The interoperability self-assessment is Rq18 in WS2
    and WS3, while Rq18 in WS1 covers MIMs Plus engagement. Always read the code together with
    your own work strand's column, and check the
    [Call for Pilots Manual](open-calls.md#call-for-pilots-manuals) for the authoritative text.

---

## Build

What has to exist by the end of the pilot.

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| Interconnect **two or more existing LDTs or data platforms** | Rq2 | — | — |
| Develop a **new common LDT** addressing shared needs | — | Rq13 | — |
| **Each public authority implements its own LDT instance** (≥2 instances) | — | Rq13 | Rq13 |
| Provide **management access to all 7 LDT layers** | — | Rq13 | Rq13 |
| Deliver an **advanced capability** — predictive, prospective or prescriptive (WS3 adds diagnostic) | — | Rq15 | Rq15 |
| **End-to-end traceability and proof of dependencies** for all AI components | — | — | Rq33 |

??? abstract "The seven LDT layers"

    Each instance must give management access to:

    1. Data Sources Layer
    2. Data Acquisition Layer
    3. Knowledge Layer *(ML/AI models, in WS3)*
    4. Interoperability Layer
    5. Services Layer
    6. Orchestration Layer
    7. Visualisation Layer

    These map onto the Base / Core / Surface levels used throughout the
    [implementation guidance](implementation.md#three-levels).

!!! pilot "WS3 · AI components in the Marketplace (Rq27)"
    Unless using the LDT AI Notebook, AI models published to the Marketplace must provide:

    - a **deployable KServe package** (Kubernetes via KServe, with InferenceService YAML);
    - an **accessible model artefact location** (resolvable `storageUri`);
    - a **standard inference endpoint** (V2-style API at `/v2/models/{model_name}/infer`);
    - **documented inputs, outputs and runtime** (framework, version).

---

## Interoperate

The technical commitments every pilot makes, whichever strand it is in.

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| **Semantic interoperability via a Linked Data ontology** (MIM1) — NGSI-LD, LDES, SPARQL | Rq16 | Rq17 | Rq17 |
| Engage with at least **5 foundational MIMs Plus** — MIM0, MIM1, MIM2, MIM3, MIM6 | Rq18 | Rq19 | Rq19 |
| **Interoperability self-assessment, score ≥3** by project end | — | Rq18 | Rq18 |
| Deploy a **SIMPL-Open Agent** (Governance Authority Agent) | Rq14 | — | — |

!!! pilot "The ISAQ is a condition for payment"
    Complete the **Interoperability Self-Assessment Questionnaire** during **months 1–2** and
    again in the **second reporting period**. It is a predefined Pilot Deliverable, and
    **a final score above three is a condition for payment**. Submit the completed Excel file
    including all sheets.

    [:octicons-arrow-right-24: Get the ISAQ](../resources_content/tech_resources.md#interoperability-self-assessment-questionnaire-isaq)

The [implementation guidance](implementation.md) and the
[workflows](workflows.md) show how these commitments translate into architecture and build
steps.

---

## Follow the methodology

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| Work through the **four methodology phases** — EXPLORE → VALIDATE → DEFINE → IMPLEMENT | Rq13 | Rq12 | Rq12 |
| Structure the workplan around **Pilot Deliverables PD1–PD5** | ✓ | ✓ | ✓ |

[:octicons-arrow-right-24: The methodology and its 15 workshops](../resources_content/methodology.md)

---

## Engage

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| Engage **end-users** throughout the project lifecycle | Rq10 | Rq8 | Rq8 |
| Involve **3 of 4 quadruple-helix groups** — public, private, research, civil society | Rq10 | Rq9 | Rq9 |
| Maintain **up-to-date documentation** for the consortium | Rq23 | Rq31 | Rq31 |

---

## Share back

Openness is a binding commitment, not an aspiration.

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| Publish **open data models** in open repositories under open licences | Rq23 | Rq28 | Rq28 |
| Contribute assets to the **LDT4SSC Assets and Services Repository** | Rq23 | Rq27 | Rq27 |
| Publish services to the **[EU LDT Marketplace](https://interoperable-europe.ec.europa.eu/collection/ldttoolbox/solution/eu-ldt-marketplace)** | Rq23 | — | Rq27 |
| Document progress on the **LDT4SSC Knowledge Hub** | Rq23 | Rq31 | Rq31 |
| Provide a plan towards an **open-source equivalent** for any proprietary component | Rq23 | ✓ | ✓ |

!!! warning "The Assets & Services Repository is under development"
    It is **not open for submissions yet** — the LDT4SSC team will announce it when it is. The
    obligation still stands, so package and document as you go rather than waiting.

    [:octicons-arrow-right-24: What to prepare](contributing.md#sharing-assets-and-services)

[:octicons-arrow-right-24: Where each kind of output goes](implementation.md#sharing-back)

---

## Sustain

| Obligation | WS1 | WS2 | WS3 |
|---|---|---|---|
| Establish a **contractual framework** guaranteeing LDT/service sustainability | Rq22 | Rq24 | Rq24 |
| Describe **maintenance and expansion** strategy beyond the pilot | Rq24 | Rq25 | Rq25 |

The [Framework and Strategy for Growth and Sustainability](../strategy/index.md) sets out the
conditions these obligations are designed to create, and
[maps 18 capabilities against these same codes](../strategy/priorities.md#capabilities-that-foster-sustainability).

---

## Recommendations

Expected rather than binding — but they shape how a pilot is assessed, and several feed
directly into the sustainability framework.

| Recommendation | Code |
|---|---|
| Assess **LORDIMAS digital maturity** — lead *Digitally Optimised*, others *≥ Moderate* | Rc1 |
| Use **open-source components** and share enhancements back | Rc2 |
| Include **IP and exploitation rights** provisions in the consortium agreement | Rc3 |
| Technically establish a **DCAT catalogue**, a contextualised **data management system** (JSON-LD, RDF, NGSI-LD), **IAM** (OAuth2, OpenID Connect, Verifiable Credentials) and an **ODRL-based data policy** | Rc4 |
| Pursue alignment with the **EU LDT Toolbox** | Rc5 |
| Describe compliance with **Gaia-X, IDSA, DSBA, DSSC Blueprint, DS4SSCC-DEP Blueprint** | Rc6 |
| **Record baseline data** before start, for the Cost-Benefit Analysis | Rc7 |
| Assess **eco-design maturity** against the [General Policy Framework for the Ecodesign of Digital Services](https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf) — at least 30 highest-priority criteria | Rc8 |

---

## Reporting

| Deliverable | When |
|---|---|
| **Interim report** — technical + financial | Mid-term |
| **Final report** — technical + financial | Within 30 days of conclusion |
| **Certificate on Financial Statements** (CFS) | Required if contribution ≥ €325,000 |
| **ISAQ** — first submission | Months 1–2 |
| **ISAQ** — second submission | Second reporting period |

---

!!! info "Where the authoritative text lives"
    This page summarises obligations for day-to-day use. The binding wording is in the
    Call for Pilots Manual for your work strand — see the
    [open-call archive](open-calls.md#call-for-pilots-manuals).
