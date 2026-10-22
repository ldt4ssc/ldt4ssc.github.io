---
title: Implementation workflows
---

# Implementation workflows

Three worked examples of getting from an existing situation to a working result, one per work
strand. They are **illustrative, not normative**: each goal can be reached in several ways, with
different software and different architecture layouts. What these workflows do is show one
coherent path using resources from this Hub, so that the standards and tools stop being a list
and start being a sequence.

!!! info "How to read these"
    These are neither guidelines nor the sole reference solutions. The examples are intentionally
    concrete but **not technology-agnostic**: they name specific open standards, protocols and
    open-source tools that facilitate interoperability, while recognising other technical
    pathways achieve the same result. Where you deviate, write down why — that reasoning is what
    the [Blueprint](../../blueprint/) needs back from you.

    The Blueprint documents two workflows at a finer grain than these strand-level recipes —
    [adding a new Surface-level component](https://spec.knows.idlab.ugent.be/ldt-interoperability-blueprint/latest/#workflow-adding-new-slc-existing-ldt)
    and [discovering which components work with which twin](https://spec.knows.idlab.ugent.be/ldt-interoperability-blueprint/latest/#workflow-discover-slc-existing-ldt).

!!! pilot "If you are an LDT4SSC pilot"
    Several steps below carry obligations specific to funded pilots — a SIMPL-Open Agent
    (**Rq14**), AI Act compliance (**Rq21**), publication to the EU LDT Marketplace (**Rq27**) and
    federation with WS1 pilots (**Rc4**). These are flagged in teal where they arise, and
    summarised under
    [Obligations and checkpoints](implementation.md#obligations-and-checkpoints).

[:octicons-arrow-left-24: Back to Implementation Guidance](implementation.md){ .md-button }

<div class="workflow-steps" markdown>

## WS1 · Interconnect existing LDTs



**Scenario.** An existing LDT holds its data in [**PostgreSQL**](https://www.postgresql.org/docs/18/index.html),
with PostGIS for geospatial data and TimescaleDB for time series. The source is left
unchanged: an adaptor maps its data to [**NGSI-LD**](https://cim.etsi.org/NGSI-LD/official/front-page.html)
entities, which a context broker exposes, and the LDT joins an existing data space through a
[**SIMPL-Open**](https://code.europa.eu/simpl/simpl-open/documentation/user-manual) Agent
that includes an EDC-based connector.

!!! info "Guiding principle — expose, don't rebuild"
    The legacy twin's internal architecture stays untouched. Interoperability is achieved at
    the boundary, through adaptation and standard interfaces, so each organisation keeps its
    sovereign storage format while becoming legible to the others.


### Step 1 · Semantic and structural alignment


<p class="step-goal"><strong>Goal:</strong> make the existing LDT's data interpretable by other LDTs, by mapping it to open standards and shared models <strong>without changing the source</strong>.</p>

*Define the semantic target*

- Adopt NGSI-LD with the relevant [**Smart Data Models**](https://github.com/smart-data-models)
  as the starting point for contextual data, extending them where needed and contributing
  extensions back to the community.

*Deploy a context broker to manage NGSI-LD entities*

- Configure a [**Stellio**](https://stellio.readthedocs.io/en/latest/) context broker as
  the central component for contextual entity management.
- Expose geospatial layers through [**OGC API Features**](https://docs.ogc.org/is/17-069r4/17-069r4.html)
  interfaces.

*Build and plug mappings using ETL adaptors*

- Use [**JoltTransform Demo**](https://jolt-demo.appspot.com/) to test transformations, and
  [**Apache NiFi**](https://nifi.apache.org/documentation/) (or
  [**FIWARE Draco**](https://fiware-draco.readthedocs.io/en/latest/) within Apache NiFi)
  to map the database to NGSI-LD entities.
- Validate payloads against NGSI-LD and Smart Data Models using
  [**PySmartDataModels**](https://pypi.org/project/pysmartdatamodels/).


### Step 2 · Enable data exchange


<p class="step-goal"><strong>Goal:</strong> describe and register the transformed data so that other participants in the data space can <strong>discover it and request access</strong>.</p>

*Prepare and maintain DCAT-AP metadata to register in the data space*

- Create and maintain [**DCAT-AP**](https://interoperable-europe.ec.europa.eu/collection/semic-support-centre/solution/dcat-application-profile-data-portals-europe/release/300)
  records for datasets and each distribution in the context broker.
- Ensure metadata records follow the **ETSI GR CIM 048** definitions, which map NGSI-LD
  entities to DCAT-AP representations (Catalog, Dataset, Distribution, Data Service).
- Link each record to its **live data source** via unique identifiers, and include key
  metadata such as data source, update frequency, contact information and licence.

*Deploy a SIMPL-Open Agent and publish the catalogue*

- Deploy a SIMPL-Open Agent, which includes an [**EDC**](https://eclipse-edc.github.io/documentation/)-based
  data space connector.

!!! pilot "If you are an LDT4SSC pilot"
    Deploying a **SIMPL-Open Agent is required by Rq14** — it is not optional for WS1 pilots.

- Register the connector's endpoint with the data space operator (e.g. the participant
  responsible for the SIMPL-Open Governance Authority Agent).
- Expose the DCAT-AP metadata via the connector, ensuring alignment with the
  [**Eclipse Dataspace Protocol**](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/).


### Step 3 · Governance integration


<p class="step-goal"><strong>Goal:</strong> make the LDT a <strong>trusted, sovereign participant</strong> in the data space, controlling who accesses its data and on what terms.</p>

*Establish identity and access*

- Configure [**Keycloak**](https://www.keycloak.org/documentation.html) with **OAuth 2.0 /
  OpenID Connect** to manage authentication, role-based access control and token-based
  authorisation across components.

*Attach and apply usage and privacy policies*

- Use [**ODRL**](https://www.w3.org/TR/odrl-model/) to model permissions, prohibitions and
  duties, aligned with the **Gaia-X Trust Framework**.
- Register policies in the SIMPL-Open Agent via the Eclipse Dataspace Protocol.
- Configure the Agent's connector to enforce them at runtime. Where other LDTs query the
  broker directly, **enforce the same policies at the broker** through Stellio's access
  control or [**Open Policy Agent**](https://www.openpolicyagent.org/docs).

*Federate catalogues and context*

- Make the connector's DCAT-AP catalogue available to the data space's **federated
  catalogue**, as maintained by SIMPL-Open.
- Enable inter-LDT interoperability through **NGSI-LD federation** across context brokers.


### Step 4 · Operational and analytical integration


<p class="step-goal"><strong>Goal:</strong> put the interconnection to use for analysis, decision support and participation,</p>
**while keeping shared outputs governed**.

*Build analytical pipelines on the federated context*

- Use NGSI-LD federation as the underlying infrastructure for distributed, semantically
  interoperable access to shared assets across LDT deployments.
- Orchestrate machine learning pipelines with [**Kubeflow**](https://www.kubeflow.org/docs/)
  and deploy trained models with [**KServe**](https://kserve.github.io/website/docs/intro),
  publishing results back to the broker as NGSI-LD entities.

*Deploy visualisation and decision support tools*

- Provide analytical dashboards with [**Grafana**](https://grafana.com/docs/) or
  [**Apache Superset**](https://superset.apache.org/docs/intro) for temporal and tabular
  insights.
- Deliver geospatial visualisations with [**MapLibre**](https://maplibre.org/maplibre-gl-js/docs/)
  or [**kepler.gl**](https://docs.kepler.gl/docs/api-reference), and enable citizen
  participation through [**Decidim**](https://docs.decidim.org/en/develop/index.html).

*Maintain governance in operation*

- Register all shared outputs and analytical services in SIMPL, maintaining DCAT-AP records
  and corresponding policy references.
- Continuously monitor connector and broker logs to verify policy compliance and ensure
  transparency of data flows and usage.


## WS2 · Deploy a new LDT



**Scenario.** Several municipalities jointly specify shared components covering data
acquisition, context management, analytics and user-facing services, which each then
instantiates with its own data. A third-party partner may deliver Core components as
open-source software or operate them as a service with tenant isolation, or build the
Surface-level services that consume them.

!!! info "Guiding principle — data sovereignty"
    Whatever the delivery model, each municipality keeps **ownership of its data, control over
    configuration, and the ability to operate independently**.


### Step 1 · Agree the use case, responsibilities and shared specification


<p class="step-goal"><strong>Goal:</strong> agree what you are building together, who builds each part, and the specification every part must conform to.</p>

*Define the cross-sector use case*, making use of the
[LDT4SSC Methodology](../resources_content/methodology.md):

- Specify the data flows, analytical capabilities and user-facing services to be developed.
- Identify the sources each municipality will contribute, whether existing databases and
  data platforms, new sensors or third-party feeds.

*Survey what already exists, before deciding to build*

- Search the [EU LDT Toolbox](https://interoperable-europe.ec.europa.eu/collection/ldttoolbox)
  catalogue and the [LDT4SSC Asset Repository](implementation.md#sharing-back) for components covering part
  of your use case. Record an explicit **reuse / extend / build** decision for each
  capability.

*Assign responsibilities for development*

- Agree the division of work between consortium members.
- Define the **delivery model**: open-source components deployed locally by municipalities,
  or a service operated by a private partner with tenant isolation.

*Define the interoperability contract*

- Agree data models and entity types (e.g. NGSI-LD with Smart Data Models), selecting
  existing models or proposing new ones where needed.
- Specify interfaces using [**OpenAPI 3.1**](https://spec.openapis.org/oas/v3.1.0.html) for
  synchronous APIs and [**AsyncAPI**](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
  for event-driven interfaces.
- Document the mandatory attributes, update frequencies and data quality requirements all
  parties commit to.


### Step 2 · Prepare and ingest data


<p class="step-goal"><strong>Goal:</strong> each municipality brings its existing and new data into the agreed models through its own ingestion pipelines.</p>

*Inventory and prepare existing data*

- Catalogue existing sources relevant to the use case, including municipal databases, open
  data portals, GIS systems and the **DS4SSCC-DEP Priority Datasets**.
- Assess data quality and identify gaps that require new data collection.

*Deploy sensors and new data sources*

- Install IoT sensors or integrate third-party feeds, accessible via standard protocols
  (**HTTPS**, [**MQTT**](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)).

*Build ingestion pipelines*

- Deploy Apache NiFi as the ETL layer for each municipality.
- Map source data to the agreed entity types, testing transformations in JoltTransform Demo.
- Validate transformed payloads using PySmartDataModels prior to ingestion.


### Step 3 · Deploy context management


<p class="step-goal"><strong>Goal:</strong> give each municipality a context broker holding the <strong>current and historical state</strong> of its entities.</p>

*Deploy the context broker and ingest data*

- Deploy Stellio as the NGSI-LD context broker, or receive a dedicated tenant where the
  private partner operates it as a service.
- Configure the broker to receive entities from the ingestion pipelines, with PostgreSQL
  and PostGIS for persistent and geospatial storage.


### Step 4 · Develop and package the shared Core


<p class="step-goal"><strong>Goal:</strong> build the shared Core components <strong>once</strong>, in a form each municipality can deploy and configure independently.</p>

*If municipalities jointly develop the Core as open-source components*

- Implement data management services and APIs according to the shared specification, in a
  shared code repository with agreed contribution and review processes.
- Package components as [**Docker**](https://docs.docker.com/) containers with
  configuration-driven customisation, so each city can deploy independently.

*If a private partner delivers the Core*

- For **open-source delivery**, provide container images, [**Helm**](https://helm.sh/docs/)
  charts and documentation for municipalities to deploy on their own infrastructure.
- For **delivery as a service**, operate the infrastructure with strict tenant isolation,
  and provide a control plane through which municipalities register data connectors, adjust
  processing parameters, define access policies, monitor system status, and **retrieve or
  purge their data at any time**.


### Step 5 · Develop analytics and AI services


<p class="step-goal"><strong>Goal:</strong> develop shared analytical capabilities each municipality can run on its own data.</p>

*Develop analytical modules*

- Build models addressing the cross-sector use case (e.g. predictive models, anomaly
  detection), prototyped and trained with [**Scikit-Learn**](https://scikit-learn.org/stable/)
  or [**PyTorch**](https://docs.pytorch.org/docs/stable/index.html) and **parameterised so
  each city can retrain on its own data**.
- Use Kubeflow for pipeline orchestration and [**MLflow**](https://mlflow.org/docs/latest/)
  for experiment tracking.

*Deploy inference services*

- Serve models with KServe, consuming NGSI-LD entities and publishing results back to the
  context broker.
- Keep services **stateless**, so they can be deployed per municipality or shared with
  tenant isolation.

*Integrate responsible AI tooling*

- Use [**SHAP**](https://shap.readthedocs.io/en/latest/) for model explainability, and
  [**Evidently AI**](https://docs.evidentlyai.com/) to monitor model drift and data quality
  in production. The [WS3 workflow](#ws3-build-an-ai-based-service) covers AI service development in more
  detail.


### Step 6 · Build Surface-level services


<p class="step-goal"><strong>Goal:</strong> build the user-facing services and visualisations that consume the shared Core.</p>

*Develop Surface-level services on the shared Core*

- Build visualisation tools, citizen-facing applications or domain-specific services that
  consume the Core APIs, respecting each municipality's access policies.
- Deliver them as components municipalities host themselves, or as a service with tenant
  separation.

*Example Surface-level components*

- Grafana dashboards connected to the context broker, from shared templates customised per
  city.
- MapLibre for geospatial visualisation.
- Decidim for citizen participation, connected to relevant Core data within governance
  constraints.


### Step 7 · Deploy locally and configure access


<p class="step-goal"><strong>Goal:</strong> each municipality deploys and configures its own LDT instance from the shared components, and confirms it works end to end.</p>

*Deploy infrastructure*

- Deploy the Core and Surface components on each municipality's infrastructure using the
  provided containers and [**Kubernetes**](https://kubernetes.io/docs/home/) manifests (or
  Docker Compose for simpler setups), or onboard a dedicated tenant where a partner
  operates the service.

*Configure identity and access*

- Integrate Keycloak for authentication and role-based access control using OAuth 2.0 /
  OpenID Connect, with each municipality managing its own users and permissions.

*Customise to local context*

- Apply city-specific configuration for data source endpoints, transformation parameters,
  dashboard branding and language settings, **without code changes**.

*Validate the deployment*

- Run the [**NGSI-LD Test Suite**](https://forge.etsi.org/rep/cim/ngsi-ld-test-suite) to
  verify context broker compliance.
- Validate sample data flows end to end, from ingestion through analytics to Surface-level
  services.


### Step 8 · Integrate governance and data spaces


<p class="step-goal"><strong>Goal:</strong> safeguard each municipality's data sovereignty and enable controlled sharing beyond the consortium.</p>

*Safeguard sovereignty*

- Ensure each municipality retains ownership and control of its data regardless of the
  deployment model. Where a partner operates the service, guarantee data isolation, export
  rights and deletion through **contractual and technical measures**.

*Integrate with data spaces, where applicable*

- Deploy a data space connector
  ([FIWARE Data Space Connector](https://github.com/FIWARE/data-space-connector/tree/main/doc),
  EDC Connector or TRUE Connector) to enable controlled sharing with external parties or
  across the consortium.

!!! pilot "If you are an LDT4SSC pilot"
    **Rc4 encourages federation with WS1 pilots** through a SIMPL-Open Agent, so your twin can
    join the wider interconnection those pilots are building.

- Create DCAT-AP metadata records for datasets and services, exposed via the connector for
  discovery.

*Enforce usage policies*

- Define usage policies using ODRL, aligned with the Gaia-X Trust Framework, with each
  municipality setting its own and connectors enforcing them at runtime.


### Step 9 · Document and publish


<p class="step-goal"><strong>Goal:</strong> ensure the components can be maintained by the municipalities and <strong>reused by other cities</strong>.</p>

*Produce technical documentation*

- Produce architecture documentation, API references, deployment guides and configuration
  recipes.
- Document the interoperability contract and data models for future adopters.

*Train and hand over*

- Deliver training sessions for municipal technical staff on system operation and
  troubleshooting.
- Where a partner operates the service, document **exit procedures** for exporting data and
  migrating to self-hosting or another provider.

*Publish openly*

- Publish jointly developed components under open-source licences to the
  **LDT4SSC Assets Repository**.
- Contribute new data models to the community.


## WS3 · Build an AI-based service



**Scenario.** WS3 pilots develop **at least two AI-based services** that extend existing LDTs
with predictive, prospective or prescriptive capabilities, working mainly at the Surface
level. A private partner typically leads development, with municipalities providing LDT data,
domain expertise and validation environments.

The example use case explores **how road closures and traffic management measures affect
traffic on surrounding streets and, through it, air quality**, so that planners and residents
can see the likely effect of an intervention on their neighbourhood before it happens. The
workflow applies equally to other cross-sectoral cases built on networks, such as energy grids
or water distribution.

!!! info "Guiding principle — replicability by construction"
    Services must be documented and validated with end users so **other cities can replicate
    them**, and must follow responsible AI principles throughout. Design for that from the
    first line of code, not as a final write-up.

!!! info "This is one modelling approach among several"
    The example below learns from historical disruptions using a graph neural network. Other
    services will call for different approaches — forecasting on sensor history, anomaly
    detection, or agent-based simulation where behavioural change matters. Steps 1–2 and 5–9
    apply regardless; steps 3–4 are where your modelling choice lands. The Blueprint's
    [supporting different AI models](https://spec.knows.idlab.ugent.be/ldt-interoperability-blueprint/latest/#support-different-ai-models)
    section covers the interoperability requirements that apply whichever you choose.


### Step 1 · Define the services


<p class="step-goal"><strong>Goal:</strong> agree what the two services predict, the data they need, and the interventions they can <strong>credibly</strong> cover.</p>

*Define the services*

- **Traffic Redistribution Predictor** — estimates traffic on every road segment given
  current conditions and a proposed change to the network.
- **Air Quality Impact Estimator** — estimates the resulting change in NO₂ and PM2.5
  concentrations, and identifies which segments contribute most in each zone.

*Document each service*

- **Inputs:** `TrafficFlowObserved`, `RoadSegment` and `AirQualityObserved` entities, plus
  the proposed network change.
- **Outputs:** predicted traffic per road segment and air quality per zone, with
  uncertainty bounds.
- **User interaction:** an interactive map where users select interventions and see
  predicted impacts.

*Set the scope and check for reuse*

- Limit the scope to **interventions represented in the historical data** (e.g. closures,
  lane reductions, signal changes). Measures that change travel behaviour are outside what
  the models can learn from traffic history.
- Check existing models, including the
  [EU LDT Toolbox](https://interoperable-europe.ec.europa.eu/collection/ldttoolbox)
  **Urban Mobility** and **Pollution Propagation** models, before building from scratch.

*Assess readiness and assign responsibilities*

- Assess each municipality's LDT for the traffic, air quality and disruption data required.
- Agree responsibilities between the private partner and the municipalities, and the
  delivery model.


### Step 2 · Access and prepare the LDT's data


<p class="step-goal"><strong>Goal:</strong> gather and prepare the traffic, air quality and disruption data the models will learn from.</p>

*Access LDT data*

- Retrieve entities from each municipality's LDT through the **NGSI-LD API**, or via
  adaptors where the LDT uses a different set of standards.

*Collect disruption history*

- Gather records of **road works, incidents and events** from municipal sources. These are
  the examples from which the model learns the effect of an intervention.

*Clean and integrate the data*

- Clean the data and temporally align traffic and air quality observations with Apache NiFi.
- Store the integrated datasets in PostgreSQL with PostGIS.


### Step 3 · Build the road graph


<p class="step-goal"><strong>Goal:</strong> represent the road network as a <strong>graph</strong> on which traffic observations and past disruptions can be learned.</p>

*Define the graph*

- Represent each road segment as a **node**, connected to the segments it shares an
  intersection with, carrying capacity, speed limit and lane count as attributes.

*Attach observations and disruptions*

- Attach traffic observations to their segments as time series. Segments without sensors
  stay in the graph **without** observations.
- Encode each historical disruption as a **change to the graph**, with the affected segments
  removed or flagged, paired with the traffic observed while it lasted.
- Version each training dataset with [**DVC**](https://dvc.org/doc).


### Step 4 · Develop and train the models


<p class="step-goal"><strong>Goal:</strong> train models that predict how a change on one road segment affects traffic across the network, and air quality with it.</p>

*Train the traffic model*

- Train a **spatio-temporal graph neural network** in
  [**PyTorch Geometric**](https://pytorch-geometric.readthedocs.io/en/latest/) on both
  normal and disrupted periods, **holding back a set of past disruptions for validation**.
- Estimate uncertainty with an ensemble of models or quantile outputs.

*Train the air quality estimator*

- Train [**XGBoost**](https://xgboost.readthedocs.io/en/stable/) on observed traffic around
  each monitoring station, to be applied to predicted traffic.

*Track and scale training*

- Log all training runs with MLflow, linked to the DVC data version.
- Where partner municipalities **cannot pool data**, train across cities with
  **EU LDT Federated Learning** so each city's data stays local, and use the
  **AI Factories** for GPU capacity where needed.


### Step 5 · Integrate responsible AI


<p class="step-goal"><strong>Goal:</strong> make the services' predictions explainable, open about their uncertainty, and compliant with European AI requirements <strong>before they reach users</strong>.</p>

*Explainability*

- Use **graph explainability methods** to show which segments most influence a predicted
  change, and SHAP to show what drives each air quality estimate.

*Uncertainty communication*

- **Widen the reported uncertainty** for segments without sensors and for interventions
  unlike any in the training history, and flag the latter to users.

*Documentation for trustworthiness*

- Produce a **model card** for each service covering intended use, data sources, performance
  metrics, known limitations and fairness assessments.
!!! pilot "If you are an LDT4SSC pilot"
    **Rq21 requires AI Act compliance** for AI influencing public decisions. **CitCom.ai**'s
    testing services can provide supporting evidence.



### Step 6 · Deploy and serve


<p class="step-goal"><strong>Goal:</strong> make the trained models available as secure, <strong>interactive</strong> services integrated with the LDT.</p>

*Deploy inference services*

- Serve both models using KServe behind the
  [**Open Inference Protocol**](https://kserve.github.io/website/docs/concepts/architecture/data-plane/v2-protocol),
  with each API described in OpenAPI 3.1. Inference takes **milliseconds**, so scenarios
  return interactively.
- Secure the endpoints with Keycloak through OAuth 2.0 / OpenID Connect, so each service
  applies the access policies of the municipality whose data it uses.

*Integrate with LDT data flows*

- Publish predictions back to the context broker as derived entities (e.g.
  `PredictedTrafficFlow`, `PredictedAirQuality`), including confidence intervals, the
  scenario identifier and the model version.

*Monitor and retrain*

- Monitor drift with Evidently AI, and orchestrate retraining with Kubeflow as new data and
  new disruptions arrive.


### Step 7 · Build user-facing services


<p class="step-goal"><strong>Goal:</strong> put the predictions in front of planners, operators and residents in a form they can explore and act on.</p>

*Interactive scenario explorer*

- Build a web application with MapLibre or kepler.gl as the mapping layer, where users close
  segments, adjust traffic measures, compare scenarios, and see predicted impacts
  immediately with uncertainty ranges and explanations.

*Analytical dashboards*

- Deploy Grafana for monitoring model performance and data quality, and Apache Superset for
  exploring past predictions against observed outcomes.

*Immersive and CitiVerse-aligned interfaces*

- For pilots developing CitiVerse features, build 3D/XR visualisations with **Unity**,
  **Unreal** or **Cesium for Unreal**, including **AR for on-site planning sessions**.

*Participatory decision-making*

- Integrate scenario comparisons with Decidim for public consultations, so residents can
  express preferences **with the predicted impacts in view**.


### Step 8 · Validate with users


<p class="step-goal"><strong>Goal:</strong> confirm, with real users and real past events, that the services meet their needs and predict reliably.</p>

*Pilot deployment*

- Deploy the services connected to live LDT data in a controlled pilot phase, where
  predictions inform decisions that **remain with human planners**.

*Technical and end-user validation*

- Compare predictions against the **held-back past disruptions**, and across partner cities
  to verify generalisability.
- Engage traffic engineers, environmental officers and residents in structured testing of
  predictions, explanations and interface usability.

*Iterate*

- Refine models and interfaces where predictions or explanations fall short of user
  expectations or observed outcomes.


### Step 9 · Document, publish and share


<p class="step-goal"><strong>Goal:</strong> make the services <strong>replicable by other cities</strong> and available to the wider LDT ecosystem.</p>

*Document the services*

- Document data requirements, graph construction, the encoding of disruptions, the models
  and their validation, deployment and governance, with a **step-by-step replication guide**
  for other cities.

*Publish to the LDT Toolbox Marketplace*

- Publish the services to the **EU LDT Marketplace**.

!!! pilot "If you are an LDT4SSC pilot"
    Publication to the EU LDT Marketplace is **required by Rq27**.

- Contribute new Smart Data Models (e.g. `PredictedTrafficFlow`) back to the community.

*Share through the data space*

- Expose services and outputs via an **EDC Connector**, with DCAT-AP records and ODRL
  policies (e.g. predictions may be used for planning but not for commercial routing
  without agreement).

---

</div>
