---
title: Pilot Guidance
search:
  exclude: true
---

# Pilot Guidance

!!! warning "Draft for partner validation"
    This page is a **draft under review**, not listed in the site navigation. It proposes a
    restructure of the Pilot Guidance section.

The open calls are closed and the pilots are building. This section carries everything a pilot
needs from that point on — what to build, how to build it so it connects, and what has to be
delivered — alongside an archive of what the calls originally asked for.

<div class="grid cards" markdown>

-   :material-hammer-wrench:{ .lg .middle } __Implementation guidance__

    What you are building, the reference architectures per work strand, and how the
    methodology, technical resources and Blueprint fit together.

    [:octicons-arrow-right-24: Implementation guidance](implementation.md)

-   :material-format-list-numbered:{ .lg .middle } __Workflows__

    Three worked recipes — interconnect existing LDTs, deploy a new one, build an AI service —
    step by step, naming the tools at each stage.

    [:octicons-arrow-right-24: Workflows](workflows.md)

-   :material-clipboard-check-outline:{ .lg .middle } __Pilot obligations__

    What must be built, assessed, documented and published, with the Rq and Rc codes and which
    strands each applies to.

    [:octicons-arrow-right-24: Obligations](obligations.md)

-   :material-bullhorn-outline:{ .lg .middle } __Posting updates & contributing__

    How to publish your pilot's progress, ask questions, compare approaches, and suggest
    additions to the Knowledge Base.

    [:octicons-arrow-right-24: Contributing](contributing.md)

-   :material-archive-outline:{ .lg .middle } __Open calls (archive)__

    Consortium conditions, financial rules, timelines and the Call for Pilots Manuals, kept as
    a record now the calls have closed.

    [:octicons-arrow-right-24: Archive](open-calls.md)

</div>

---

## Start from where you are

=== "I am building"

    Start with the **[implementation guidance](implementation.md)** to place yourself — which
    LDT level you are working at, which reference architecture applies, and how the
    methodology, resources and Blueprint connect.

    Then follow the **[workflow](workflows.md)** for your work strand:

    | Your situation | Workflow |
    |---|---|
    | Existing twins that need to talk to each other | [WS1 · Interconnect existing LDTs](workflows.md#ws1-interconnect-existing-ldts) |
    | A twin that does not exist yet | [WS2 · Deploy a new LDT](workflows.md#ws2-deploy-a-new-ldt) |
    | A working twin that should predict, explain or advise | [WS3 · Build an AI-based service](workflows.md#ws3-build-an-ai-based-service) |

    Keep the **[obligations](obligations.md)** page open alongside — several steps carry
    binding requirements.

    As you go, **[post updates](contributing.md#posting-a-pilot-update)** on what you build and
    learn. They appear on your pilot's page and in the updates feed.

=== "I need to check an obligation"

    The **[obligations](obligations.md)** page groups requirements by theme — build,
    interoperate, follow the methodology, engage, share back, sustain — with the Rq/Rc codes
    and a column per work strand.

    Codes differ between strands, so read your own column. For binding wording, go to the
    [Call for Pilots Manual](open-calls.md#call-for-pilots-manuals).

    The two deadlines most often missed:

    - the **ISAQ** in months 1–2 *and* again in the second reporting period — a final score
      above three is a **condition for payment**;
    - **packaging and publishing** assets, which is far cheaper done continuously than at the
      end.

=== "I am looking for the call requirements"

    The calls are closed, but the full reference is archived:
    **[open calls](open-calls.md)** for consortium conditions, financial rules and timelines,
    and the per-strand cheat sheets for the detailed breakdowns —
    [WS1](ws1.md) · [WS2](ws2.md) · [WS3](ws3.md).

---

## The three work strands

Each strand targets a different level of the LDT stack. They stack on one another — a WS3
service still needs the Core a WS2 pilot builds.

!!! abstract "WS1 · Technical interconnection of LDTs"
    **Linking and scaling digital twins already in place.**
    Works at the <span class="level-dot individual">Base and Core levels</span>: exposing what
    exists through standard interfaces and connecting it to other twins.

    [Architecture](implementation.md#ws1-technical-interconnection) ·
    [Workflow](workflows.md#ws1-interconnect-existing-ldts) ·
    [Call requirements](ws1.md)

!!! abstract "WS2 · Creation of LDTs based on common needs"
    **Addressing shared urban or regional challenges.**
    Builds the <span class="level-dot ecosystem">Core</span>: shared data acquisition, context
    management and analytics, specified once and instantiated locally.

    [Architecture](implementation.md#ws2-ldt-deployment) ·
    [Workflow](workflows.md#ws2-deploy-a-new-ldt) ·
    [Call requirements](ws2.md)

!!! abstract "WS3 · Advanced AI-based capabilities"
    **Integrating AI-driven services into existing LDTs.**
    Works at the <span class="level-dot assets">Surface</span>: AI services, simulation and
    immersive interfaces consuming an existing LDT and publishing results back into it.

    [Architecture](implementation.md#ws3-ai-based-services) ·
    [Workflow](workflows.md#ws3-build-an-ai-based-service) ·
    [Call requirements](ws3.md)

---

## Related sections

<div class="grid cards" markdown>

-   :material-toolbox-outline:{ .lg .middle } __Resources__

    The technical resource library, the LDT4SSC Methodology and its workshops, impact
    assessment, legal and AI guidance.

    [:octicons-arrow-right-24: Resources](../resources_content/index.md)

-   :material-ruler-square-compass:{ .lg .middle } __Interoperability Blueprint__

    Building blocks, workflows and reference architectures — co-created with pilots and under
    active development.

    [:octicons-arrow-right-24: Blueprint](../../blueprint/)

-   :material-compass-outline:{ .lg .middle } __Strategy & Sustainability__

    The conditions these obligations are designed to create, and 18 capabilities mapped against
    the same requirement codes.

    [:octicons-arrow-right-24: Strategy](../strategy/index.md)

-   :material-flag-outline:{ .lg .middle } __Pilot Journey__

    What the pilots are building, the obstacles they hit, and the assets they publish.

    [:octicons-arrow-right-24: Pilot Journey](../journey/index.md)

</div>
