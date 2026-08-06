# Static content updates

Hub pages can load YAML-in-Markdown from [`CBIIT/CCDI_Hub_Static_Contents`](https://github.com/CBIIT/CCDI_Hub_Static_Contents) via `REACT_APP_STATIC_CONTENT_URL`.

## `faqData.md` (CCDI FAQs)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/faqData.md?ts=<timestamp>` |
| Hub route | `/faqs` (`/faq` redirects to `/faqs`) |
| Format | YAML front matter only (markdown body ignored) |

### Fields

| Key | Notes |
|-----|--------|
| `title` | Banner title (e.g. `CCDI FAQs`) |
| `headerImage` | Absolute URL for the hero banner background |
| `categories[]` | `id`, `name` — left-index order |
| `faqs[]` | `id`, `category` (must match a category `id`), `question`, `answer` (markdown) |

### Example

```yaml
---
title: CCDI FAQs
headerImage: https://example.com/faq-header.png
categories:
  - id: data-exploration
    name: Data Exploration and Data Access
  - id: mci
    name: Molecular Characterization Initiative (MCI)
  - id: support
    name: Support
faqs:
  - id: controlled-access
    category: data-exploration
    question: How can I apply for controlled data access to a CCDI-indexed study?
    answer: |
      Markdown answer with [links](https://example.com).
---
```

### Failure behavior

If the file is missing, YAML is invalid, or the request fails, the FAQ page stays empty until valid remote MD loads.

### Seed fixture

Copy-starting sample for tests and for seeding the static-contents repo:

- `tests/fixtures/about/faqMarkdownSamples.js`

### Global Search

Frontend search renders GraphQL `about_page` hits only. Index FAQ content in the search backend with `page: '/faqs'`.
