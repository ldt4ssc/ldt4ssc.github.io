---
title: Posting updates & contributing
search:
  exclude: true
---

# Posting updates & contributing

!!! warning "Draft for partner validation"
    This page is a **draft under review**, not listed in the site navigation.

Pilots publish their progress on this Hub, ask questions, compare approaches with other pilots,
and suggest additions to the Knowledge Base. All of it happens through
[GitHub Discussions](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions) on the Hub's
repository.

<div class="grid cards" markdown>

-   :material-bullhorn-outline:{ .lg .middle } __Post a pilot update__

    Progress, milestones, lessons, assets and events — published on your pilot's page and in
    the updates feed.

    [:octicons-arrow-right-24: How to post](#posting-a-pilot-update)

-   :material-account-group-outline:{ .lg .middle } __Ask and compare__

    Questions on building LDTs, and shared challenges where each pilot brings its own
    experience.

    [:octicons-arrow-right-24: Q&A and peer exchange](#asking-and-comparing)

-   :material-lightbulb-on-outline:{ .lg .middle } __Suggest to the Knowledge Base__

    Propose a resource, an organisation, or a value for one of the lists.

    [:octicons-arrow-right-24: Suggestions](#suggesting-to-the-knowledge-base)

-   :material-package-variant-closed:{ .lg .middle } __Share an asset or service__

    Components, configurations and deployment recipes other communities can reuse.

    [:octicons-arrow-right-24: Assets & Services Repository](#sharing-assets-and-services)

</div>

---

## Posting a pilot update

There are two routes. They end up in the same place, so use whichever suits how your pilot
works.

=== "Through the form"

    **No repository needed.** Open the
    [Pilot updates](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/pilot-updates)
    category and start a new discussion. A form guides you through the fields.

    !!! pilot "Register your GitHub usernames first"
        Everyone who posts needs a **GitHub account**, and their username must be registered for
        your pilot by the LDT4SSC team. **Only posts from registered members are published.**

        Send the usernames of everyone who will post to the LDT4SSC team before you start.

    **What the form asks for**

    | Field | |
    |---|---|
    | **Title** | 5–200 characters, written above the form |
    | **Pilot** | your pilot, from the list |
    | **Type of update** | General · Milestone · Lesson · Asset · Event |
    | **Work strand** | WS1, WS2 or WS3 |
    | **Update** | the text itself — formatted, and you can drag images straight in |
    | **Authors** | one per line, as `Name, Organisation` |
    | Date | optional; defaults to the day you post |
    | Tags | optional; lowercase, comma-separated |
    | Related links | optional; repositories, documents or datasets, one per line |
    | Event name, location, link | for events only |

    ??? abstract "Which type to choose"

        - **General** — news.
        - **Milestone** — a step reached.
        - **Lesson** — something learned.
        - **Asset** — something you produced: data, code, a document.
        - **Event** — something you held or attended.

    **To change an update**, edit the discussion. **To withdraw it**, delete the discussion.

=== "From your own repository"

    If your pilot works from the **pilot repository template**, write updates as Markdown files
    alongside your code, on **GitHub or GitLab**.

    **Where the file goes**

    - in the `updates/` folder;
    - named `YYYY-MM-DD-short-title.md` — the date, then lowercase words separated by hyphens.

    **What goes in the front matter**

    Follow [`update-v1.schema.json`](../assets/update-v1.schema.json). Required:

    | Field | Value |
    |---|---|
    | `schema_version` | `1` |
    | `type` | `general`, `milestone`, `lesson`, `asset` or `event` |
    | `date` | `YYYY-MM-DD` |
    | `title` | 5–200 characters |
    | `work_strand` | `WS1`, `WS2` or `WS3` |
    | `authors` | each with `name` and `organisation` |

    Optional: `tags`, `related_assets`, and `related_event` for events.

    ??? abstract "Example"

        ```markdown
        ---
        schema_version: 1
        type: milestone
        date: 2026-10-21
        title: First cross-border data exchange completed
        work_strand: WS1
        authors:
          - name: Maria Rossi
            organisation: City of Turin
          - name: Jan de Vries
            organisation: TNO
        tags:
          - data-spaces
          - interoperability
        ---

        Our two context brokers exchanged their first entities through the data space
        connector this week…
        ```

    **The template's check** — the Hub's `validate-updates` workflow — runs on your commits and
    reports anything that does not match the schema, so you find problems before publication.

### What happens next

Whichever route you take:

1. **Updates are collected every 6 hours** by the Hub's aggregator.
2. They appear on **your pilot's page** under [Pilot Journey](../journey/index.md), in the
   [updates feed](../journey/feed.md), and in the [RSS feed](../feeds/all.xml).
3. **Every update has a discussion** in the Pilot updates category. Replies there appear as
   **comments under the update** on the Hub.

Commenting needs a GitHub account, but reading does not.

---

## Asking and comparing

Open to anyone with a GitHub account, not only pilots.

<div class="grid cards" markdown>

-   :material-help-circle-outline:{ .lg .middle } __Q&A__

    Questions on building Local Digital Twins, the LDT4SSC methodology, or the open calls. The
    form asks for a topic — technical, data governance and legal, methodology, open calls and
    administration, or other — an optional work strand, and what you are trying to do and have
    already tried.

    [:octicons-arrow-right-24: Ask a question](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/q-a)

-   :material-swap-horizontal:{ .lg .middle } __Peer exchange__

    For a challenge several pilots are likely to share. You describe the topic and its context,
    say what you would like to hear from others — approaches, tools, pitfalls, examples from
    other cities — and each pilot replies with its own experience.

    [:octicons-arrow-right-24: Open a topic](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/peer-exchange)

</div>

---

## Suggesting to the Knowledge Base

The **Knowledge Base** is the linked catalogue behind this Hub, covering resources,
organisations, pilots and their updates, and Hub pages.

Anyone can suggest additions. Others upvote or comment, and curators add agreed suggestions.

You can suggest **a resource** (standard, tool, guideline, report), **an organisation**, or
**a value for one of the lists** (resource type, layer, building block). The form asks for a
main link, a description in your own words, why it matters for Local Digital Twins, the
publisher, and who it is for.

[:octicons-arrow-right-24: Suggest an addition](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/knowledge-base-suggestions){ .md-button .md-button--primary }

!!! info "To report an error in an existing entry"
    Open an issue on the repository rather than a suggestion.

---

## Sharing assets and services

Components you build are expected to return to the community — containers, configurations,
deployment recipes, data models and documentation that another community can pick up.

!!! warning "The Assets & Services Repository is under development"
    The repository is being built and is **not open for submissions yet**. The LDT4SSC team
    will announce it in
    [Announcements](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/announcements)
    once pilots can submit to it.

    In the meantime, **package as you go** rather than leaving it to the end of your pilot, and
    post an [Asset update](#posting-a-pilot-update) when you produce something — that way the
    work is visible, and migrating it into the repository later is straightforward.

**What to prepare**

- components packaged as **containers**, with Helm charts and API specifications where they
  apply;
- **configuration** samples for different contexts, so adopters are not reverse-engineering
  yours;
- the documentation that makes reuse possible — data requirements, deployment procedure,
  governance arrangements, and for AI services a model card;
- an **open licence**.

Some outputs have destinations of their own already: **data models** go to
[Smart Data Models](https://github.com/smart-data-models), and **services** to the
[EU LDT Marketplace](https://interoperable-europe.ec.europa.eu/collection/ldttoolbox/solution/eu-ldt-marketplace).

[:octicons-arrow-right-24: Where each kind of output goes](implementation.md#sharing-back)

---

## All discussion categories

| Category | For |
|---|---|
| [Pilot updates](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/pilot-updates) | Pilots posting progress, milestones, lessons, assets and events |
| [Peer exchange](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/peer-exchange) | A challenge several pilots share, with each bringing its experience |
| [Q&A](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/q-a) | Questions on building LDTs, the methodology, the open calls |
| [Knowledge Base suggestions](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/knowledge-base-suggestions) | Proposing a resource, organisation or vocabulary value |
| [Announcements](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/announcements) | Open calls, events and releases from the LDT4SSC team |
| [Polls](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/polls) | Quick consultations |

!!! pilot "Documenting on the Hub is a requirement"
    Keeping your pilot's documentation up to date is binding — **Rq23** in WS1, **Rq31** in WS2
    and WS3. Posting updates is how that requirement is met in practice.

    [:octicons-arrow-right-24: All pilot obligations](obligations.md)
