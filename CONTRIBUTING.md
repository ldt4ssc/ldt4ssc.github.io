# Contributing

How to post pilot updates, take part in Discussions and add to the LDT4SSC Knowledge Base.

| I want to… | Where |
|---|---|
| Post an update about my pilot | [Pilot updates](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/pilot-updates), or a file in my pilot's repository |
| Share how my pilot tackled a common challenge, or ask how others did | [Peer exchange](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/peer-exchange) |
| Ask a question | [Q&A](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/q-a) |
| Suggest a resource, organisation or vocabulary value | [Knowledge Base suggestions](https://github.com/ldt4ssc/ldt4ssc.github.io/discussions/categories/knowledge-base-suggestions) |
| Report a problem on a Hub page | an [issue](https://github.com/ldt4ssc/ldt4ssc.github.io/issues) |

## Pilot updates

### Through the form

1. Ask the LDT4SSC team to register your GitHub username for your pilot. Only posts from registered members are published.
2. In *Pilot updates*, start a new discussion. Write the title, then fill in the form: pilot, type, work strand, the update itself (you can drag images in) and authors.
3. Your update appears on the Hub within 6 hours. Replies to your discussion show as comments under it.

To change your update, edit the discussion. To withdraw it, delete the discussion.

### As a file in your repository

If your pilot has a repository set up from the pilot repository template, add a Markdown file to its `updates/` folder:

- **File name:** `YYYY-MM-DD-short-title.md`.
- **Front matter:** follows the [update format](docs/assets/update-v1.schema.json). The template's check tells you if something is missing.
- **Discussion:** the aggregator opens a discussion for each update, so it can be commented on like any other.

### Writing a good update

- **Title:** say what happened, for example *First air-quality sensors live in Murcia*.
- **Type:** pick the one that fits best:
  - *milestone*: a step reached;
  - *lesson*: something learned;
  - *asset*: something produced;
  - *event*: something held or attended;
  - *general*: anything else.
- **Lessons and difficulties are as welcome as successes.** They are what other pilots learn most from.

## Peer exchange

- **Opening a topic:** use the form to describe the challenge and what you would like to hear from others.
- **Replying:** say which pilot you are from, what you did, what worked and what you would do differently, and link anything you used (tools, datasets, documents). If you would approach it another way, explain why.

## The Knowledge Base

Anyone can suggest additions in *Knowledge Base suggestions*. Others can upvote or comment, and curators add agreed suggestions. Project partners also edit the shared Knowledge Base sheets directly.

When describing something for the Knowledge Base:

- **Description:** one or two sentences saying what it is, in your own words. Don't copy text from the publisher's site.
- **Type:** pick the most specific type that fits.
- **Relations:** write each relation once, on the record it belongs to. For example, Orion-LD implements NGSI-LD, so *Implements* goes on the Orion-LD record. Use *Related to* only when nothing more precise fits.
- **Note for pilots:** say when and why a pilot would use it.
- **Language:** write in English, and say which language the resource itself is in.

For vocabularies:

- Every value needs a one-sentence definition.
- Labels must be unique within their vocabulary.
- A value records use is never deleted, only marked `deprecated`.
- Each vocabulary's owner decides when a proposed value is agreed.

## Licence of contributions

By contributing, you agree that your contributions are published under [CC BY-SA 4.0](LICENSE).