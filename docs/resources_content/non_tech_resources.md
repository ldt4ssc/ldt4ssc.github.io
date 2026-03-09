# Non-technical Resources

!!! tip "On this page"
    - [Example Stories](#example-stories) - See potential pilot scenarios
    - 📖 [The LDT4SSC Methodology](#the-ldt4ssc-methodology) - Four-phase implementation framework
    - [Other Resources](#other-resources) - Additional ecosystem resources

## 🎯 What you'll find here

These non-technical resources provide practical guidance for the organisational, strategic, legal, and governance aspects of the pilot journey.

**Quick links:**

- 📖 [The LDT4SSC Methodology](#the-ldt4ssc-methodology) - Navigate the four-phase framework
- 💡 [Example Stories](#example-stories) - Fictional pilot scenarios for each work strand
- [Other Resources](#other-resources) - Additional ecosystem resources

The resources support pilots and applicants in aligning stakeholders, structuring responsibilities, anticipating risks, and creating the conditions for sustainable, interoperable, and widely adopted digital services. Together, these methods and workshops help build the shared culture, clarity, and coordination required to transform a use case into a long-lasting, impactful solution.

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

### Ideation (EXPLORE) {#ideation-explore}

Many digital projects fail because they jump too quickly to a solution without clarifying the underlying need. The ideation phase establishes a shared foundation by defining a clear use case, identifying relevant data, anticipating impacts, and aligning all stakeholders. It also embeds responsible digital principles early on, questioning the project's purpose, ethics, and long-term value.

📋 **Prerequisites**

- A clearly identified problem rooted in the organisation's mission
- Political/strategic support and a committed sponsor
- A dedicated project manager
- Ability to mobilise internal and external stakeholders

🎯 **Objectives**

- Clarify and contextualise the problem
- Identify beneficiaries, expected impacts, context, actors, available data, constraints, and risks
- Produce a project framework to secure resources (funding, support, platforms)


👥 **Stakeholders to Engage**

- Operational/business teams
- Cross-functional or "bridge" agents
- Decision-makers (managers, elected officials)
- IT and data teams
- End-users or their representatives
- Technical partners, experts, or peer local authorities  



???+ workshop_ideation "**EXPLORE Resources**"

    #### 1.1 Mapping your Use Case: Visualising Processes, Pinpointing Challenges, and Co-Designing Data-Driven Solutions {#mapping-use-case}

    This workshop helps participants build a shared understanding of the use case by collaboratively drawing the current process, data flows, and pain points. By making an abstract idea tangible and envisioning an ideal future state, it aligns stakeholders early on and forms a visual foundation for the rest of the project.

    ??? workshop_ideation "Workshop 1.1: Mapping your Use Case: Visualising Processes, Pinpointing Challenges, and Co-Designing Data-Driven Solutions"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

    #### 1.2 Questioning The Purpose of your LDT Project: Iterative Mapping of the Multi-Dimensional Costs and Benefits {#questioning-the-purpose}

    This workshop helps teams clarify the deeper purpose of their digital project by exploring the operational, user, strategic, economic, and socio-environmental benefits it aims to deliver. By identifying the real objectives and expected impacts, stakeholders can better articulate the project, prioritise functionalities, and avoid solutions that fail to address the core problem.

    ??? workshop_ideation "Workshop 1.2: Questioning The Purpose of your LDT Project: Iterative Mapping of the Multi-Dimensional Costs and Benefits"

        [Download workshop as PDF](#){ .md-button .md-button--primary }


    #### 1.3 Implementing Sustainable Digital Design: Assessing and Integrating Social, Environmental, and Economic Impacts in Digital Projects {#implementing-sustainable-digital-design}

    This workshop invites teams to evaluate their project through the lens of sustainable design for digital services, questioning its necessity, relevance, and potential ecological, social, and economic impacts. It provides a quick, collective assessment of both positive and negative effects across the project lifecycle, helping decision-makers make more responsible and informed choices.

    ??? workshop_ideation "Workshop 1.3: Implementing Sustainable Digital Design: Assessing and Integrating Social, Environmental, and Economic Impacts in Digital Projects"

        [Download workshop as PDF](#){ .md-button .md-button--primary }


✨ **Achievements at the end of the phase**

- A drawing of the use case identifying the data sources, their path, the Information System bricks, the players, etc.
- The desired impacts by type
- The reason why for the project
- The costs and benefits, and the indicators for monitoring them
- The project stakeholders


---

### Specifications (VALIDATE) {#specifications-validate}

After ideation clarifies the need, motivations, stakeholders, and data, the specification phase focuses on defining *how* the solution should work. It translates the shared use case into functional and technical requirements, taking into account real-world constraints (data, architecture, users, security). This phase prevents misunderstandings between business and technical teams, embeds interoperability early on, and provides the basis for selecting or prototyping the appropriate solution.

📋 **Prerequisites**

- A clear and validated use case with precise objectives
- Identified data requirements and understanding of data accessibility
- A committed project team with experience in data-related issues
- A realistic view of available resources (time, budget, technical support)

🎯 **Objectives**

- Identify and describe personas (future users of the solution)
- Translate functional needs into operational technical specifications
- Identify required data and define its lifecycle
- Determine necessary indicators, dashboards, and potential simulations
- Define data access conditions, legal constraints, and governance arrangements
- Produce documentation to guide development or prototyping

👥 **Stakeholders to Engage**

- Business referents (use case owners, service managers)
- End-users of the solution
- Data engineers or data architects
- IT or infrastructure managers
- Legal experts or DPOs when personal data or data-sharing clauses apply 

???+ workshop_specifications "**VALIDATE Resources**"

    #### 2.1 Co-Creating Effective Visualisation Dashboards: Translating User Needs into Functional Indicators and Visual Prototypes {#effective-visualisation-dashboards}

    This workshop helps participants build a shared, strategic vision of what fit-for-purpose data governance should look like in their organisation by exploring political, legal, organisational, and technical dimensions and imagining ideal and undesirable future scenarios. It then translates these insights into a concrete action plan, clarifying roles, processes, and conditions for success to ensure sustainable and coordinated data governance across projects.

    ??? workshop_specifications "Workshop 2.1: Co-Creating Effective Visualisation Dashboards: Translating User Needs into Functional Indicators and Visual Prototypes"

        [Download workshop as PDF](#){ .md-button .md-button--primary }



    #### 2.2 Implementing data governance {#implementing-data-governance}

    This section presents data governance as a cross-functional framework encompassing technical, legal, organisational, and strategic dimensions, essential for creating digital twins and connecting them within shared data infrastructures. It outlines a set of common practices and workshops that help project leaders and partners clarify roles, establish processes, and build sustainable, collaborative governance structures that support long-term reuse and interoperability.

    ???+ workshop_specifications "A focus on data governance"

        ??? workshop_specifications "Workshop 2.2.1: Understanding Data Governance and Setting the Goal: From Vision to a First Actionable Roadmap"

            This workshop helps identify all stakeholders involved in data governance—both internal and external—and clarify their roles, expertise, responsibilities, and ability to act or contribute. By visually mapping actors and defining collaboration and data-sharing conditions, it lays the groundwork for cross-functional and multi-partner governance essential to implementing the project.

            [Download workshop as PDF](#){ .md-button .md-button--primary }


        ??? workshop_specifications "Workshop 2.2.2: Mapping Stakeholders' Legitimacy and Authority to act in Data Governance: Understand Roles, Responsibilities, and Hierarchical Influence"

            This workshop focuses on clarifying and formally documenting each stakeholder’s responsibilities in data governance, ensuring that roles are explicit and aligned across the consortium. By defining missions or adapting job profiles, it strengthens engagement, accountability, and the internal structures needed to support effective, long-term data governance.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        ??? workshop_specifications "Workshop 2.2.3: Designing your Data Governance Roadmap: From Data Officer Mission Statement to Action"

            This workshop helps participants examine the legal framework needed to govern data securely and consistently, identifying regulatory requirements and the contractual clauses or internal processes needed to meet them. By comparing needs with existing resources, it supports the development of clear, robust legal foundations for data use and sharing.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        ??? workshop_specifications "Workshop 2.2.4: Complementing your Data Governance Roadmap with a Legal Framework: From Mapping Legal Phases to Action"

            This workshop equips participants to anticipate legal, contractual, and interoperability requirements at every stage of their digital twin or data platform project by examining typical clauses, risks, and resources. By mapping legal needs across the project lifecycle and drawing on standard contracts and experience reports, teams gain the ability to secure long-term viability, manage intellectual property, and negotiate effectively with suppliers and partners.

            [Download workshop as PDF](#){ .md-button .md-button--primary }

        ??? workshop_specifications "Workshop 2.2.5: Refining your Legal Framework for Data Governance: Deep dive into legal and contractual requirements"

            This workshop equips participants to anticipate legal, contractual, and interoperability requirements at every stage of their digital twin or data platform project by examining typical clauses, risks, and resources. By mapping legal needs across the project lifecycle and drawing on standard contracts and experience reports, teams gain the ability to secure long-term viability, manage intellectual property, and negotiate effectively with suppliers and partners.

            [Download workshop as PDF](#){ .md-button .md-button--primary }        

    #### 2.3 Inventorying your LDT Projects' Data: Unlocking Interoperability, Listing and committing to share data among partners {#inventorying-ldt-project-data}

    This workshop guides participants in designing dashboards and indicators that genuinely meet the needs of different user personas, ensuring each metric is meaningful, usable, and aligned with strategic objectives. By mapping the path from source data to dashboard outputs, it helps avoid overly complex or irrelevant indicators and provides solid foundations for prototyping or deployment.

    ??? workshop_specifications "Workshop 2.3: Inventorying your LDT Projects' Data: Unlocking Interoperability, Listing and committing to share data among partners"

        [Download workshop as PDF](#){ .md-button .md-button--primary }




    #### 2.4 Identifying Levers, Obstacles and Objectives for Interoperability: From Awareness to Actionable Strategies for LDT Projects {#unlocking-interoperability}

    This workshop expands the initial use-case diagram by mapping all data sources, transformations, flows, and actors involved, ensuring a complete view of the data lifecycle from creation to reuse. It also assesses interoperability needs—such as API-based access and integration requirements—to support future reuse, system alignment, and robust data infrastructure planning.

    ??? workshop_specifications "Workshop 2.4: Identifying Levers, Obstacles and Objectives for Interoperability: From Awareness to Actionable Strategies for LDT Projects"

        [Download workshop as PDF](#){ .md-button .md-button--primary }



    #### BONUS Lego® Serious Play: A Transversal Tool to Unblock and Deepen Data Governance Challenges {#lego-serious-play}

    This workshop uses the Lego Serious Play method to help participants model complex ideas—such as governance, processes, or system architecture—in a tangible and easily adjustable form. By enabling creative, visual co-construction, it reveals gaps and shared solutions more effectively than traditional discussions, supporting alignment before moving into implementation.

    ??? workshop_specifications "Workshop BONUS: Lego® Serious Play: A Transversal Tool to Unblock and Deepen Data Governance Challenges"

        [Download workshop as PDF](#){ .md-button .md-button--primary }


✨ **Achievements at the end of the phase**

At this stage of the method, the following elements have been achieved or identified:

- The personas
- The desired indicators, data visualisations and dashboards, based on the personas
- The desired functionalities, based on the personas
- The data lifecycle, and the action plan for accessing and using the data effectively

---

### Prototyping (DEFINE) {#prototyping-define}

Prototyping turns a theoretical concept into a tangible proof of feasibility. Rather than building a finished service, this phase focuses on rapidly testing a solution on a limited scope, using real data and confronting assumptions with technical, functional, and human realities. While not always mandatory—especially if existing market solutions already fit the need—prototyping often provides valuable insights before large-scale deployment. Its purpose is twofold: to show that the idea works and to confirm that it brings real value to users. This iterative, frugal approach enables quick learning while preparing the foundations for a scalable deployment.

📋 **Prerequisites**

- A prioritised and formalised use case validated internally
- Clear functional and technical specifications
- Identified and accessible datasets in usable form
- Identified human and technical resources to build the prototype
- Agreement from a small group of end-users to test the solution under semi-real conditions

🎯 **Objectives**

- Experiment with concrete solutions using real data and representative users
- Validate organisational hypotheses
- Confirm technical feasibility (data access, processing, flow integration, result display, etc.)
- Confirm or refine design choices based on practical feedback
- Prepare the conditions for future deployment (technical, organisational, legal)

👥 **Stakeholders to Engage**

- A project manager
- Business referents to test and validate functionalities
- A data engineer or developer to integrate data and build the prototype
- A UX/UI designer or facilitator (if possible) to ensure clear user journeys
- An IT or infrastructure consultant to ensure compatibility with the existing environment and support implementation  

???+ workshop_prototyping "DEFINE Resources"

    #### 3.1 Prototyping a Use Case with a Context Broker: A Step-by-Step Technical Guide for LDT4SSC Pilots {#prototyping-use-case-context-broker}

    This method ensures that prototypes are designed with interoperability at their core by first formalising a multi-dimensional representation of the use case—capturing objectives, users, features, data, and constraints—to guide collaboration with technical teams. It then structures and contextualises the data through knowledge-graph modelling and existing ontologies, creating a simplified, standards-aligned semantic model that supports integration, reuse, and long-term scalability.

    ??? workshop_prototyping "Methodology. Prototyping your Use Case with a Context Broker: A Step-by-Step Technical Guide for LDT4SSC Pilots"

        [Download methodology as PDF](#){ .md-button .md-button--primary }


✨ **Achievements at the end of the phase**

At this stage of the method, the following elements have been produced or identified:

- A prototype that meets the use case
- Reusable knowledge model(s)
- The code used to produce the algorithms or models
- Documentation of the prototype

---

### Deployment (IMPLEMENT) {#deployment-implement}

Deployment marks the transition from experimentation to full implementation. Once the prototype has demonstrated feasibility, the goal becomes widespread adoption across the organisation. This phase focuses on stabilising and securing the solution, establishing maintenance processes, and ensuring long-term sustainability. It also finalises the technical architecture, economic model, and legal framework, while preparing an action plan for training, onboarding, and organisational change. Ideally, many of these topics will have been explored earlier; this stage formalises and operationalises them. Deployment may also open opportunities for scaling, replication, or pooling with other local authorities.

📋 **Prerequisites**

- A prototype validated by target users and tested in near-real conditions
- A political or strategic decision to make the solution sustainable
- A defined target technical architecture (hosting, tools, security, interconnections)
- An analysis of implementation and maintenance costs
- A clear vision for the future governance of the solution (technical, organisational, partnership)


🎯 **Objectives**

- Establish governance for the data and service (updating, sharing, accountability)
- Choose an appropriate management structure where relevant
- Organise maintenance, support, and long-term evolution of the solution
- Technically stabilise the solution for production use
- Ensure user adoption through training and ongoing adjustments
- Document and capitalise on lessons learned to support reuse internally or externally


👥 **Stakeholders to Engage**

- The business department responsible for the project, to steer deployment and support adoption
- IT/digital teams to integrate the solution into the existing information system
- Functional managers to monitor user feedback and prioritise improvements
- External service providers for industrialisation, hosting, and technical support
- Public purchasers and legal experts to formalise contracts and clarify rights of use and ownership
- Potential partner local authorities for pooling or scaling initiatives  

???+ workshop_deployment "IMPLEMENT Resources"

    #### 4.1 Onboarding & Acculturation in Digital Projects: Engaging Stakeholders, Defining Training Paths, and Building a Sustainable Adoption Plan {#onboarding-acculturation}

    This workshop supports staff and elected representatives in understanding the value of a data project by identifying the audiences to be mobilised and defining tailored awareness and training actions. By mapping stakeholder groups and shaping clear messages and engagement strategies, it strengthens commitment, fosters collaboration, and ensures the project is sustainably adopted.

    ??? workshop_deployment "Workshop 4.1: Onboarding & Acculturation in Digital Projects: Engaging Stakeholders, Defining Training Paths, and Building a Sustainable Adoption Plan"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

    #### 4.2 Designing a Structured Action Plan: From Ideas to Execution for Your Use Case {#designing-action-plan}

    This workshop helps teams turn their use case into a concrete action plan by identifying key steps, organising them on a timeline, and exploring alternative implementation scenarios. By visualising the sequence of actions and anticipating constraints, it supports better planning, facilitates decision-making, and aligns stakeholders around a realistic path forward.

    ??? workshop_deployment "Workshop 4.2: Designing a Structured Action Plan: From Ideas to Execution for Your Use Case"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

    #### 4.3 Designing a Sustainable Business Model: Funding, Valuation, and Deployment Strategies for Your Project {#designing-business-model}

    This workshop helps participants explore and structure the financial mechanisms that will support the deployment and long-term sustainability of their data or digital project, from funding models to partnerships and value-added services. By identifying resources, revenue levers, and feasibility constraints, it ensures the project’s economic viability and provides a solid basis for decision-makers to evaluate and support the initiative.

    ??? workshop_deployment "Workshop 4.3: Designing a Sustainable Business Model: Funding, Valuation, and Deployment Strategies for Your Project"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

    #### 4.4 Refining the Business Model: Designing, Testing, and Refining Your Strategy with a Canvas {#refining-business-model}
    
    ??? workshop_deployment "Workshop 4.4: Refining the Business Model: Designing, Testing, and Refining Your Strategy with a Canvas"

        [Download workshop as PDF](#){ .md-button .md-button--primary }

    #### 4.5 Completing your Data Cooperation Canvas (DS4SSCC): Developing Multi-Stakeholder Data Cooperation {#completing-dcc}
    
    ??? workshop_deployment "Workshop 4.5: Completing your Data Cooperation Canvas (DS4SSCC): Developing Multi-Stakeholder Data Cooperation"

        [Download workshop as PDF](#){ .md-button .md-button--primary }



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
