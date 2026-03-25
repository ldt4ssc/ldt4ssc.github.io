# Non-technical Resources

!!! tip "On this page"
    - [Example Stories](#example-stories) - See potential pilot scenarios
    - [The LDT4SSC Methodology](#the-ldt4ssc-methodology) - Four-phase implementation framework
    - [The LDT4SSC Impact Assessment Framework](#the-ldt4ssc-impact-assessment-framework) - Structured monitoring and evaluation
    - [Cost-Benefit Analysis](#cost-benefit-analysis) - CBA tools and guidance
    - [Legal Guidance](#legal-guidance) - Practical legal guide for LDT projects
    - [Other Resources](#other-resources) - Additional ecosystem resources

## What you'll find here

These non-technical resources provide practical guidance for the organisational, strategic, legal, and governance aspects of the pilot journey. The resources support pilots and applicants in aligning stakeholders, structuring responsibilities, anticipating risks, and creating the conditions for sustainable, interoperable, and widely adopted digital services. Together, these methods and workshops help build the shared culture, clarity, and coordination required to transform a use case into a long-lasting, impactful solution.

!!! tip "New to the project? Start here."
    1. Read the **[Work Strands Overview](#work-strands-overview)** below to identify which strand fits your project.
    2. Browse the **[Example Stories](#example-stories)** to see how pilots like yours could look.
    3. Use the **[Methodology](methodology.md)** to get an overview of the four phases.
    4. Dive into the phase most relevant to where you are in your journey.

### Work Strands Overview

The non-technical resources support pilots across three interconnected work strands, each requiring different organisational approaches:

!!! abstract "WS1: Technical Interconnection of LDTs"
    **Linking and scaling digital twins that are already in place**

    Focus on multi-stakeholder governance, legal frameworks for data sharing, cross-organisational coordination, and partnership models for federated LDT ecosystems.

!!! abstract "WS2: Creation of LDTs Based on Common Needs"
    **Addressing shared urban or regional challenges (e.g., cross-border traffic, air pollution)**

    Emphasis on use case co-creation, stakeholder alignment, data governance frameworks, business model design, and responsible digital principles for new LDT initiatives.

!!! abstract "WS3: Adding New Advanced AI-Based Tools to existing LDTs"
    **Integrating AI-driven, value-added services to enhance existing LDTs and new services to the LDTs Toolbox**

    Focus on change management, user training and adoption, ethical AI considerations, and preparing organisations for advanced analytics and decision-support capabilities.

---

## Example stories
To illustrate the potential of each WS, we present a set of Pilots' Example Stories, i.e. fictional scenarios that demonstrate how future pilots could emerge and operate within the LDT4SSC project framework. These examples are intended to help prospective applicants envision their own roles and opportunities within the initiative.

The example stories developed for WS1 show how cities and communities with an existing level of digital maturity (as described in the Requirements section) can build on their Local LDTs to form a federated, EU-wide ecosystem. Each example illustrates how interoperability, cross-border collaboration, and shared data platforms can enable scalable and replicable solutions. The realistic use cases highlight the concrete benefits of interconnected LDTs, such as improved decision-making, resource optimisation, and faster adoption of open-source tools, while also addressing common challenges like technical integration, governance, and stakeholder coordination. Their purpose is to inspire replication, lower entry barriers for less digitally advanced regions, and foster a shared community of practice around federated LDTs, advancing the project's goal of a unified and interoperable digital infrastructure for Europe.


???+ example "Traffic Management and Air Quality"

    Two municipalities of similar size, population, and density have each developed a descriptive Local Digital Twin (LDT) to monitor traffic, air quality, and their interaction. They partner with a specialised private service provider to interconnect their systems and exchange data and related services using the NGSI-LD standard. By linking their context brokers, the partners establish a shared real-time dashboard that enables coordinated management of transport corridors and supports efforts to reduce congestion and pollution.

    To ensure seamless data and service interoperability, the partners align their API documentation with the MIM1. The outcomes include both operational improvements such as optimised traffic flows and reduced emissions, and reusable assets such as standardised data models and dashboards that can be adopted by other cities.

    This example reflects the ambition of WS1: to scale up EU-wide datasets and open-source solutions within the LDT ecosystem, demonstrating how federated approaches can transform local innovations into collective impact.

???+ example "Interconnected Networks Management and Service Marketplace"

    Cities of a DS4SSCC Pilot projects interconnect their Local Digital Twins (LDTs) with those of another group of communities to create a shared marketplace for essential public services, aligned with the priorities of each local authority. These services may include areas such as mobility, land-use planning, and energy or electricity management, reflecting the themes of the New European Bauhaus (NEB) and the European Green Deal. By leveraging the SIMPL building blocks and the FIWARE ecosystem of technologies, this new consortium integrates waste, energy, and water management systems, enabling local authority syndicates to exchange data, optimise resource allocation, and deliver new services across regions. The main challenge lies in ensuring the maturity of the connector, which must reliably bridge diverse platforms while maintaining data consistency and security.

    The outcomes include operational efficiencies such as streamlined network management and cross-city service coordination, as well as contributions to the SIMPL framework, reinforcing its role as means for interoperable LDT ecosystems. This example illustrates how federated LDTs can move beyond individual city silos, fostering a collaborative economy of shared services and scalable, cross-regional solutions.

???+ example annotate "Regional Energy and Climate Data Space"

    Several municipalities in a cross-border region with varying digital maturity levels create a shared DS to combine energy production and consumption data. The goal is to monitor regional energy use and evaluate its climate impact. Together with a data space specialist and a local energy supplier, the municipalities deploy a FIWARE Data Space Connector and use the EU LDT Toolbox to model scenarios on energy demand, renewable integration, and the environmental impact of alternative energy sources. The main challenge is to manage data access rights among diverse stakeholders (municipalities, regional alliances, and private partners) while ensuring secure data exchange and consistent decision-making across governance levels.

    The project delivers a real-time regional overview of energy supply and demand, enabling policymakers, businesses, and citizens to track consumption patterns and make informed choices. It demonstrates how federated LDTs can consolidate fragmented local data into a unified, actionable resource for advancing climate resilience and the energy transition.

---

## The LDT4SSC Methodology

The LDT4SSC Methodology is a four-phase implementation framework that guides pilots from initial ideation through to full deployment. It structures the pilot journey into **EXPLORE** (Ideation), **VALIDATE** (Specifications), **DEFINE** (Prototyping), and **IMPLEMENT** (Deployment), ensuring that each stage builds on validated outputs from the previous one. The methodology integrates 15 practical workshops covering use case mapping, data governance, interoperability, business modelling, and stakeholder onboarding.

<!-- TODO: Replace with methodology overview image -->
![Methodology overview](../assets/methodology_overview.png){ .off-glb }

### Workshop Overview

<style>.ws-table { border-collapse: collapse; width: 100%; font-size: 0.85em; } .ws-table th, .ws-table td { padding: 0.2rem 0.6rem; border: 1px solid #e0e0e0; } .ws-table th { background: #f5f5f5; } .ws-explore { color: #f9a825; font-weight: 700; } .ws-validate { color: #424242; font-weight: 700; } .ws-define { color: #1976d2; font-weight: 700; } .ws-implement { color: #388e3c; font-weight: 700; }</style>

<table class="ws-table">
<thead><tr><th>#</th><th>Workshop</th><th>Phase</th><th>Duration</th></tr></thead>
<tbody>
<tr><td><a href="methodology.md#mapping-use-case">1.1</a></td><td>Mapping your Use Case</td><td><span class="ws-explore">EXPLORE</span></td><td>3h</td></tr>
<tr><td><a href="methodology.md#questioning-the-purpose">1.2</a></td><td>Questioning The Purpose of your LDT Project</td><td><span class="ws-explore">EXPLORE</span></td><td>3h 15min &times; 3</td></tr>
<tr><td><a href="methodology.md#implementing-sustainable-digital-design">1.3</a></td><td>Implementing Sustainable Digital Design</td><td><span class="ws-explore">EXPLORE</span></td><td>2h</td></tr>
<tr><td><a href="methodology.md#effective-visualisation-dashboards">2.1</a></td><td>Co-Creating Effective Visualisation Dashboards</td><td><span class="ws-validate">VALIDATE</span></td><td>3h 15min</td></tr>
<tr><td><a href="methodology.md#implementing-data-governance">2.2.1</a></td><td>Understanding Data Governance and Setting the Goal</td><td><span class="ws-validate">VALIDATE</span></td><td>2h</td></tr>
<tr><td><a href="methodology.md#implementing-data-governance">2.2.2</a></td><td>Mapping Stakeholders' Legitimacy and Authority</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 30min</td></tr>
<tr><td><a href="methodology.md#implementing-data-governance">2.2.3</a></td><td>Designing your Data Governance Roadmap</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 5min</td></tr>
<tr><td><a href="methodology.md#implementing-data-governance">2.2.4</a></td><td>Complementing your Data Governance Roadmap with a Legal Framework</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 30min</td></tr>
<tr><td><a href="methodology.md#implementing-data-governance">2.2.5</a></td><td>Refining your Legal Framework for Data Governance</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 30min &ndash; 2h</td></tr>
<tr><td><a href="methodology.md#inventorying-ldt-project-data">2.3</a></td><td>Inventorying your LDT Projects' Data</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 40min</td></tr>
<tr><td><a href="methodology.md#unlocking-interoperability">2.4</a></td><td>Identifying Levers, Obstacles and Objectives for Interoperability</td><td><span class="ws-validate">VALIDATE</span></td><td>2h</td></tr>
<tr><td><a href="methodology.md#lego-serious-play">BONUS</a></td><td>Lego&reg; Serious Play</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 20min</td></tr>
<tr><td><a href="methodology.md#prototyping-use-case-context-broker">3.1</a></td><td>Prototyping a Use Case with a Context Broker</td><td><span class="ws-define">DEFINE</span></td><td>&mdash;</td></tr>
<tr><td><a href="methodology.md#onboarding-acculturation">4.1</a></td><td>Onboarding &amp; Acculturation in Digital Projects</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 10min</td></tr>
<tr><td><a href="methodology.md#designing-action-plan">4.2</a></td><td>Designing a Structured Action Plan</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 30min</td></tr>
<tr><td><a href="methodology.md#designing-business-model">4.3</a></td><td>Designing a Sustainable Business Model</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 15min</td></tr>
<tr><td><a href="methodology.md#refining-business-model">4.4</a></td><td>Refining the Business Model</td><td><span class="ws-implement">IMPLEMENT</span></td><td>2h 10min</td></tr>
<tr><td><a href="methodology.md#completing-dcc">4.5</a></td><td>Completing your Data Cooperation Canvas</td><td><span class="ws-implement">IMPLEMENT</span></td><td>2 days</td></tr>
</tbody>
</table>

!!! info "The LDT4SSC Methodology"
    Explore the full methodology with detailed phase descriptions, prerequisites, objectives, stakeholders, and workshop resources.

    [Go to the Methodology :octicons-arrow-right-24:](methodology.md){ .md-button .md-button--primary }

---

## The LDT4SSC Impact Assessment Framework

The [**LDT4SSC Impact Assessment Framework**](#impact-assessment-download) provides a structured intervention logic based on the theory-of-change to track how pilot activities translate into outputs, outcomes, and longer-term impacts within the LDT4SSC programme. It standardises monitoring across pilots, aligning pilot outputs (e.g., use cases, operational LDTs, interoperable artefacts, AI services, governance arrangements, communities of stakeholders, and value-proposition evidence) with broader changes that pilots aim to enable, linked to project-level outcomes (federation of LDTs, uptake by less-advanced communities, and service adoption) and EU-level impacts (sustainability, resilience, and alignment with the Green Deal and SDGs).

By defining clear output, outcome, and impact indicators and validation methods, the framework ensures comparability, repeatability, and a basis for aggregation and recommendations for the Common Interoperability Blueprint and LDT ecosystem.

The framework is embedded in the pilot's journey, requiring pilots to describe context and inputs, report activities and track specified output indicators, and to link outputs to measurable short-term outcomes and intended long-term impacts. Monitoring is iterative: pilots submit baseline, interim (6-monthly) and final reports through self-assessment questionnaires that will be shared later on as resources to pilots.

<a id="impact-assessment-download"></a>
!!! info "The LDT4SSC Impact Assessment Framework"
    [Download as PDF](#){ .md-button .md-button--primary }

    *PDF coming soon — contact the project team in the meantime.*

---

## Cost-Benefit Analysis

Cost-Benefit Analysis (CBA) is a decision-making tool that involves measuring the various expected effects of a public policy, relative to a baseline situation, by expressing them in a common unit — the monetary unit. These effects can be:

- **Economic**: savings for the community, investment costs, gain or loss of productivity.
- **Social**: changes in quality of life, noise pollution, etc.
- **Environmental**: evolution of pollution, impact on biodiversity, CO2 emissions, etc.

Public investment is justified if the digital solution produces more benefits than completing the project without this solution.

In the context of the LDT4SSC project, pilots must perform a cost-benefit analysis of their projects and share it as part of Pilot Deliverable 5. The purpose of this evaluation is to allow for a comprehensive assessment of the digital solution and to deduce its financial as well as socio-environmental utility. This evaluation can be done after the solution has been implemented (ideally one year after), but also — with less accurate results — before implementation. It is recommended that pilots record the relevant baseline data before they start their project to be able to carry out the comparison.

Pilots will find below a document to guide them in evaluating the actual costs and objective benefits for the different beneficiaries of their pilot projects.

<a id="cost-benefit-analysis-download"></a>
!!! info "Cost-Benefit Analysis - Guidance Document"
    [Download as PDF](https://cerema.app.box.com/s/po7lz1x3gxjo7kuvqh9h4n2w9yaiffbh){ .md-button .md-button--primary }


**More information:**

- [Cerema – Responsible Digital Programme](https://smart-city.cerema.fr/programme-numerique-responsable)
- [Workshop 1.2: Questioning The Purpose of your LDT Project](methodology.md#questioning-the-purpose)

---

## Legal Guidance

To go beyond purely regulatory aspects and guide public authorities and their service providers in setting up a legal framework for their projects and navigating the legal journey, a [**Practical Legal Guide**](#legal-guidance-download) will be shared below.

This document provides legal guidance at all steps of a typical project lifecycle, mirroring the operational and technical steps of the [LDT4SSC Methodology](methodology.md). These legal stages complement the project-level steps of the methodology: (1) [Explore – Ideation](methodology.md#ideation-explore), (2) [Validate – Specification](methodology.md#specifications-validate), (3) [Define – Prototype](methodology.md#prototyping-define), and (4) [Implement – Deployment](methodology.md#deployment-implement). Project legal milestones — such as implementing a call for tenders, partnering up, setting proper data governance, the end of a legal contract, or mutualising a platform — are typical legal stages of a project. The guide prompts project managers with the relevant questions at every stage, providing recommendations and resources to help them find fit-for-purpose legal clarity.

This guidance can be applied to most projects adapting, testing, or creating platforms involving innovative technologies such as LDTs, and that require a public authority to provide domain expertise, know-how, and/or share data originating from the operation of their public services.

After implementation and completion of the project, having followed these guidelines enables cities and communities to:

- Open their platform to other local authorities to share costs.
- Connect their platform to third parties.
- Have their platform maintained by an entity other than the initial contract holder.
- Have their platform commercially exploited by a private entity to sustain it, without appropriation.

<a id="legal-guidance-download"></a>
!!! info "The LDT4SSC Practical Legal Guide"
    [Download as PDF](#){ .md-button .md-button--primary }

    *PDF coming soon — contact the project team in the meantime.*

---

## Other Resources

| Author / Title | Description and use for pilots | Type |
|----------------|-------------------------------|------|
| **Green.IT** [Best practice guidelines for Web eco-design](https://github.com/cnumr/best-practices) | Practical guidelines and checklists to reduce the environmental footprint of web sites and web applications. Useful for pilots to make LDT front-ends and dashboards more energy-efficient, lower hosting costs and improve accessibility. Pilots can adopt these practices during the Define and Implement steps to meet eco-design recommendations and document improvements for the Impact Assessment. | Guideline |
| **DS4SSCC** [Blueprint](https://static1.squarespace.com/static/63718ba2d90d0263d7fc1857/t/696e156b592f0c60d9d9f764/1768822123196/2.+Blueprint+Evolution.pdf) | A reference blueprint for building multi-stakeholder data spaces in smart and sustainable communities. Pilots can use it as a reference to structure governance, legal and technical arrangements for federated LDTs and to ensure their use cases align with broader data-space principles. | Blueprint |
| **DSSC** [Blueprint](https://blueprint.dssc.eu/) | Triggers methodology: Decision trees/checklists to identify when legal regimes apply (e.g., GDPR) and operationalise compliance-by-design for pilots. Co-Creation Method – Align Stakeholders on the Data Space Scope: Helpful to build consensus on the data space's boundaries and goals, ensuring all stakeholders share a clear vision. | Blueprint |
| **Living-in.EU** [Catalogue of Tools](http://living-in.eu) | A curated set of ready-to-use resources (tools, frameworks, guidelines) to support local authorities in digital transformation: includes procurement templates, interoperability standards (e.g. MIMs), capacity-building tools. Pilots of LDT4SSC can use these tools to procure and build Local Digital Twins (LDTs) in line with EU best practices. | Catalogue |
| **European Commission** [Citizen Engagement Solution Booklet](https://smart-cities-marketplace.ec.europa.eu/insights/solutions/solution-booklet-citizen-engagement-0) | Operational cases, tools and participatory formats to involve citizens in data governance, scenario validation and co-design. Pilots can use it to engage citizens in their LDT projects. | Booklet |
| **CEREMA** Cost Benefit Analysis | Guidance and templates for conducting CBA tailored to public-sector digital projects, including socio-environmental indicators. Pilots should use it to calculate and report economic, social and environmental benefits for PD5. | Guideline |
| **DS4SSCC** [Data Cooperation Canvas](https://www.datacooperationcanvas.eu/canvas/intro) | Canvas to describe actors, value mechanisms, governance and data flows for multi-stakeholder data cooperation; recommended for use case documentation. Pilots should complete the canvas during Deployment (IMPLEMENT) steps to formalise responsibilities, value capture, and data exchange patterns for federated LDT services. | Framework |
| **Living-in.EU** [Declaration](http://living-in.eu/declaration) | A declaration and set of principles for responsible, inclusive and interoperable local digital transformation. Pilots can reference it to demonstrate alignment with EU community commitments and to frame ethical and governance choices. | Declaration |
| **The Digital Collage** [Digital Collage workshop](https://digitalcollage.org/) | Awareness-raising workshop for ICT environmental/social impacts recommended for pilots to engage stakeholders. Useful in early Explore workshops to open discussion on sustainability, inclusion and organisational priorities. | Workshop |
| **German Institute for Standardization** [DIN Spec 91607:2024-11 Digital twins for cities and municipalities – Build a digital twin for smart cities](https://www.dinmedia.de/en/technical-rule/din-spec-91607/384414386) | Gives a holistic overview of urban digital twins. At the heart of the document are the use cases, the description of urban digital twins (including capabilities) and a maturity model. As part of the development of this DIN SPEC, around 100 different municipal usage scenarios were identified by the participating municipalities and assigned to municipal spheres of activity. | Specification |
| **European Commission** [(New) European Interoperability Framework (EIF)](https://ec.europa.eu/isa2/sites/default/files/eif_brochure_final.pdf) | Promoting seamless services and data flows for European public administrations. | Framework |
| **Beta.gouv.fr** Flash Diagnostics of a Website's accessibility | A quick assessment methodology and toolset for website accessibility. Pilots can run accessibility diagnostics on LDT user interfaces to comply with accessibility standards and inform remediation in the Implement step. | Assessment |
| **French Interministerial Digital Office** [General Accessibility Reference for Administrations (RGAA)](https://accessibilite.numerique.gouv.fr/) | French national guidelines and conformance criteria for public-sector digital accessibility. Pilots can follow RGAA to ensure platforms meet accessibility objectives and improve inclusivity. | Guideline |
| **Arcep** [General policy framework for ecodesign of digital services (RGESN)](https://www.arcep.fr/uploads/tx_gspublication/general_policy_framework_for_the_ecodesign_of_digital_services_version_2024.pdf) | 78 criteria and methodology to integrate environmental considerations across digital service lifecycle; pilots should use to embed eco-design. Pilots should assess their services against the top-priority criteria early and report progress to meet Rc8 recommendations. | Framework |
| **BVGS** [Green Software Landscape](https://landscape.bundesverband-green-software.de/) | Overview of green-software tools and measurement approaches (code, infra, AI, websites) to quantify software-level environmental impacts. | Catalogue |
| **Club Green IT** [GreenIT Guidelines (RGIT)](https://club.greenit.fr/referentiel.html) | Organisation-level Green IT best practices to set a Digital Sustainability strategy across IS infrastructure. | Guideline |
| **DS4SSCC** [Inventory of Use Cases](https://inventory.ds4sscc.eu/collected-use-cases) | A catalogue of tested smart city and community use cases described in a harmonised format. Pilots can use the inventory to benchmark their use cases and to identify reuse opportunities. | Catalogue |
| **Living-in.EU** [Knowledge Base](https://living-in.eu/knowledge-base) | A knowledge repository of documents, studies, guidelines, webinars, and working-group outputs. For LDT4SSC pilots, this Knowledge Base provides evidence, legal and technical guidance, and community-shared lessons relevant to digital twin implementation. | Repository |
| **Sherry R. Arnstein** [Ladder of participation](https://www.historyofsocialwork.org/1969_ENG_Ladderofparticipation/1969,%20Arnstein,%20ladder%20of%20participation,%20original%20text%20OCR%20C.pdf) | A conceptual framework with eight levels of citizen participation. Pilots can use it to assess and plan the depth of citizen involvement (aiming for at least placation) and to report engagement maturity in pilot documentation. | Framework |
| **OASC** [MIMs Plus](https://mims.oascities.org/) | Foundational and application-specific MIMs (including MIM8 Local Digital Twin) to guide minimal but sufficient interoperability for city platforms. Pilots must engage with at least the 5 foundation MIMs. | Framework |
| **DS4SSCC** [Multi-Stakeholder Governance Scheme](https://static1.squarespace.com/static/63718ba2d90d0263d7fc1857/t/6557179174ea0873bd612813/1700206503021/DS4SSCC_D2.2+Mulkti+stakeholder+governance+scheme_FINAL.pdf) | Guidelines to set up multi-stakeholder governance, crucial for trust and collaboration in data spaces and LDTs. Pilots can use it to structure decision-making, roles, and responsibility across consortium partners. | Framework |
| **GEONOVUM** [Policy processes and building blocks for Digital Twins](https://www.geonovum.nl/uploads/documents/Eindrapport%20Advies%20Beleid%20en%20Digital%20Twins%20-%20provincie%20Utrecht%20v1.3d_EN.pdf) | A technical and policy-oriented report describing policy building blocks and implementation patterns for digital twins. Pilots can extract governance patterns and policy recommendations relevant to public-sector LDT adoption. | Report |
| **Banque des Territoires** Practical Legal Guide | Provides legal guidance at all steps of a typical project lifecycle. It prompts project managers the right questions at every step of their projects, providing them with recommendations and resources to help them find the fit-for-purpose legal answers. Pilots can use it to ensure that upon project completion they can: open their platform to other local authorities to share costs; Connect their platform to third parties; Have their platform maintained by an entity other than the initial contract holder; And/or have their platform commercially exploited by a private entity to sustain it, without appropriation. | Guideline |
| **Living-in.EU** [Procurement Support Materials](https://living-in.eu/eu-support-services/procurement-support-materials) | Procurement guidelines, templates, and a glossary designed specifically to help EU cities and communities acquire digital infrastructures and digital twins. For LDT4SSC pilots, these materials simplify tender processes, ensure alignment with EU standards, and embed interoperability, sustainability, and social criteria. | Catalogue |
| **European Commission** [Proposal for a EIF4SCC](https://digital-strategy.ec.europa.eu/en/news/proposal-european-interoperability-framework-smart-cities-and-communities-eif4scc) | Reference interoperability model and principles adapted for Smart Cities & Communities (legal, organisational, semantic, cultural, technical) to guide interoperability-by-design. | Framework |
| **IDSA** [Rulebook](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/2.%20Guiding_Principles/2.1%20Overaching_considerations.md) | The IDSA Rulebook serves several purposes regarding the development and operation of data spaces. The aim is to describe clearly which rules are mandatory and which are optional guidelines. This governance framework includes functional, technical, operational, and legal dimensions. It also presents a Political, Economic, Social, Technological, Ecological, Legal Analysis (PESTEL) of the overarching considerations of data spaces which is interesting regarding the impact assessment. | Rulebook |
| **DSSC** ["Triggers" Methodology and Contractual Framework](https://dssc.eu/space/BVE2/1071253931/Regulatory+Compliance) | See DSSC above. It is a practical method to detect legal applicability and a set of contractual instruments. Pilots can adopt it to operationalise legal checks. | Framework |
| **DUET** [Typology of Local Digital Twins](https://www.digitalurbantwins.com/post/the-taxonomy-of-local-digital-twins-lessons-from-smart-cities) | Conceptual typology (usage openness × control/governance) to help cities position LDT strategy and governance model. | Framework |
| **UN-Habitat** [Step-by-Step Guide for a People-Centred Smart City Strategy](https://unhabitat.org/a-step-by-step-guide-for-a-people-centred-smart-city-strategy-a-playbook-for-national-regional-and-local-governments) | Playbook to design inclusive, social-equity focused smart city strategies; recommended for use in identifying affected stakeholder groups and vulnerable communities. | Guideline |
| **University for Continuing Education Krems, Austria** [Unravelling the use of digital twins to assist decision- and policy-making in smart cities](https://arxiv.org/pdf/2405.20916) | "The main objective of this ongoing research is to review the existing literature on the intersection of digital twins and smart cities with a focus on decision and policy-making support and to answer the research question: "What are the existing applications of digital twins for smart cities for aiding decision-and policy-making?"" | Peer-reviewed article |
| **W3C** [Web Accessibility Guidelines (WCAG 3.0)](https://www.w3.org/TR/wcag-3.0/) | Web accessibility standards and national reference (France) plus tools to assess conformity; to ensure inclusive LDT services. | Guideline |
| **ESRI** [Geodesign Framework](https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/introducing-geodesign.pdf) | End-user engagement and citizen participation framework for territorial interventions. | Framework |

### Resources from the Ecosystem

| Title | Small Description | Source | Thematic Area |
|-------|-------------------|--------|---------------|
| [DSSC's Co-Creation Method – Align Stakeholders on the Data Space Scope](https://dssc.eu/space/BVE2/1071257999/Align+Stakeholders+on+the+Data+Space+Scope) | Helpful to build consensus on the data space's boundaries and goals, ensuring all stakeholders share a clear vision | DSSC | Data Spaces |
| [The Economics of Data Sharing: Insights from a Legal-Economics Workshop](https://dssc.eu/space/News/blog/1284145156/The+Economics+of+Data+Sharing:+Insights+from+a+Legal-Economics+Workshop) | Provides insights on economic incentives and legal frameworks that can help design sustainable data sharing models. | DSSC | Data Spaces |
| [MIMS Specification Introduction](https://mims.oascities.org/NzWXOO1Fttw4wtqv1Wys) | Introduces standards for interoperable data management, essential for connecting platforms. | OASC | Interoperability / MIMs |
| [Guidance for the Integration of Digital Twins in Data Spaces](https://aioti.eu/wp-content/uploads/Guidance-for-the-Integration-of-Digital-Twins-in-Data-Spaces-Final.pdf) | This document focuses on the integration of digital twins in data spaces: it provides a context on data spaces, digital twins, IoT and edge computing and standardisation; it provides an analysis on the integration of digital twins in data spaces taking an architecture approach; it describes a large number of digital twin use cases in domains such as agriculture, connected vehicles, smart cities, energy, smart manufacturing. The document can be used to provide insights and sources for future standardisation work related to the integration of digital twins in data spaces. | AIOTI | Digital Twins |
| [Digital Twin Business Maturity Model](https://www.digitaltwinconsortium.org/publications/digital-twin-business-maturity-model/) | A maturity model from the Digital Twin Consortium defining five maturity stages (Passive → Master) across dimensions such as Strategy, Culture, Technology. LDT4SSC pilots can use it to assess their current maturity in digital twin adoption, plan progression, and benchmark against peer organizations. | Digital Twin Consortium | Digital Twin |
| [DTC Digital Twin Capabilities Periodic Table](https://www.digitaltwinconsortium.org/digital-twin-capabilities-periodic-table-download-all-v1-form/) | The Digital Twin Capabilities Periodic Table (CPT) is an architecture and technology agnostic requirements definition framework for digital engineering projects. It is aimed at organizations who want to design, develop, deploy and operate digital twins based on use case capability requirements versus the features of technology solutions. | Digital Twin Consortium | Digital Twin |
| [Trusted Data Transaction](https://www.cencenelec.eu/media/CEN-CENELEC/CWAs/RI/2024/cwa18125_2024.pdf) | Provides terminology, concepts and mechanisms in the field of data exchange focusing on trusted data transactions. | CEN / CENELEC | Legal terminologies |
| [High-Level Forum on European Standardisation Final report of work-stream 14](https://ec.europa.eu/docsroom/documents/58914) | The report is the result of Workstream 14 on Data Interoperability of the High-Level Forum on European Standardisation (HLF). The workstream was initiated to help establish a coordinated approach to (European) standardisation in support of the interoperability requirements established in the horizontal data legislation, implementing the European data strategy (2020). The clarity, transparency, and reliability resulting from a well-designed overall set of standards will significantly lower entry barriers for the application of data spaces and thus support the emergence of a vibrant data ecosystem in Europe. | European Commission | Data Spaces |
| [Accessibility Inspection Grid](../assets/XLSs/blank_quick-accessibility-inspection-grid_2025.xlsx) | Quick Accessibility Inspection Grid | French Government | Accessibility |
