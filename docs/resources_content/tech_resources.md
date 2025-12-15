# Technical Resources
These technical resources offer pilots and community stakeholders a curated overview of the standards, tools, frameworks, and implementations that permeate interoperable and scalable Local Digital Twin deployments in the LDT4SSC project. Drawing on the Technical Landscape Report, we provide a resource library that guides users through resources for LDT ecosystems - from interoperability standards and data space protocols to context brokers, discovery services, and AI toolkits - helping pilots and applicants make informed technical choices as they design their interconnection (WS1), deploy and expand their digital twins (WS2), or develop services for them (WS3). It serves as a practical entry point for navigating an incremental reference of assets, aligned with EU digital and green transformation goals.

## Technical Landscape
The project’s technical landscape is built on a foundation of open standards that ensure Local Digital Twins (LDTs) can easily connect, understand each other’s data, and operate across cities and communities. At its foundation is a strong commitment to interoperability by design, aligned with European frameworks such as the European Interoperability Framework (EIF), Minimal Interoperability Mechanisms (MIMs Plus), and the EU’s emerging regulatory environment for data, AI, and digital services. This landscape acknowledges the reality that communities operate diverse legacy systems - data platforms, dashboards, GIS environments, BIM/CIM models - and offers clear guidance on how they can evolve into connected, sovereign, and sustainable digital infrastructures.

Complementing other European initiatives - including the DS4SSCC project, the EU LDT Toolbox, SIMPL Smart Middleware, and Gaia-X trust frameworks - the project provides pilots with a harmonised set of standards, protocols, and tools that enable seamless data sharing across sectors and borders. The initiatives outlined in the technical landscape aim at progressively integrating local data platforms towards interoperability, facilitating the deployment of data spaces through trust frameworks, discovery services, and usage-controlled data exchange. These data spaces can then interconnect through shared connectors to form a European-wide federation. This is the foundation upon which pilots can interconnect existing LDTs (WS1), develop and expand LDTs (WS2), and integrate advanced AI-driven capabilities (WS3).

At the operational level, the technical landscape points pilots to concrete, open technologies - such as NGSI-LD context brokers, DCAT/DCAT-AP metadata catalogs, ODRL for usage policies, and standardized APIs - to ensure that LDT services are discoverable, reusable, and portable across cities. Combined with AI and simulation technologies supported through Testing and Experimentation Facilities (TEFs), this ecosystem enables cities to move from isolated platforms to federated, trustworthy, and citizen-centric digital twins. Ultimately, the landscape envisions collaboration, innovation, and scaling for communities towards digital services that advance Europe’s green and digital transitions.

### The Technical Landscape Report
The Technical Landscape Report focuses on establishing the technical foundations necessary to support pilot projects within the Local Digital Twins for Smart and Sustainable Communities’ (LDT4SSC) open calls.

