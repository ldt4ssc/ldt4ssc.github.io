# Non-technical Resources

!!! tip "On this page"
    - [Example Stories](#example-stories) - See potential pilot scenarios
    - 📖 [The LDT4SSC Methodology](#the-ldt4ssc-methodology) - Four-phase implementation framework
    - 📊 [Cost–Benefit Analysis and Impact Assessment](#costbenefit-analysis-and-impact-assessment) - CBA tools and the LDT4SSC Impact Assessment Framework
    - ⚖️ [Legal Guidance](#legal-guidance) - Practical legal guide for LDT projects
    - [Other Resources](#other-resources) - Additional ecosystem resources

## 🎯 What you'll find here

These non-technical resources provide practical guidance for the organisational, strategic, legal, and governance aspects of the pilot journey. The resources support pilots and applicants in aligning stakeholders, structuring responsibilities, anticipating risks, and creating the conditions for sustainable, interoperable, and widely adopted digital services. Together, these methods and workshops help build the shared culture, clarity, and coordination required to transform a use case into a long-lasting, impactful solution.

!!! tip "New to the project? Start here."
    1. Read the **[Work Strands Overview](#work-strands-overview)** below to identify which strand fits your project.
    2. Browse the **[Example Stories](#example-stories)** to see how pilots like yours could look.
    3. Use the **[Methodology diagram](#the-ldt4ssc-methodology)** to get an overview of the four phases.
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
To illustrate the potential of each WS, we present a set of Pilots’ Example Stories, i.e. fictional scenarios that demonstrate how future pilots could emerge and operate within the LDT4SSC project framework. These examples are intended to help prospective applicants envision their own roles and opportunities within the initiative.

The example stories developed for WS1 show how cities and communities with an existing level of digital maturity (as described in the Requirements section) can build on their Local LDTs to form a federated, EU-wide ecosystem. Each example illustrates how interoperability, cross-border collaboration, and shared data platforms can enable scalable and replicable solutions. The realistic use cases highlight the concrete benefits of interconnected LDTs, such as improved decision-making, resource optimisation, and faster adoption of open-source tools, while also addressing common challenges like technical integration, governance, and stakeholder coordination. Their purpose is to inspire replication, lower entry barriers for less digitally advanced regions, and foster a shared community of practice around federated LDTs, advancing the project’s goal of a unified and interoperable digital infrastructure for Europe.


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

## 📖 The LDT4SSC Methodology

<div class="methodology-diagram">
  <div class="diagram-inner">
    <!-- Central Circle -->
    <div class="diagram-center">
      <div class="use-case-circle">Use Case</div>
    </div>

    <!-- Four Quadrants forming a square -->
    <a href="#deployment-implement" class="quadrant quadrant-deployment" title="Go to Deployment phase">
      <span class="phase-name">4. Deployment</span>
      <span class="phase-action">IMPLEMENT</span>
    </a>

    <a href="#ideation-explore" class="quadrant quadrant-ideation" title="Go to Ideation phase">
      <span class="phase-name">1. Ideation</span>
      <span class="phase-action">EXPLORE</span>
    </a>

    <a href="#prototyping-define" class="quadrant quadrant-prototyping" title="Go to Prototyping phase">
      <span class="phase-name">3. Prototyping</span>
      <span class="phase-action">DEFINE</span>
    </a>

    <a href="#specifications-validate" class="quadrant quadrant-specifications" title="Go to Specifications phase">
      <span class="phase-name">2. Specifications</span>
      <span class="phase-action">VALIDATE</span>
    </a>

    <!-- Activity Cards - Left Side Top (Deployment - Green) -->
    <div class="activity-group activity-deployment">
      <a href="#completing-dcc" class="activity-card activity-deployment-card">
        4.5 Completing your Data Cooperation Canvas
      </a>      
      <a href="#refining-business-model" class="activity-card activity-deployment-card">
        4.4 Refining the Business Model
      </a>      
      
      <a href="#designing-business-model" class="activity-card activity-deployment-card">
        4.3 Designing a Sustainable Business Model
      </a>
      <a href="#designing-action-plan" class="activity-card activity-deployment-card">
        4.2 Designing a Structured Action Plan
      </a>
      <a href="#onboarding-acculturation" class="activity-card activity-deployment-card">
        4.1 Onboarding & Acculturation in Digital Projects
      </a>
    </div>

    <!-- Activity Cards - Right Side Top (Ideation - Yellow) -->
    <div class="activity-group activity-ideation">
      <a href="#mapping-use-case" class="activity-card activity-ideation-card">
        1.1 Mapping your Use Case
      </a>
      <a href="#questioning-the-purpose" class="activity-card activity-ideation-card">
        1.2 Questioning the purpose of your LDT project
      </a>
      <a href="#implementing-sustainable-digital-design" class="activity-card activity-ideation-card">
        1.3 Sustainable Digital Design
      </a>
    </div>

    <!-- Activity Cards - Left Side Bottom (Prototyping - Blue) -->
    <div class="activity-group activity-prototyping">
      <a href="#prototyping-use-case-context-broker" class="activity-card activity-prototyping-card">
        3.1 Prototyping a Use Case with a Context Broker
      </a>
    </div>

    <!-- Activity Cards - Right Side Bottom (Specifications - Gray) -->
    <div class="activity-group activity-specifications">

      <a href="#effective-visualisation-dashboards" class="activity-card activity-specifications-card">
        2.1 Co-Creating Effective Dashboards
      </a>
      <a href="#implementing-data-governance" class="activity-card activity-specifications-card">
        2.2 Implementing data governance
      </a>
      <a href="#inventorying-ldt-project-data" class="activity-card activity-specifications-card">
        2.3 Inventorying your LDT Projects' Data
      </a>
      <a href="#unlocking-interoperability" class="activity-card activity-specifications-card">
        2.4 Unlocking Interoperability
      </a>
      <a href="#lego-serious-play" class="activity-card activity-specifications-card">
        BONUS: Lego® Serious Play
      </a>
    </div>
  </div>
</div>

### Workshop Overview

<style>.ws-table { border-collapse: collapse; width: 100%; font-size: 0.85em; } .ws-table th, .ws-table td { padding: 0.2rem 0.6rem; border: 1px solid #e0e0e0; } .ws-table th { background: #f5f5f5; } .ws-explore { color: #f9a825; font-weight: 700; } .ws-validate { color: #424242; font-weight: 700; } .ws-define { color: #1976d2; font-weight: 700; } .ws-implement { color: #388e3c; font-weight: 700; }</style>

<table class="ws-table">
<thead><tr><th>#</th><th>Workshop</th><th>Phase</th><th>Duration</th></tr></thead>
<tbody>
<tr><td><a href="#mapping-use-case">1.1</a></td><td>Mapping your Use Case</td><td><span class="ws-explore">EXPLORE</span></td><td>3h</td></tr>
<tr><td><a href="#questioning-the-purpose">1.2</a></td><td>Questioning The Purpose of your LDT Project</td><td><span class="ws-explore">EXPLORE</span></td><td>3h 15min × 3</td></tr>
<tr><td><a href="#implementing-sustainable-digital-design">1.3</a></td><td>Implementing Sustainable Digital Design</td><td><span class="ws-explore">EXPLORE</span></td><td>2h</td></tr>
<tr><td><a href="#effective-visualisation-dashboards">2.1</a></td><td>Co-Creating Effective Visualisation Dashboards</td><td><span class="ws-validate">VALIDATE</span></td><td>3h 15min</td></tr>
<tr><td><a href="#implementing-data-governance">2.2.1</a></td><td>Understanding Data Governance and Setting the Goal</td><td><span class="ws-validate">VALIDATE</span></td><td>2h</td></tr>
<tr><td><a href="#implementing-data-governance">2.2.2</a></td><td>Mapping Stakeholders' Legitimacy and Authority</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 30min</td></tr>
<tr><td><a href="#implementing-data-governance">2.2.3</a></td><td>Designing your Data Governance Roadmap</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 5min</td></tr>
<tr><td><a href="#implementing-data-governance">2.2.4</a></td><td>Complementing your Data Governance Roadmap with a Legal Framework</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 30min</td></tr>
<tr><td><a href="#implementing-data-governance">2.2.5</a></td><td>Refining your Legal Framework for Data Governance</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 30min – 2h</td></tr>
<tr><td><a href="#inventorying-ldt-project-data">2.3</a></td><td>Inventorying your LDT Projects' Data</td><td><span class="ws-validate">VALIDATE</span></td><td>1h 40min</td></tr>
<tr><td><a href="#unlocking-interoperability">2.4</a></td><td>Identifying Levers, Obstacles and Objectives for Interoperability</td><td><span class="ws-validate">VALIDATE</span></td><td>2h</td></tr>
<tr><td><a href="#lego-serious-play">BONUS</a></td><td>Lego® Serious Play</td><td><span class="ws-validate">VALIDATE</span></td><td>2h 20min</td></tr>
<tr><td><a href="#prototyping-use-case-context-broker">3.1</a></td><td>Prototyping a Use Case with a Context Broker</td><td><span class="ws-define">DEFINE</span></td><td>—</td></tr>
<tr><td><a href="#onboarding-acculturation">4.1</a></td><td>Onboarding &amp; Acculturation in Digital Projects</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 10min</td></tr>
<tr><td><a href="#designing-action-plan">4.2</a></td><td>Designing a Structured Action Plan</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 30min</td></tr>
<tr><td><a href="#designing-business-model">4.3</a></td><td>Designing a Sustainable Business Model</td><td><span class="ws-implement">IMPLEMENT</span></td><td>1h 15min</td></tr>
<tr><td><a href="#refining-business-model">4.4</a></td><td>Refining the Business Model</td><td><span class="ws-implement">IMPLEMENT</span></td><td>2h 10min</td></tr>
<tr><td><a href="#completing-dcc">4.5</a></td><td>Completing your Data Cooperation Canvas</td><td><span class="ws-implement">IMPLEMENT</span></td><td>2 days</td></tr>
</tbody>
</table>

---

### Phase 1 – Ideation (EXPLORE) {#ideation-explore}

Many digital projects begin with predefined solutions (dashboards, apps, algorithms) rather than user needs, risking misalignment, irrelevant data use, and stakeholder disengagement. The LDT4SSC Methodology requires a dedicated EXPLORE (Ideation) step to define clear needs and shared use cases, identify relevant data and anticipate impacts, and secure stakeholder alignment and ethical sustainability.

The Ideation step generally lasts from four to eight weeks, depending on the level of maturity and complexity of the project. It does not follow a strict linear path, but is essential for the strategic grounding of the project. Some workshops are however essential, in particular the use case mapping via iterative workshops ([1.1 Mapping your Use Case](#mapping-use-case)).

📋 **Prerequisites**

- A clear understanding of the project's broader goals (e.g., smart city objectives, climate adaptation).
- Stakeholder identification and initial engagement (local authorities, experts, citizens, private sector).
- Basic data and resource availability to explore feasibility.
- Alignment with public policies (e.g., digital transformation, sustainability strategies).
- Workshop materials and facilitation tools (e.g., templates, visual aids).

🎯 **Objectives**

- Identify challenges and opportunities for the Local Digital Twin (LDT) project.
- Define and prioritise use cases aligned with public policy and sustainability goals.
- Engage stakeholders to understand roles, needs, and governance dynamics.
- Assess costs, benefits, and impacts (economic, social, environmental).
- Lay the foundation for validation and detailed planning in later steps.

👥 **Stakeholders to Involve**

- **Project Coordination Roles** (Project Coordinators, etc.) – They facilitate structured ideation, stakeholder alignment, and documentation of exploratory outputs.
- **Domain Expertise Roles** (Use-Case Owners, Subject-Matter Experts, Researchers, Field Agents, etc.) – They define real-world challenges and opportunities, grounding ideation in practical, context-specific needs.
- **Decision Roles** (Elected Officials, Deputy Chief Executives, Directors, Heads of Departments, etc.) – They ensure strategic alignment with policy priorities and secure high-level buy-in for project direction and resource allocation.
- **End-Users or representatives of civil society** (Citizens, Citizens' Associations or Panels, etc.) – They ensure use cases reflect citizen priorities and societal impact, fostering inclusivity from the outset.
- **Technical Roles** (IT Department Staff, External Service Providers, Technical Experts, etc.), if available – They provide early feasibility insights to avoid unrealistic assumptions and ground ideation in technical possibilities.
- **Other Local Authorities facing similar issues** – They offer peer-learning opportunities and best practices to accelerate problem-solving and innovation.



???+ workshop_ideation "**EXPLORE Resources**"

    #### 1.1 Mapping your Use Case: Visualising Processes, Pinpointing Challenges, and Co-Designing Data-Driven Solutions {#mapping-use-case}

    This 3-hour workshop (1 facilitator per group of 4–5) helps teams to visually map the current use case, data flows, and challenges. It fosters a shared understanding of the project’s scope and identifies gaps between the current and ideal states. The outcome is a collaborative foundation for the project, adaptable as it progresses.

    ??? workshop_ideation "Workshop 1.1: Mapping your Use Case: Visualising Processes, Pinpointing Challenges, and Co-Designing Data-Driven Solutions"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

    #### 1.2 Questioning The Purpose of your LDT Project: Iterative Mapping of the Multi-Dimensional Costs and Benefits {#questioning-the-purpose}

    This workshop (3 hours 15 mins, run 3 times, with 1 facilitator per group of 4–5) clarifies the project’s objectives and expected impacts across operational, user, strategic, economic, and socio-environmental dimensions. It supports iterative mapping of costs and benefits to justify the project and prioritise functionalities. The result is a clearer project vision, aiding decision-making and resource allocation.

    ??? workshop_ideation "Workshop 1.2: Questioning The Purpose of your LDT Project: Iterative Mapping of the Multi-Dimensional Costs and Benefits"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


    #### 1.3 Implementing Sustainable Digital Design: Assessing and Integrating Social, Environmental, and Economic Impacts in Digital Projects {#implementing-sustainable-digital-design}

    This 2-hour workshop (1 facilitator per group of 4–5) evaluates the project’s relevance, sustainability, and alignment with responsible digital principles. It encourages a collective reflection on ecological, social, and economic impacts throughout the project lifecycle. The output is a matrix of positive and negative impacts, guiding responsible decision-making processes.


    ??? workshop_ideation "Workshop 1.3: Implementing Sustainable Digital Design: Assessing and Integrating Social, Environmental, and Economic Impacts in Digital Projects"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


✨ **Achievements at the end of the stage**

At this stage of the method, the following elements have been completed or identified:

- Clear project objectives and alignment with public policy goals.
- Shared and prioritised use cases reflecting stakeholder needs and challenges.
- Stakeholder maps outlining roles, legitimacy, and influence in data governance.
- Sustainability and impact assessments (economic, social, environmental).
- Initial [cost-benefit framework](#costbenefit-analysis-and-impact-assessment) to guide decision-making.
- Collective understanding of the project's purpose and strategic direction.

➡️ Next: [Phase 2 – Specifications (VALIDATE)](#specifications-validate)

---

### Phase 2 – Specifications (VALIDATE) {#specifications-validate}

At the end of the Ideation phase, we have a better idea of the need we are meeting, why we are doing the project, with whom and with what data — but we don't know exactly *how*. The VALIDATE (Specifications) step provides the link between the vision that emerges from the [Ideation step](#ideation-explore) and the actual implementation of the project. It involves translating a use case into technical and functional requirements, taking into account the real constraints of its environment (data, architecture, users, security, etc.).

This step helps to avoid misunderstandings between the business and technical teams, and prepares a solid basis for development. It is also an opportunity to ensure that the principles of interoperability are integrated from the outset. It further ensures that pilots work on the following topics:

- The personas, i.e. the future users of the solution.
- Their functionalities in relation to users.
- The indicators and dashboards in relation to the personas.
- The desired simulations.
- The data and its governance.

📋 **Prerequisites**

- Completed outputs from the [EXPLORE step](#ideation-explore) (clearly-defined use case, stakeholder maps, sustainability assessments, main data requirements and available resources, etc.).
- Access to technical, legal, and operational expertise for feasibility assessments.
- Stakeholder commitment and availability for validation discussions.
- Clear criteria for evaluation (e.g., impact metrics, compliance requirements, resource constraints).
- Workshop tools and templates (e.g., validation frameworks, decision matrices).

🎯 **Objectives**

- Test and refine use cases, hypotheses, and assumptions from the [EXPLORE step](#ideation-explore).
- Assess technical, legal, and operational feasibility of the proposed LDT solutions (define terms of access, base documents for prototyping, etc.).
- Validate stakeholder roles and governance structures to ensure alignment and accountability.
- Prioritise actions and resources based on feasibility, impact, and strategic alignment.
- Develop a validated roadmap for transitioning into the [DEFINE phase](#prototyping-define).

👥 **Stakeholders to Involve**

- **Project Coordination Roles** (Project Coordinators, etc.) – They are vital to align stakeholders, manage timelines, and ensure seamless integration of validated outputs into the project's strategic roadmap.
- **Domain Expertise Roles** (Use-Case Owners, Subject-Matter Experts, Researchers, Field Agents, etc.) – They ensure the real-world relevance and accuracy of use cases, validating technical and operational assumptions against domain-specific knowledge.
- **Data Roles** (GIS Specialists, Data Engineers, Open Data Officers, Data Scientists, etc.) – They confirm data feasibility, quality, and interoperability, validating whether proposed data sources and processes meet project requirements.
- **Technical Roles** (IT Department Staff, External Service Providers, Technical Experts, etc.) – They assess feasibility, validate technical requirements, and ensure alignment between proposed solutions and operational realities.
- **End-Users or representatives of civil society** (Citizens, Citizens' Associations or Panels, etc.) – They provide user-centric validation, ensuring solutions align with actual needs, usability, and societal impact.
- **Legal Roles** (Data Protection Officers, Legal Experts, Intellectual Property Managers, etc.) – They are critical to ensure compliance with regulations, mitigate risks, and align data governance with legal and contractual obligations.

???+ workshop_specifications "**VALIDATE Resources**"

    #### 2.1 Co-Creating Effective Visualisation Dashboards: Translating User Needs into Functional Indicators and Visual Prototypes {#effective-visualisation-dashboards}

    This 3-hour 15-minute workshop (1 facilitator per group of 4–5) guides participants in designing tailored indicators and dashboards that align with the diverse needs of users ensuring clarity, relevance, and alignment with strategic objectives. By adopting the perspectives of different personas, teams define persona-specific indicators, detailing the required data, sources, calculations, and visualisation formats, while mapping the journey from raw data to actionable insights. The process bridges the gap between data and real-life usage, preventing overly complex or irrelevant dashboards, and produces practical deliverables such as indicator sheets, dashboard mockups, and action plans. These outputs empower stakeholders and pave the way for prototyping or deployment.

    ??? workshop_specifications "Workshop 2.1: Co-Creating Effective Visualisation Dashboards: Translating User Needs into Functional Indicators and Visual Prototypes"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*



    #### 2.2 Implementing data governance {#implementing-data-governance}

    To support the implementation of data governance, pilots are guided via targeted workshops: identifying stakeholders’ roles ([Workshop 1.1](#mapping-use-case)), focusing on governance ([Workshop 2.2](#implementing-data-governance)), defining responsibilities ([Workshop 2.3](#inventorying-ldt-project-data) and [2.4](#unlocking-interoperability)), clarifying legal frameworks (Workshops 2.2.4 and 2.2.5) that together benefit sustainability and stakeholder alignment.

    ???+ workshop_specifications "A focus on data governance"

        ??? workshop_specifications "Workshop 2.2.1: Understanding Data Governance and Setting the Goal: From Vision to a First Actionable Roadmap"

            This workshop clarifies data governance by exploring its political, legal, organisational, and technical dimensions, building a shared strategic vision for the local authority or region. Through prospective analysis, participants envision ideal governance scenarios, identify levers and obstacles, and translate insights into a timeline-based action plan — embedding governance into all data projects and defining the roles, processes, and conditions for data quality, sharing, and collective skill growth.


            [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


        ??? workshop_specifications "Workshop 2.2.2: Mapping Stakeholders' Legitimacy and Authority to act in Data Governance: Understand Roles, Responsibilities, and Hierarchical Influence"

            Through a role-playing exercise, participants impersonate future users (e.g., operational agents or decision-makers) to simulate a typical day, uncovering challenges and imagining improvements to tools, processes, and interactions. Functional requirements are collectively listed, prioritised, and assessed for usefulness, feasibility, and originality. The workshop produces a visual stakeholder map, insights on power dynamics and governance gaps, and actionable inputs for future governance workshops.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

        ??? workshop_specifications "Workshop 2.2.3: Designing your Data Governance Roadmap: From Data Officer Mission Statement to Action"

            This workshop systematically guides participants through the development of a structured governance framework, beginning with the definition of a Data Officer’s mission statement and culminating in a detailed, actionable roadmap that aligns roles, responsibilities, and operational stages with organisational objectives. Its primary outputs include a finalised mission statement, a prioritised action plan with assigned timelines and responsibilities, and a visual roadmap outlining short-, medium-, and long-term governance actions, ensuring clarity, accountability, and strategic alignment in data management initiatives.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

        ??? workshop_specifications "Workshop 2.2.4: Complementing your Data Governance Roadmap with a Legal Framework: From Mapping Legal Phases to Action"

            This workshop empowers participants to draft robust contracts with providers and partners at every project stage —from LDT creation to interconnection— by identifying essential clauses and leveraging adaptable contractual frameworks (e.g., standard agreements for Proof of Concepts or operational contracts). It focuses on mitigating risks of technological or contractual lock-ins, ensuring seamless interoperability with local authority ecosystems, and equipping teams to negotiate effectively with suppliers while formalising interoperability requirements. Through a structured review of interoperability dimensions (technical, semantic, organisational, legal, and political), participants analyse their project’s key stages, using provided resources (clauses, standard contracts, case studies, …) to address critical questions. By the workshop’s conclusion, participants (with legal teams) gain clarity on long-term legal actions, IP management, and contract terms for procurement, subcontracting, and co-creation, ensuring the twin’s sustainability and value retention in public-private partnerships.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

        ??? workshop_specifications "Workshop 2.2.5: Refining your Legal Framework for Data Governance: Deep dive into legal and contractual requirements"

            The legal framework is an essential aspect of data governance. To ensure control, avoid fragmentation and secure usage, local authorities must rely on robust contractual clauses and appropriate internal processes. The aim of this workshop is to enable participants to identify their regulatory needs, formulate concrete proposals for clauses or actions, and compare these needs with existing resources.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*        

    #### 2.3 Inventorying your LDT Projects' Data: Unlocking Interoperability, Listing and committing to share data among partners {#inventorying-ldt-project-data}

    This 1-hour 40-minute workshop (1 facilitator per group of 4–5) refines and expands the use case designed in 2.2.1 Understanding Data Governance and Setting the Goal by identifying data sources, lifecycle stages, and the roles of stakeholders in data management, with a focus on ensuring interoperability through APIs like Next Generation Service Interface with Linked Data (NGSI-LD) for future reuse. Participants —including technical and domain expertise roles— build on the initial use-case diagram ([Workshop 1.1 Mapping your Use Case](#mapping-use-case)) to map data flows, transformations, and tools, while also addressing storage, integration, and potential open data publishing. 

    ??? workshop_specifications "Workshop 2.3: Inventorying your LDT Projects' Data: Unlocking Interoperability, Listing and committing to share data among partners"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*




    #### 2.4 Identifying Levers, Obstacles and Objectives for Interoperability: From Awareness to Actionable Strategies for LDT Projects {#unlocking-interoperability}

    This more technical workshop introduces participants to interoperability and highlights its importance from the outset of a data project, helping them in  identifying obstacles, levers and levels of interoperability (technical, syntactic, semantic, governance). Through a collective diagnosis using the visual exercise known as ‘Speed-Boat’ (anchors = brakes, sails = levers, island = objectives), teams prioritise needs, share feedback and define concrete short-term actions. The workshop anticipates interoperability issues (data silos, incompatible formats, lack of governance) and equips teams to avoid them by building a shared vision between business lines, technical teams and decision-makers. It facilitates the integration of requirements into specifications and prepares additional actions to ensure usable, interconnected and sustainable data in the following stages.

    ??? workshop_specifications "Workshop 2.4: Identifying Levers, Obstacles and Objectives for Interoperability: From Awareness to Actionable Strategies for LDT Projects"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*



    #### BONUS Lego® Serious Play: A Transversal Tool to Unblock and Deepen Data Governance Challenges {#lego-serious-play}

    The Lego® Serious Play workshop transforms abstract governance and project challenges into tangible, visual models, fostering shared understanding and creative problem-solving among diverse stakeholders. By moving beyond traditional formats, it unlocks original solutions and highlights gaps or unresolved issues before implementation. Teams can tackle challenges like: Designing governance frameworks (internal/external); Building IT architectures (e.g., hypervisors); Prototyping ideal user journeys or training action plans; Aligning cross-territory partnerships for shared data use cases. The hands-on approach ensures flexibility and clarity, making complex ideas adaptable and actionable.


    ??? workshop_specifications "Workshop BONUS: Lego® Serious Play: A Transversal Tool to Unblock and Deepen Data Governance Challenges"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


✨ **Achievements at the end of the stage**

At this stage of the method, the following elements have been achieved or identified:

- Validated use cases with tested assumptions and feasibility assessments.
- Technical, legal, and operational constraints documented and addressed.
- Refined stakeholder roles and governance structures with clear responsibilities.
- Actionable roadmaps for [data governance](#implementing-data-governance), [legal compliance](#legal-guidance), and business models.
- Prioritised action plans with timelines, resources, and risk mitigation strategies.
- Stakeholder buy-in and alignment on validated outputs.

➡️ Next: [Phase 3 – Prototyping (DEFINE)](#prototyping-define)

---

### Phase 3 – Prototyping (DEFINE) {#prototyping-define}

Prototyping is the stage that transforms a still theoretical project into concrete proof of feasibility. It is not yet a question of producing a finished service, but of rapidly testing a solution on a restricted perimeter, using real data, confronting ideas with technical, functional, and human reality.

This is not a compulsory stage. The previous stages can show that solutions on the market do indeed meet the needs identified, and that prototyping is not a required necessity. Nevertheless, an experimentation stage can always be useful before large-scale deployment.

In the LDT4SSC methodology, the aim of prototyping is twofold: to demonstrate that the idea works, and to check that it has real value for users. It is an iterative, experimental, and frugal approach, which should enable you to learn quickly without committing to heavy investment. The aim is also, from this stage onwards, to rely on a scalable infrastructure, so that you don't have to start from scratch during the [deployment phase](#deployment-implement).

📋 **Prerequisites**

- Validated use cases, stakeholder maps, and feasibility assessments from the [VALIDATE step](#specifications-validate).
- Technical and operational expertise to define system architecture, data flows, and integration requirements.
- Stakeholder consensus on governance structures, roles, and decision-making processes.
- Access to necessary tools and templates (e.g., system design frameworks, governance charters, project management software).
- Clear strategic alignment with public policies, sustainability goals, and organisational objectives.

🎯 **Objectives**

- Experiment with concrete solutions using real data and representative users.
- Validate organisational hypotheses.
- Confirm technical feasibility (data access, processing, flow integration, result display, etc.).
- Confirm or refine design choices based on practical feedback.
- Prepare the conditions for future deployment (technical, organisational, legal).

👥 **Stakeholders to Involve**

- **Project Coordination Roles** (Project Coordinators, etc.) – They orchestrate cross-functional alignment, timelines, and resource allocation for definition outputs.
- **Domain Expertise Roles** (Use-Case Owners, Subject-Matter Experts, Researchers, Field Agents, etc.) – They refine use-case specifications and technical requirements, ensuring alignment with operational realities.
- **Data Roles** (GIS Specialists, Data Engineers, Open Data Officers, Data Scientists, etc.) – They design data architectures and workflows, validating interoperability and quality standards.
- **Innovation / Smart City Roles** (Smart City Experts, UX/UI Designers, Innovation Laboratories, etc.) – They drive user-centric, innovative design and ensure solutions align with smart city standards and emerging best practices.
- **Legal Roles** (Data Protection Officers, Legal Experts, Intellectual Property Managers, etc.) – They embed legal and ethical guardrails into governance frameworks and data-sharing agreements.
- **End-Users or representatives of civil society** (Citizens, Citizens' Associations or Panels, etc.) – They validate user experience and accessibility of proposed dashboards or tools.
- **Technical Roles** (IT Department Staff, External Service Providers, Technical Experts, etc.) – They provide early technical validation of system integration or scalability constraints.

???+ workshop_prototyping "DEFINE Resources"

    #### 3.1 Prototyping a Use Case with a Context Broker: A Step-by-Step Technical Guide for LDT4SSC Pilots {#prototyping-use-case-context-broker}

    These slides are an optional but practical resource for pilots who want to technically implement a use case using a context broker, completing the PROTOTYPING–DEFINE phase of the methodology. They walk through four steps: (1) accurately defining needs (purpose, data inventory, functionalities); (2) modelling and contextualising data using existing standards, ontologies, and a cross-functional repository; (3) integrating data into a platform via ETL pipelines, converting to NGSI-LD format; and (4) exploiting the data through dashboards, business applications, open data publications, or inter-system reuse. The approach is illustrated with the energy consumption use case from the City of Paris, and is transferable to any use case.

    ??? workshop_prototyping "Methodology. Prototyping your Use Case with a Context Broker: A Step-by-Step Technical Guide for LDT4SSC Pilots"

        [Download methodology as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


✨ **Achievements at the end of the stage**

At this stage of the method, the following elements have been produced or identified:

- A prototype that meets the use case.
- Reusable knowledge model(s).
- The code used to produce the algorithms or models.
- Documentation of the prototype.

It is then about expanding user testing, in a logic of progressive test/iteration, to arrive at a validation (or not!) from the community on scaling up. At that moment, we are at T0 of the [cost-benefit analysis](#costbenefit-analysis-and-impact-assessment) method (see [workshop 1.2 Questioning the Purpose of your LDT Project](#questioning-the-purpose)).

➡️ Next: [Phase 4 – Deployment (IMPLEMENT)](#deployment-implement)

---

### Phase 4 – Deployment (IMPLEMENT) {#deployment-implement}

Deployment is the final stage, marking the transition from experimentation to implementation. Having demonstrated the feasibility of a project through a prototype, it is now a question of getting it used by all the end users within the organisation. This phase involves stabilising the prototype, making it reliable, and putting in place maintenance so that it becomes a long-term tool.

During this phase, the project's technical infrastructure, its economic model, and the [legal framework](#legal-guidance) for its use will be finalised, and a deployment action plan will be drawn up, involving in particular the acculturation, training, and onboarding of all staff.

Ideally, most of the subjects covered in this stage ([business model](#designing-business-model), [legal framework](#legal-guidance), [staff familiarisation](#onboarding-acculturation)) may already have been addressed upstream, so the aim here is to formalise the concrete elements arising from these discussions.

This stage may also enable the project to be scaled up, either within the same region, or through re-use or pooling with other local authorities.

📋 **Prerequisites**

- Finalised project blueprint from the [DEFINE step](#prototyping-define), including technical specifications, governance models, and action plans.
- Secured resources (budget, technology, personnel) for deployment and operation.
- Stakeholder readiness and commitment, including trained teams and clear communication channels.
- Established monitoring and evaluation frameworks to track progress and measure impact.
- Compliance with legal, ethical, and regulatory requirements, including data protection and interoperability standards.

🎯 **Objectives**

- Deploy the Local Digital Twin (LDT) platform based on the defined architecture, governance frameworks, and action plans.
- Execute operational workflows, ensuring seamless integration of data sources, tools, and stakeholder processes.
- Monitor and evaluate performance against established KPIs, adjusting strategies as needed for optimal outcomes.
- Ensure stakeholder engagement and capacity-building to support adoption, training, and long-term sustainability.
- Document lessons learned and best practices for scalability, replication, and continuous improvement.

👥 **Stakeholders to Involve**

- **Project Coordination Roles** (Project Coordinators, etc.) – They oversee implementation timelines, stakeholder communication, and risk management.
- **Data Roles** (GIS Specialists, Data Engineers, Open Data Officers, Data Scientists, etc.) – They manage data pipelines, quality control, and real-time monitoring of the LDT system.
- **Technical Roles** (IT Department Staff, External Service Providers, Technical Experts, etc.) – They execute platform deployment, integration, and troubleshooting, ensuring operational readiness.
- **Legal Roles** (Data Protection Officers, Legal Experts, Intellectual Property Managers, etc.) – They ensure ongoing compliance with data protection, licensing, and contractual obligations.
- **Domain Expertise Roles** (Use-Case Owners, Subject-Matter Experts, Researchers, Field Agents, etc.) – They support field-level validation and troubleshooting of use-case-specific issues.
- **End-Users or representatives of civil society** (Citizens, Citizens' Associations or Panels, etc.) – They provide feedback on usability and impact, enabling iterative improvements post-deployment.
- **Other Local Authorities facing similar issues** – They enable cross-city knowledge exchange and replication of successful deployment strategies, fostering scalability and shared learning.

???+ workshop_deployment "IMPLEMENT Resources"

    #### 4.1 Onboarding & Acculturation in Digital Projects: Engaging Stakeholders, Defining Training Paths, and Building a Sustainable Adoption Plan {#onboarding-acculturation}

    This workshop fosters staff and stakeholder commitment to data projects by clarifying their roles, benefits, and required engagement levels, while tailoring awareness-raising and training initiatives to create a collaborative, data-driven culture. Participants map stakeholders into three tiers —stakeholders directly contributing to the project, the ones indirectly involved and citizens— defining tailored knowledge, key messages, and engagement methods (e.g., training, demos, interactive tools), culminating in an operational action plan for sustainable adoption. By embedding the human dimension early, it aligns technical teams, business units, and decision-makers, ensuring shared understanding and skills development. The outputs —audience maps, messaging frameworks, and action plans— serve as a blueprint for community engagement, reinforcing project resilience against organisational or regulatory shifts.

    ??? workshop_deployment "Workshop 4.1: Onboarding & Acculturation in Digital Projects: Engaging Stakeholders, Defining Training Paths, and Building a Sustainable Adoption Plan"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

    #### 4.2 Designing a Structured Action Plan: From Ideas to Execution for Your Use Case {#designing-action-plan}

    This workshop helps participants develop a practical action plan for implementing their use case, whether during deployment or earlier planning stages. Using insights from prior workshops (e.g., [Lego](#lego-serious-play) or [Use-Case Mapping](#mapping-use-case)), teams identify key steps  around the four dimensions: legal, technical, organisational, and political and organise them into a timeline with parallel actions and dependencies. Participants then script three implementation scenarios, balancing constraints and opportunities while preserving the project’s core objectives. The process clarifies priorities, anticipates obstacles, and provides decision-makers with clear, adaptable options to align expectations and streamline execution.

    ??? workshop_deployment "Workshop 4.2: Designing a Structured Action Plan: From Ideas to Execution for Your Use Case"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

    #### 4.3 Designing a Sustainable Business Model: Funding, Valuation, and Deployment Strategies for Your Project {#designing-business-model}

    This workshop helps participants identify and structure financial levers —such as cost savings, subsidies, partnerships, or data-driven services— to ensure the sustainability and deployment of their project (experiment, data service, or digital infrastructure). Teams explore economic models, map resources, partners, and funding sources, and assess legal, technical, and organizational feasibility to define viable revenue-sharing and risk-management strategies. By integrating financial planning early, it secures project viability, aligns funding with objectives, and fosters public-private collaboration. The outputs —model mappings, feasibility analyses, and cost estimates— provide a compelling case for decision-makers and investors.

    ??? workshop_deployment "Workshop 4.3: Designing a Sustainable Business Model: Funding, Valuation, and Deployment Strategies for Your Project"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

    #### 4.4 Refining the Business Model: Designing, Testing, and Refining Your Strategy with a Canvas {#refining-business-model}

    This workshop enables participants to iteratively develop and validate a robust business model using the Business Model Canvas, ensuring that all strategic, operational, and financial dimensions are aligned with project goals and stakeholder needs. Its key outputs include a fully populated and refined Business Model Canvas, a prioritised set of actionable strategies with clear responsibilities and timelines, and a documented validation process incorporating stakeholder feedback, thereby providing a structured, adaptable, and implementation-ready framework for sustainable project deployment.

    ??? workshop_deployment "Workshop 4.4: Refining the Business Model: Designing, Testing, and Refining Your Strategy with a Canvas"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*

    #### 4.5 Completing your Data Cooperation Canvas (DS4SSCC): Developing Multi-Stakeholder Data Cooperation {#completing-dcc}

    This workshop aims to unlock the power of collaborative data-sharing through a hands-on, interactive experience designed to help participants define, structure, and implement multi-stakeholder data initiatives with clarity and purpose. Over two and a half days, participants will map objectives, identify key partners, design data flows, and build actionable governance models, turning abstract ideas into a tangible roadmap for trustworthy and sustainable data cooperation. Whether they are tackling smart city challenges, public sector innovation, or cross-organisational projects, this workshop equips them with the tools, frameworks, and stakeholder alignment needed to transform data into shared value.

    ??? workshop_deployment "Workshop 4.5: Completing your Data Cooperation Canvas (DS4SSCC): Developing Multi-Stakeholder Data Cooperation"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

        *PDF coming soon — contact the project team in the meantime.*


✨ **Achievements at the end of the stage**

At this stage of the method, the following elements have been achieved or identified:

- An action plan to scale up the project (acculturation, adoption, next steps, links to other use cases, etc.).
- A list of funding and revenue sources to ensure the project's long-term viability and the foundations of the business plan.
- A clear vision of the collaborations to be established with new partners around data for future use cases.
- Deployed LDT platform with integrated data sources and operational workflows.
- Functional dashboards and tools tailored to end-user needs.
- Established data pipelines ensuring quality, interoperability, and real-time monitoring.
- Trained stakeholders (staff, partners, end-users) with capacity-building initiatives.
- Documented lessons learned and best practices for scalability and replication.
- Ongoing evaluation framework to measure impact, user feedback, and continuous improvement.

➡️ See also: [Cost–Benefit Analysis and Impact Assessment](#costbenefit-analysis-and-impact-assessment) | [Legal Guidance](#legal-guidance)

---

## Cost–Benefit Analysis and Impact Assessment

This section introduces the tools and approaches pilots should use to assess the economic, social, and environmental impacts of their LDT projects, centring on the LDT4SSC project's Impact Assessment Framework (D2.1) and Cost–Benefit Analysis (CBA) evaluation.

### LDT4SSC Impact Assessment

The [**LDT4SSC Impact Assessment Framework**](#impact-assessment-download) provides a structured intervention logic based on the theory-of-change to track how pilot activities translate into outputs, outcomes, and longer-term impacts within the LDT4SSC programme. It standardises monitoring across pilots, aligning pilot outputs (e.g., use cases, operational LDTs, interoperable artefacts, AI services, governance arrangements, communities of stakeholders, and value-proposition evidence) with broader changes that pilots aim to enable, linked to project-level outcomes (federation of LDTs, uptake by less-advanced communities, and service adoption) and EU-level impacts (sustainability, resilience, and alignment with the Green Deal and SDGs).

By defining clear output, outcome, and impact indicators and validation methods, the framework ensures comparability, repeatability, and a basis for aggregation and recommendations for the Common Interoperability Blueprint and LDT ecosystem.

The framework is embedded in the pilot's journey, requiring pilots to describe context and inputs, report activities and track specified output indicators, and to link outputs to measurable short-term outcomes and intended long-term impacts. Monitoring is iterative: pilots submit baseline, interim (6-monthly) and final reports through self-assessment questionnaires that will be shared later on as resources to pilots.

<a id="impact-assessment-download"></a>
!!! info "The LDT4SSC Impact Assessment Framework"
    [Download as PDF](#){ .md-button .md-button--primary }

    *PDF coming soon — contact the project team in the meantime.*


### Cost–Benefit Analysis

Cost-Benefit Analysis (CBA) is a decision-making tool that involves measuring the various expected effects of a public policy, relative to a baseline situation, by expressing them in a common unit — the monetary unit. These effects can be:

- **Economic**: savings for the community, investment costs, gain or loss of productivity.
- **Social**: changes in quality of life, noise pollution, etc.
- **Environmental**: evolution of pollution, impact on biodiversity, CO₂ emissions, etc.

Public investment is justified if the digital solution produces more benefits than completing the project without this solution.

In the context of the LDT4SSC project, pilots must perform a cost-benefit analysis of their projects and share it as part of Pilot Deliverable 5. The purpose of this evaluation is to allow for a comprehensive assessment of the digital solution and to deduce its financial as well as socio-environmental utility. This evaluation can be done after the solution has been implemented (ideally one year after), but also — with less accurate results — before implementation. It is recommended that pilots record the relevant baseline data before they start their project to be able to carry out the comparison.

Pilots will find below a document to guide them in evaluating the actual costs and objective benefits for the different beneficiaries of their pilot projects.

<a id="cost-benefit-analysis-download"></a>
!!! info "The LDT4SSC Cost-Benefit Analysis"
    [Download as PDF](#){ .md-button .md-button--primary }

    *PDF coming soon — contact the project team in the meantime.*

**Resources:**

- [Cerema – Responsible Digital Programme](https://smart-city.cerema.fr/programme-numerique-responsable)
- [Cerema – CBA Guidance Document](https://cerema.app.box.com/s/po7lz1x3gxjo7kuvqh9h4n2w9yaiffbh)

**To go further:** [Workshop 1.2: Questioning The Purpose of your LDT Project](#questioning-the-purpose)

---

## Legal Guidance

To go beyond purely regulatory aspects and guide public authorities and their service providers in setting up a legal framework for their projects and navigating the legal journey, a [**Practical Legal Guide**](#legal-guidance-download) will be shared below.

This document provides legal guidance at all steps of a typical project lifecycle, mirroring the operational and technical steps of the [LDT4SSC Methodology](#the-ldt4ssc-methodology). These legal stages complement the project-level steps of the methodology: (1) [Explore – Ideation](#ideation-explore), (2) [Validate – Specification](#specifications-validate), (3) [Define – Prototype](#prototyping-define), and (4) [Implement – Deployment](#deployment-implement). Project legal milestones — such as implementing a call for tenders, partnering up, setting proper data governance, the end of a legal contract, or mutualising a platform — are typical legal stages of a project. The guide prompts project managers with the relevant questions at every stage, providing recommendations and resources to help them find fit-for-purpose legal clarity.

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

## Other resources

This table summarises other important resources from the initiatives in the ecosystem.

<!-- | Title | Small Description | Source | Thematic Area |
|-------|-------------------|--------|---------------|
| [DSSC's Co-Creation Method – Align Stakeholders on the Data Space Scope](https://dssc.eu/space/BVE2/1071257999/Align+Stakeholders+on+the+Data+Space+Scope) | Helpful to build consensus on the data space's boundaries and goals, ensuring all stakeholders share a clear vision | DSSC | Data Spaces |
| [The Economics of Data Sharing: Insights from a Legal-Economics Workshop](https://dssc.eu/space/News/blog/1284145156/The+Economics+of+Data+Sharing:+Insights+from+a+Legal-Economics+Workshop) | Provides insights on economic incentives and legal frameworks that can help design sustainable data sharing models. | DSSC | Data Spaces |
| [MIMS Specification Introduction](https://mims.oascities.org/NzWXOO1Fttw4wtqv1Wys) | Introduces standards for interoperable data management, essential for connecting platforms. | OASC | Interoperability / MIMs |
| [DS4SSCC-DEP Blueprint](https://static1.squarespace.com/static/63718ba2d90d0263d7fc1857/t/6527a36ea3fd1470ffc95fec/1697096639359/D4.1_DS4SSCC_Data+Space+Blueprint+and+Priority+Data+Sets.pdf) | | DS4SSCC | Data Spaces |
| [DS4SSCC's Multi-Stakeholder Governance Scheme](https://inventory.ds4sscc.eu/multi-stakeholder-governance/developing-multi-stakeholder) | Guidelines to set up multi-stakeholder governance, crucial for trust and collaboration in data spaces and LDTs. | DS4SSCC | Data Spaces |
| [Guidance for the Integration of Digital Twins in Data Spaces](https://aioti.eu/wp-content/uploads/Guidance-for-the-Integration-of-Digital-Twins-in-Data-Spaces-Final.pdf) | This document focuses on the integration of digital twins in data spaces: it provides a context on data spaces, digital twins, IoT and edge computing and standardisation; it provides an analysis on the integration of digital twins in data spaces taking an architecture approach; it describes a large number of digital twin use cases in domains such as agriculture, connected vehicles, smart cities, energy, smart manufacturing. The document can be used to provide insights and sources for future standardisation work related to the integration of digital twins in data spaces. | AIOTI | Digital Twins |
| [Policy processes and building blocks for Digital Twins](https://www.geonovum.nl/uploads/documents/Eindrapport%20Advies%20Beleid%20en%20Digital%20Twins%20-%20provincie%20Utrecht%20v1.3d_EN.pdf) | | GEONOVUM | Digital Twins |
| [IDSA - Rulebook](https://github.com/International-Data-Spaces-Association/IDSA-Rulebook/blob/main/documentation/2.%20Guiding_Principles/2.1%20Overaching_considerations.md) | The IDSA Rulebook serves several purposes regarding the development and operation of data spaces. The aim is to describe clearly which rules are mandatory and which are optional guidelines. This governance framework includes functional, technical, operational, and legal dimensions. It also presents a PESTEL analysis of the overarching considerations of data spaces which is interesting regarding the impact assessment. | IDSA | Data Spaces |
| [Catalogue of Tools](https://living-in.eu/catalogue-of-tools) | A curated set of ready-to-use resources (tools, frameworks, guidelines) to support local authorities in digital transformation: includes procurement templates, interoperability standards (e.g. MIMs), capacity-building tools. Pilots of LDT4SSC can use these tools to procure and build Local Digital Twins (LDTs) in line with EU best practices. | Living-in.EU | Cities Network and Supporting Actions |
| [Knowledge Base](https://living-in.eu/knowledge-base) | A knowledge repository of documents, studies, guidelines, webinars, and working-group outputs. For LDT4SSC pilots, this Knowledge Base provides evidence, legal and technical guidance, and community-shared lessons relevant to digital twin implementation. | Living-in.EU | Cities Network and Supporting Actions |
| [Procurement Support Materials](https://living-in.eu/eu-support-services/procurement-support-materials) | Procurement guidelines, templates, and a glossary designed specifically to help EU cities and communities acquire digital infrastructures and digital twins. For LDT4SSC pilots, these materials simplify tender processes, ensure alignment with EU standards, and embed interoperability, sustainability, and social criteria. | Living-in.EU | Cities Network and Supporting Actions |
| [Digital Twin Business Maturity Model](https://www.digitaltwinconsortium.org/publications/digital-twin-business-maturity-model/) | A maturity model from the Digital Twin Consortium defining five maturity stages (Passive → Master) across dimensions such as Strategy, Culture, Technology. LDT4SSC pilots can use it to assess their current maturity in digital twin adoption, plan progression, and benchmark against peer organizations. | Digital Twin Consortium | Digital Twin |
| [Digital twins for cities and municipalities DIN SPEC – Build a digital twin for smart cities (Germany)](https://www.dinmedia.de/en/technical-rule/din-spec-91607/384414386) | Gives a holistic overview of urban digital twins. At the heart of the document are the use cases, the description of urban digital twins (including capabilities) and a maturity model. As part of the development of this DIN SPEC, around 100 different municipal usage scenarios were identified by the participating municipalities and assigned to municipal spheres of activity. | DIN | Digital Twin |
| [DTC Digital Twin Capabilities Periodic Table](https://www.digitaltwinconsortium.org/digital-twin-capabilities-periodic-table-download-all-v1-form/) | The Digital Twin Capabilities Periodic Table (CPT) is an architecture and technology agnostic requirements definition framework for digital engineering projects. It is aimed at organizations who want to design, develop, deploy and operate digital twins based on use case capability requirements versus the features of technology solutions. | DIGITAL TWIN CONSORTIUM | Digital Twin |
| [UNRAVELLING THE USE OF DIGITAL TWINS TO ASSIST DECISION- AND POLICY-MAKING IN SMART CITIES](https://arxiv.org/pdf/2405.20916) | "The main objective of this ongoing research is to review the existing literature on the intersection of digital twins and smart cities with a focus on decision and policy-making support and to answer the research question: "What are the existing applications of digital twins for smart cities for aiding decision-and policy-making?"" | ARXIV | Digital Twin |
| [Trusted Data Transaction](https://www.cencenelec.eu/media/CEN-CENELEC/CWAs/RI/2024/cwa18125_2024.pdf) | Provides terminology, concepts and mechanisms in the field of data exchange focusing on trusted data transactions. | CEN / CENELEC | Legal terminologies |
| [High-Level Forum on European Standardisation Final report of work-stream 14](https://ec.europa.eu/docsroom/documents/58914) | The report is the result of Workstream 14 on Data Interoperability of the High-Level Forum on European Standardisation (HLF). The workstream was initiated to help establish a coordinated approach to (European) standardisation in support of the interoperability requirements established in the horizontal data legislation, implementing the European data strategy (2020). The clarity, transparency, and reliability resulting from a well-designed overall set of standards will significantly lower entry barriers for the application of data spaces and thus support the emergence of a vibrant data ecosystem in Europe. | EUROPEAN COMMISSION | Data Spaces |
| [New European Interoperability Framework](https://ec.europa.eu/isa2/sites/default/files/eif_brochure_final.pdf) | Promoting seamless services and data flows for European public administrations | EUROPEAN COMMISSION | Data interoperability |
| [Accessibility Inspection Grid](../assets/XLSs/blank_quick-accessibility-inspection-grid_2025.xlsx) | Quick Accessibility Inspection Grid | French Government | Accessibility | -->


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

## Additional resources from the LDT4SSC ecosystem

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
