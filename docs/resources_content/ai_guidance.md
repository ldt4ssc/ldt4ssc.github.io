# Guidance on AI

!!! tip "On this page"
    - [Regulatory Compliance](#regulatory-compliance) — AI Act and its implementation in LDT projects
    - [Environmental Impact of AI](#environmental-impact-of-ai) — Sustainable AI practices and assessment frameworks
    - [Ethics of AI](#ethics-of-ai) — LDT4SSC ethics framework and key ethical considerations

This page provides non-technical guidance specific to WS3 pilots deploying LDTs with AI-based capabilities. It complements the general regulatory compliance resources.


---

## Regulatory Compliance

*Relevant WS3 Requirements: Rq32, Rq5, Rq6, Rq20, Rq21*

### AI Act and its implementation in the context of LDT projects

#### Context

Since 2020, the European Union has sought to regulate the marketing and use of AI systems. On 14 June 2024 it adopted a Regulation on Artificial Intelligence (the **"AI Act"**), the provisions of which apply directly in the Member States and have been phased in since February 2025.

The development and use of LDTs, where they qualify as **"artificial intelligence systems"** within the meaning of this Regulation, are fully subject to these rules.

#### Scope

The AI Act applies to **"AI systems"** and **"general-purpose AI models"**. Whilst the concept of "general-purpose AI models" refers to generative AI (e.g. Mistral's Le Chat, OpenAI's ChatGPT), the broader concept of "AI system" can cover some Digital Twin projects. An AI system refers to any:

> *"machine-based system that is designed to operate with varying levels of autonomy and that may exhibit adaptiveness after deployment, and that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments."*

The AI Act applies only where an AI system is:

- **"placed on the market"** — intended for distribution or use on the Union market in the course of a commercial activity, whether for a fee or free of charge; or
- **"put into service"** — supplied for first use for their own purposes or for the benefit of another person.

It applies to businesses, organisations, and public authorities alike - central government bodies, decentralised authorities, local authorities, and public institutions.

#### Approach

The AI Act regulates AI systems based on the risks they pose to individuals' rights and freedoms across four levels:

!!! danger "Prohibited AI practices (Article 5)"
    Several AI practices are outright prohibited, such as manipulation and deception harmful to individuals, social scoring, and the assessment or prediction of the risk of criminal offences. Although unlikely in LDT contexts, pilots must ensure their project does not pursue any of these prohibited purposes.

!!! warning "High-risk AI systems (Chapter 3)"
    AI systems classified as "high-risk" — likely to pose a risk to health, safety, or fundamental rights — are subject to strict regulation. LDTs may fall within this category in many situations, for example when they map critical infrastructure (transport, energy), are used in the administration of democratic processes, or are deployed in law enforcement contexts.

!!! info "The Digital Omnibus on AI (November 2025 proposal)"
    The European Commission has proposed amendments to the AI Act. Subject to final adoption, key points are:

    - If the project is a **high-risk AI system**, obligations applicable to such systems would be deferred until compliance tools and standards become available.
    - If the project lead or a consortium member is an **SME**, it would benefit from reduced technical documentation requirements and other advantages.
    - Projects could more easily make use of **regulatory sandboxes** — test environments for technologies supervised by public authorities.

#### Recommendations

To comply with **Requirement 21** ("All AI used in public services must comply with the AI Act, particularly if it influences decisions, priorities, resource allocations, or public policies. Pilots must take into account the relevant amendments of the Digital Omnibus on AI, should they come into force"), pilots are advised to:

- Inform and familiarise staff and/or agents involved in the development and use of the LDT with the AI Act.
- Determine whether the LDT project is likely to be classified as an AI System and define the applicable requirements.
- Map the roles of consortium members in the creation of the LDT to understand their rights and obligations within the value chain.
- Contact the relevant regulatory authority in the event of any doubt regarding the application and implementation of the AI Act.

### Associated Resources

| Author / Title | Description | Type |
|---|---|---|
| European Commission — [AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) | General presentation of the AI Act (risk-based approach, compliance and enforcement, simplification proposal). Use to explore the AI Act in depth. | Standard / Educational resource |
| European Commission — [Questions & Answers on the AI Act](https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act) | Detailed Q&A covering the AI Act's goals, governance, enforcement, provisions for high-risk AI systems and general-purpose AI models, and measures to foster innovation. | Q&A |
| European Commission — [Guidelines on prohibited AI practices](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act) | Guidelines providing an overview of AI practices deemed unacceptable under the AI Act. Use to ensure pilots do not have a prohibited use of AI. | Guidelines |
| European Commission — [Guidelines on AI system definition](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application) | Explains the practical application of the legal concept of "AI system" as defined in the AI Act. Use to determine whether your software systems constitute AI systems. | Guidelines |
| European Commission — [AI Act Single Information Platform](https://ai-act-service-desk.ec.europa.eu/en) | Platform to help WS3 pilots determine whether they are subject to legal obligations and understand the steps needed to comply. | Platform |
| European Commission — [EU AI Act Compliance Checker](https://ai-act-service-desk.ec.europa.eu/en/eu-ai-act-compliance-checker) | A self-assessment tool to evaluate whether AI systems and general-purpose AI models meet the requirements of the AI Act. An ongoing project. | Self-assessment |
| Hub France IA — [A toolbox for managing risks of Artificial Intelligence systems](https://www.hub-franceia.fr/wp-content/uploads/2024/10/Hub-France-IA-A-toolbox-for-managing-risks-of-AI-systems.pdf) | Reflections and feedback from the Banking and Auditability Working Group on how risk management can be equipped to reduce the costs of AI Act compliance. | Toolbox / Guidelines |

---

## Environmental Impact of AI

*Relevant WS3 Requirements: Rq32, Rq5, Rq6, Rq8, Rq9, Rq20*

### AI for Sustainability and environmentally sustainable AI in LDTs

#### European regulatory and strategic context

WS3 pilots are set to develop AI-based services: predictive models, computer vision, optimisation algorithms, or generative AI. This integration takes place within a rapidly evolving European strategic and regulatory context addressing environmental sustainability.

The **2019 European Green Deal** positioned digital technologies, including AI, as enablers of the green transition. The Commission's **White Paper on AI (2020)** established the dual framing of AI and the environment:

- **AI for Sustainability** — AI as a tool to achieve environmental goals (underpinning many LDT use-cases)
- **Sustainable AI** — minimising AI's own environmental footprint

The **AI Act (2024)** includes environmental protection among its objectives (Article 1) and acknowledges AI's environmental potential (Recital 4). However, the evidence base remains limited: the European Parliament's AIDA committee study concluded no comprehensive cost-benefit assessment existed as of 2021, and flags rebound effects where efficiency gains are offset by increased usage. For digital twins specifically, generative scenario tools may increase compute intensity without proportional public value, and cloud-based inference at scale carries cumulative energy costs.

#### The environmental impact of AI

Since Strubell et al. (2019) quantified the substantial emissions from training large NLP models, scientific and institutional scrutiny has grown rapidly. The **IEA's 2025 report** estimates global data centre electricity consumption at 415 TWh in 2024 (1.5% of global consumption), growing 12% annually and projected to double to 945 TWh by 2030, with AI-related servers accounting for nearly half the increase.

This impact extends beyond energy consumption. The International Telecommunication Union's **ITU-T L.1801** recommendation standard (published February 2026 as ITU-T L.1801 / ETSI ES 204 135) codifies assessment across four lifecycle stages and five environmental impact categories through a **life cycle assessment (LCA)**:

| Lifecycle stage | Description |
|---|---|
| Hardware production | Manufacturing of computing hardware |
| Training and development | Compute for model training and experimentation |
| Operation and inference | Ongoing compute for deployed services |
| Decommissioning | End-of-life disposal of hardware |

Not all AI has an equal environmental footprint. The ITU-T L.1801 standard classifies AI into four types — expert systems, machine learning, deep learning, and generative AI — with generative AI rated "comparatively high" in energy, data, and hardware demands. For example, in an LDT, an optimisation algorithm has a fundamentally different footprint from using a large language model for scenario building.

### Associated Resources

| Author / Title | Description | Type |
|---|---|---|
| ITU-T / ETSI — [ITU-T L.1801 Environmental impact assessment of AI systems](https://l1801framework.netlify.app/) | The first international standard for assessing the environmental impact of AI systems across their full lifecycle (ITU-T L.1801 / ETSI ES 204 135, February 2026). Use to grasp the main concepts and dimensions of AI's environmental impact. | Recommendation Standard / Educational resource |
| European Parliament – AIDA / Öko-Institut e.V. — [The Role of AI in the European Green Deal](https://www.europarl.europa.eu/RegData/etudes/STUD/2021/662906/IPOL_STU(2021)662906_EN.pdf) | Commissioned study for the AIDA Committee analysing AI's environmental potential and risks, with recommendations for regulatory alignment with Green Deal objectives. Use to align your use-case with the European Green Deal (Rq6). | Study |
| Bundesverband Green.Software — [Green Software Landscape – AI](https://landscape.bundesverband-green-software.de/?group=measurement&view-mode=grid&license=oss&category=Artificial+Intelligence) | Overview of the green software ecosystem with concrete recommendations and measurement tools applicable at code, component, data aggregation, database, infrastructure, and AI algorithm levels. Use to identify software tools for measuring the energy consumption of AI services. | Toolbox |

---

## Ethics of AI

*Relevant WS3 Requirements: Rq32, Rq5, Rq20*

### LDT4SSC ethics framework

The LDT4SSC ethics framework requires pilots to follow an **"Ethics and Data Protection By Design"** approach:

- Applicants must complete and submit an Ethics and Data Protection Self-Assessment with their proposal.
- Assessments are reviewed by the **LDT4SSC Ethical Board** during evaluation.
- Selected pilots engage further with the Ethical Board at project start to discuss and mitigate ethical risks.

The framework draws on recognised ethical guidance (ALTAI, FRAIA, ISO/IEC standards), mandates compliance with applicable legislation (GDPR, AI Act), integrates ethics checkpoints throughout the call and implementation, and expects pilots to establish governance, oversight, and mitigation measures for issues such as data protection, bias, transparency, and fairness.

More information can be found in the [**Call for Pilot Manuals for WS3**](https://ldt4ssc.eu/documents/cpmws3.pdf).

### Key ethical considerations for AI in LDT projects

Ethics complements existing laws and regulations. The ethical approach is a best practice undertaken by pilots to assess the validity of an action in relation to the values and principles they have chosen to uphold throughout the entire project design process. This section identifies key issues related to LDT projects incorporating AI and provides corresponding recommendations.

#### Discriminatory bias and explainability

AI models in LDTs are only as fair as the data they are trained on. Historical data often reflects societal biases — such as underinvestment in certain neighbourhoods — which AI systems can inadvertently perpetuate.

**Stakeholder involvement** — Involving a diverse range of stakeholders (end-users, citizens, ethicists, and partners from other regions) in the design process helps identify blind spots and potential biases. 

**Transparency and explainability** — AI systems must be understandable and auditable by stakeholders, not just technical experts. Techniques such as eXplainable AI (XAI) can demystify complex models, allowing users to question and challenge algorithmic decisions. For example, a digital twin optimising public transport routes should provide clear explanations for why certain areas are prioritised or deprioritised.

#### End users' rights and free choice

LDTs that rely on personal or behavioural data must be designed to empower individuals:

- Users must be fully informed about how their data is collected, processed, and utilised.
- Users should retain control over their information.
- Mixed datasets must not result in sensitive data that could affect users or citizens.

Obtaining meaningful consent is a challenge where users interact with LDTs indirectly (e.g. through smart city sensors). Clear communication about the purpose of data processing and the rights of individuals — such as the ability to opt out or request data deletion — is fundamental.

Inclusion and accessibility are further concerns: systems must be accessible to all regardless of technical literacy or physical ability, which may involve providing multi-channel interfaces to ensure marginalised groups are not excluded.

#### Human oversight

AI systems in LDTs must be transparent, reliable, and subject to human oversight. While AI can process vast datasets and generate insights, critical decisions must remain under human control. This aligns with the **"Human-in-Command"** approach, where AI serves as a decision-support tool rather than an autonomous decision-maker.

A major risk is over-reliance on automation, which can lead to outcomes that lack contextual understanding or ethical nuance. The **"Human-in-the-Loop"** principle ensures that experts intervene at key stages, such as validating data inputs or correcting algorithmic biases.

#### Societal impact and risk-benefit assessment

The deployment of AI-powered LDTs must be assessed through the lens of societal impact — benefits should not be solely technical or economic but should also contribute to the common good.

**Cost-benefit analysis** — Comprehensive assessments should evaluate not only technical performance but also social equity, environmental sustainability, and legal compliance. See the [Cost-benefit analysis](../non_tech_resources/#cost-benefit-analysis) section for more information.

The need to balance innovation with ecological responsibility must also be taken into account. LDTs rely on vast computational resources, and their carbon footprint must be justified by tangible societal benefits. See [Environmental Impact of AI](#environmental-impact-of-ai) above.

### Associated Resources

| Author / Title | Description | Type |
|---|---|---|
| Estonian Government — **Algorithmic Bias Risk Management** [Guideline](https://www.volinik.ee/volinik-live-web-prd/s3fs-public/2025-12/algorithmic_bias_risk_management_gudieline.pdf), [Workbook](https://www.volinik.ee/en/information-materials/ai-bias-assessment-workbook) and [Methodology](https://www.volinik.ee/en/information-materials/algorithmic-bias-risk-management-methodology) | Algorithmic Bias Risk Management Tool (guideline, methodology, workbook) for the development and deployment of AI systems in the public sector. | Guideline / Workbook / Methodology |
| Ekitia — [Eki'Learning](https://ekilearning.com) | A learning environment to assess, improve and apply ethical practices in real-world data and AI initiatives, built in the context of the Destination Earth project. | E-learning |
| OECD — [Artificial Intelligence for Advancing Smart Cities](https://www.oecd.org/content/dam/oecd/en/about/programmes/cfe/the-oecd-programme-on-smart-cities-and-inclusive-growth/Issues-Note-AI-for-advancing-smart-cities.pdf) | Note supporting city governments in adopting AI for resilience and good governance. Provides a comprehensive view of enablers and conditions for AI development in smart communities, especially in Chapter 3. | Note |
| Datactivists, La Mednum, Fari, Waag — [ALGO-LIT project](https://algolit.eu/en/blog/how-to-explain-algorithms-and-train-people-to-do-so) | Project aimed at supporting society's digital transformation by identifying and developing the skills needed to understand and use algorithms, ensuring no citizens are left behind. | Project |