!!! info "The Technical Landscape Report"
    [Download report as PDF](#){ .md-button .md-button--primary }

## Definition of a Local Digital Twin (LDT)
[ INSERT CONSOLIDATED DEFINITION ? ]

## Example implementations

??? example "Perugia (IT): an interoperable urban platform"

    The city of Perugia, in Italy, has adopted some of the resources described in this document to make their own data structure interoperable. The harmonisation of the data was conducted using the FIWARE stack, more specifically a solution called WiseTown. The project integrated the city’s software infrastructure, managing large amounts of data from different sources, such as geographical information systems, satellite images, IoT sensors, etc. The use of Smart Data Models allowed for semantic interoperability, while the use of a context broker allowed for the integration of the orchestration onto the NGSI-LD standards. The result was a system compliant with the European standards, that transformed the city’s digital infrastructure enabling a participatory and integrated approach to facilitate decision-making.

    In addition to the Smart Data Models, WiseTown used an NGSI-LD-compliant context broker, Orion-LD, chosen as the messaging and context information manager. For security infrastructure, the solution was FIWARE’s Keyrock. Used for a wide range of IoT Agents, the FIWARE IDAS solution was also adopted. Figure 8 provides a high-level overview of the adopted architecture, while Figure 7 shows a unifying decision-making dashboard that resulted from this collaboration. 

    The decision to rely on FIWARE resources and NGSI-LD standard allowed for the integration of heterogeneous data (GIS, IoT, registers, third-party applications), as well as the implementation of a standardised and documented API. It created an interoperable platform aligned with European recommendations, promoting reuse and scalability. Several use-cases have been deployed, including: mobility and parking (real-time monitoring of traffic and parking space availability); environment and quality of life (monitoring of air pollution levels, noise pollution and public lighting); green space management (data monitoring to improve planning and maintenance); energy optimisation (management scenarios for public lighting or the integration of renewable energies); citizen participation (mobile applications and crowd-planning tools enabling residents to report problems, monitor their resolution and contribute to development projects).

    What makes Perugia's experience particularly remarkable is its ability, as a medium-sized city, to mobilise interoperable infrastructure and implement inter-municipal data governance. The use of open standards and the implementation of an operational digital twin position Perugia as a model for medium-sized cities in Europe. It demonstrates that interoperability ‘by design’, combined with shared data governance, can be a powerful impulse for innovation and transformation for local authorities beyond the major cities alone.

    ??? info "To know more..."

        A video presentation of the project: https://www.youtube.com/watch?v=ZtXkcPQSGiU 
        
        Feedback from the Fiware ecosystem: https://www.fiware.org/2021/11/15/perugias-digital-transition-to-smart-city-powered-by-fiware-technology/ 


??? example "Zurich (CH): a dynamic 3D twin of the built environment"

    The city of Zurich, in Switzerland, faces rapid population growth, expecting to reach 520 thousand residents by 2040. With the rise in population, it recognised the need for innovative city planning, incorporating recent technological tools in its existing planning support systems. To go beyond static planning, with limited participation and capacity for adaptations, the city launched the Digital Twin of Zurich. It consists of a dynamic 3D spatial model to support evidence-based decision making. The twin integrates real-time data, 3D models, and analytical tools to enable the simulation of urban phenomena, such as climate impacts, densification, and mobility.

    The twin evolved from Zurich’s 3D City Model, initially developed in 2011 and managed by the city’s GIS department. The model encompasses detailed topography, buildings, bridges, vegetation, in various levels of detail. These datasets formed the base for further data integration, for instance linking cadastral, environmental, and planning information under a governance framework aligned with Switzerland’s Federal Act on Geoinformation (GeoIG). The local government also made the data publicly available in the city’s Geoportal, and an interactive visualisation of the twin’s components is done by the means of Zurich Virtuell.


    Zurich’s digital twin has enabled integration of several planning domains. It supports the Municipal Development Plan, showing the current building development, the allowed development, and possible scenarios; urban climate analysis, modelling airflow and heat mitigation strategies; or even architectural competitions, where Augmented Reality (AR) and web-based tools are planned to allow juries to assess digital submissions interactively. Moreover, participatory initiatives were also put in place, such as “Minecraft Zurich”, which allows citizens to design and submit their own ideas, lowering barriers to political participation.


    Zurich’s example exemplifies a mature, multi-purpose data platform for data-driven urban governance. It combines spatial accuracy and open access principles, enhancing the city’s ability to simulate, visualise, and discuss planning scenarios, with the collaboration of the population. Further developments envisioned by the city include bettering their interconnected 3D data, with faster updating for instance; systematic recording of urban furniture; better interconnection of BIM and GIS world; building a 3D utility cadaster, among others. The Zurich example demonstrates how a data platform can evolve towards a fully-fledged digital twin, with an operational decision-support system, allowing citizen participation to foster sustainable urban growth

??? example "Differdange (LU): clean energy and mobility"

    The city of Differdange, in Luxembourg, is well-known for its industrial heritage and green spaces, and actively pursues net-zero carbon emissions through innovative renewable energy initiatives. In the fields of energy and mobility, LIST in collaboration with the city’s experts in the context of the CitCom.ai project have developed an LDT aiming at integrating electric vehicle (EV) infrastructure and renewable energy generation. More specifically, the LDT leverages information on charging points, buildings, and solar panels. Understanding the balance between renewable energy production and energy demand in charging stations is essential for the city’s sustainability goals. The implementation includes data collection and telemetry emulators, spatio-temporal and graph databases, DT cloud solutions, and interactive maps and dashboards. Several analytical models were produced from the integrated data, and are used to both produce synthetic telemetry, and predict telemetry depending on the parameters in a simulation. 

    The current effort of the Differdange LDT is in the direction of adopting interoperable, open-source solutions, in-line with the resources presented in this document. This is intended to increase their adherence to the MIMs Plus framework. For that to happen, the team is currently producing a gap analysis, to assess how far the current implementation is from an interoperable one, possible to be connected to a data space, to be further integrated with other solutions and assets. The first step forward is the adoption of a NGSI-LD-compliant context broker, particularly from the ones cited in this document (Stellio, Orion-LD, Scorpio). Secondly, to make their data interoperable, they plan to adopt domain-specific ontologies from the Smart Data Models framework. More specifically, they are looking into the Buildings data model from the Smart Cities framework, as well as the Photovoltaic Device and the Photovoltaic Measurement from the Smart Energy one. In their case, the effort is not to have a virtualisation layer to transform the data, but to actually overhaul the data structure.

    The example implementation of Differdange shows a working LDT that currently caters to the city and its partners’ sustainability efforts. It already provides an impressive level of insights on current and future trends of sustainable energy production and EV charging demands. It nonetheless recognises the importance of interoperability, and the team is actively pursuing a stricter compliance to standards and frameworks that allows for further interconnection. This could help not only the city’s officials and their citizens in the delivery of a more accurate service, but other initiatives throughout Europe that might undergo similar kinds of societal challenges and could leverage from the collective learning this experience has brought about.

??? example "Antibes (FR): an indoor descriptive Local Digital Twin with 3D implementation"

    In enclosed spaces, indoor air quality is greatly affected by carbon dioxide (CO₂) levels, which play an important role in the comfort and health of occupants. Excessively high CO₂ concentrations can cause symptoms such as fatigue, headaches and difficulty concentrating, as well as unpleasant odours. In addition, local or national regulations may require an assessment of ventilation systems and the implementation of pollutant control measures by an accredited body or self-assessment.. Continuous measurement of CO2 concentration is recommended in support of this decree in order to reduce health risks and increase occupant comfort.

    To reduce CO2 levels, temperature, relative humidity, and levels of volatile organic compounds (VOCs), CO, allergens and fungi in enclosed spaces, the most effective solution is natural ventilation by opening windows and doors to create a draught. Concerned about the well-being of its teachers and pupils, Antibes Town Hall (Logistics and Education Departments) and EGM have therefore equipped the teaching and living spaces at the Jean Moulin School with sensors that continuously measure CO2 levels, temperature and relative humidity.

    A total of 30 Nexelec Carbon sensors were deployed in 14 primary classrooms, 6 nursery classrooms, 1 activity room, 2 dormitories and 1 large dining hall. They are connected to the Orange LoRaWAN network, and the data collected is then centralised on an EGM TWIN·PICKS platform (FIWARE architecture with Stelio context broker)  where, among other things, the school air confinement index (ICONE) is calculated to assess the degree of air confinement in a room. This is based on continuous CO2 measurement over a school week at 10-minute intervals and calculated exclusively for periods when the room is occupied.

    The city of Antibes, which has a 3D representation of its territory, wanted to feed the ICONE index information into this representation, thereby enabling better visualisation of the data and creating a digital twin of the territory. To do this, the temporal data is retrieved directly from the NGSI-LD API by the 3D visualisation tools Terra Explorer and Césium. 

## Reference architecture
[ INSERT ARCHITECTURE ? ]

## Technical resource database

The technical resource database is categorised by layer (according to the LDT-Toolbox), by category (whether standard, protocol, framework, or tool/implementation), and by scope (whether relevant for data spaces, AI for smart cities, interoperability, or LDTs). In the visualisation below, you may filter by each categorisation, as well as by the relevant **MIMs Plus**. Use the Search bar to look for a specific resource, and suggest a resource using the button below.

<div style="text-align: center; margin-bottom: 1.5rem;">
  <a href="#suggest-a-resource" class="suggest-resource-button">Suggest a Resource</a>
</div>

<div id="resource-filters" class="md-typeset">
  <!-- Top row: Layer and MIMs -->
  <div class="filter-row-badges">
    <div class="filter-section">
      <label>Layer</label>
      <div id="filter-category" class="layer-filter-checkboxes">
        <!-- Layer checkboxes will be filled by JS -->
      </div>
    </div>

    <div class="filter-section">
      <label>MIMs Plus</label>
      <div id="filter-mims" class="mim-filter-checkboxes">
        <!-- MIM checkboxes will be filled by JS -->
      </div>
    </div>
  </div>

  <!-- Middle row: Dropdowns -->
  <div class="filter-row-dropdowns">
    <div class="filter-section">
      <label for="filter-resource-category">Category</label>
      <select id="filter-resource-category">
        <option value="">All Categories</option>
        <!-- Categories will be filled by JS -->
      </select>
    </div>

    <div class="filter-section">
      <label for="filter-scope">Scope</label>
      <select id="filter-scope">
        <option value="">All Scopes</option>
        <!-- Scopes will be filled by JS -->
      </select>
    </div>

    <div class="filter-section">
      <label for="sort-by">Sort By</label>
      <select id="sort-by">
        <option value="title">Title (A–Z)</option>
        <option value="mim">MIMs Plus</option>
        <option value="thematic-area">Layer</option>
      </select>
    </div>
  </div>

  <!-- Bottom row: Search -->
  <div class="filter-row-search">
    <div class="filter-section-search">
      <label for="filter-search">Search</label>
      <input type="text" id="filter-search" placeholder="Title, tags, description...">
    </div>
  </div>

  <div class="filter-summary">
    <div id="results-count"></div>
    <button id="clear-filters" type="button">Clear filters</button>
  </div>
</div>

<div id="resource-cards">
  <!-- Cards will be injected by JS -->
  <p style="text-align: center; color: #616161;">Loading resources...</p>
</div>

## Suggest a Resource

Know of a technical resource that should be included in our database? Share it with us using the form below!

<div class="form-container">
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfTRwPEhr_SjZekvfrwbSHNKugVfC6-HQSJGPL8FJIZsVWamA/viewform?embedded=true" width="640" height="721" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
<script src="/js/resources_poc.js"></script>
