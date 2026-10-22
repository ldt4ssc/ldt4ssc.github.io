# LDT4SSC Knowledge Hub

The LDT4SSC Knowledge Hub is the home where the Local Digital Twin ecosystem builds its principles of interoperability together. Its pilot projects, each bringing together two cities and a third partner, are where this ecosystem takes root.

It rests on two layers:

- **The Knowledge Base** describes everything the ecosystem works with (resources, organisations, pilots and their updates, the Hub's own pages) and how they relate.
- **The Knowledge Hub**, at [knowledgehub.ldt4ssc.eu](https://knowledgehub.ldt4ssc.eu), presents it to the people who need it. It is organised around what they need to do: prepare a proposal, run a pilot, find a tool, learn from others.

## The Knowledge Base

Its model has three parts:

| | What it is | Examples |
|---|---|---|
| **Entities** | The kinds of things described | resource, organisation, pilot, pilot update, Hub page, use case, demonstrator |
| **Fields** | What is said about them. Each field is a term from an established standard (Dublin Core, DCAT, ADMS, FOAF, SKOS), or an LDT4SSC term where none has one | title, publisher, licence, LDT layer |
| **Vocabularies** | The agreed values some fields take. Those with broader and narrower values are taxonomies | resource types, LDT layers, MIMs, Blueprint building blocks |

Each thing is described once, as a small Markdown record. Each record has an id that is also its web address, such as `https://knowledgehub.ldt4ssc.eu/id/resource/orion-ld`.

Records link to each other. For example:

- a resource links to its publisher and to the standards it implements;
- a pilot update links to its pilot;
- a Hub page links to the resources it presents.

That way the whole can be queried, and published as open linked data compatible with DCAT-AP and ADMS-AP.

The model is being agreed with the project partners. Once agreed, it and its records will live in `kb/`.

## Where things live

Each thing has one home, where it is edited:

| What | Edited in |
|---|---|
| The Hub's pages, resources, organisations, vocabularies | this repository (resources and vocabularies in shared sheets until the model is agreed) |
| Pilot updates | each pilot's own repository, or the *Pilot updates* form in this repository's Discussions |
| The LDT Interoperability Blueprint and its building blocks | [ldt4ssc/interoperability-blueprint](https://github.com/ldt4ssc/interoperability-blueprint) |

## Discussions

[Discussions](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions) are where pilots and the community exchange experience:

| Category | For |
|---|---|
| **Pilot updates** | progress, milestones, lessons, assets and events from the pilots |
| **Peer exchange** | a challenge several pilots share, with each pilot's experience and approach |
| **Q&A** | questions about building Local Digital Twins, the methodology or the open calls |
| **Knowledge Base suggestions** | resources, organisations or vocabulary values to add |
| **Announcements** | open calls, events and releases from the LDT4SSC team |
| **Polls** | quick consultations |

## Pilot updates

Pilots post updates in either of two ways:

- **as a Markdown file** in the `updates/` folder of their own repository on GitHub or GitLab, set up from the pilot repository template;
- **through the form** of the *Pilot updates* category, with a GitHub account registered for the pilot.

Every 6 hours, `scripts/aggregate_pilots.py` collects both. It publishes those that follow the [update format](docs/assets/update-v1.schema.json), and, for form posts, only those from registered members. Updates appear on the pilot's page, in the [updates feed](https://knowledgehub.ldt4ssc.eu/journey/feed/) and its RSS feed. Each one has a discussion, whose replies show as comments under the update.

## Repository layout

```
mkdocs.yml                      site navigation, theme and build hooks
requirements.txt                what the site build needs
docs/                           the Hub
  index.md, strategy/, communities_content/, guidance_content/,
  resources_content/, blueprint/, demo/
                                  pages written by the LDT4SSC team
  journey/                        the pilot journey
    index.md, feed.md               overview and updates feed pages
    pilots/                         one folder per pilot: its page, data and updates  (written by the aggregator)
    all_pilots.json,
    all_updates_index.json          lists of all pilots and updates                  (written by the aggregator)
  feeds/                          RSS feeds of pilot updates                         (written by the aggregator)
  assets/                         PDFs, images, the update format and its checker
  css/, js/                       styles and scripts: resource library, pilot pages, journey
  overrides/                      theme overrides and build hooks
scripts/aggregate_pilots.py     collects pilot data and updates
tools/                          one-off helpers (demo data)
.github/
  DISCUSSION_TEMPLATE/            the forms of the Discussions categories
  workflows/
    ci.yml                          builds and deploys the site on every change
    aggregate-pilots.yml            runs the aggregator every 6 hours and deploys
    validate-updates.yml            checks update files; pilot repositories call it
```

## Run it locally

```
pip install -r requirements.txt
mkdocs serve
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) to post a pilot update, take part in Discussions or suggest additions to the Knowledge Base. The Hub's pages are edited by the LDT4SSC team.

## Licences

- **Content:** [CC BY-SA 4.0](LICENSE).
- **Scripts:** [EUPL 1.2](LICENSE-CODE).

## Funding

LDT4SSC is a project funded by the Digital Europe Programme under grant agreement number 101226211. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Commission. Neither the European Union nor the European Commission can be held responsible for them.