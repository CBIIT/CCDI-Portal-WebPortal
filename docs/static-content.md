# Static content updates

Hub pages can load YAML-in-Markdown from [`CBIIT/CCDI_Hub_Static_Contents`](https://github.com/CBIIT/CCDI_Hub_Static_Contents) via `REACT_APP_STATIC_CONTENT_URL`.

## `faqData.md` (CCDI FAQs)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/faqData.md?ts=<timestamp>` |
| Hub route | `/faqs` (`/faq` redirects to `/faqs`) |
| Format | YAML front matter for title / header / categories; news-style `#` FAQ blocks |

### Fields

| Key | Source |
|-----|--------|
| `title` | YAML front matter |
| `headerImage` | YAML front matter (absolute URL) |
| `categories[]` | YAML front matter: `id`, `name` — left-index order |
| `question` | `#` heading |
| `answer` | Markdown body until the property table |
| `id` / `category` | Trailing `| Property | Value |` table (`category` must match a category `id`) |

### Example

```markdown
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
---

# How can I apply for controlled data access to a CCDI-indexed study?

Markdown answer with [links](https://example.com).

| Property | Value |
| --- | --- |
| id | controlled-access |
| category | data-exploration |
```

### Failure behavior

If the file is missing, YAML is invalid, or the request fails, the FAQ page stays empty until valid remote MD loads.

### Seed fixture

Copy-starting sample for tests and for seeding the static-contents repo:

- `tests/fixtures/about/faqMarkdownSamples.js`

## `aboutSearchContent.md` (Global Search — About tab)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/aboutSearchContent.md?ts=<timestamp>` |
| Used by | Hub Global Search About tab + autocomplete (`Fuse.js`) |
| Format | YAML front matter only (markdown body ignored) |

### Fields

| Key | Notes |
|-----|--------|
| `pages[]` | Search corpus rows |
| `pages[].page` | Hub route path (e.g. `/about`, `/`) |
| `pages[].title` | Card / autocomplete title |
| `pages[].content[]` | List of `{ paragraph }` searchable snippets |

### Example

```yaml
---
pages:
  - page: "/about"
    title: "About"
    content:
      - paragraph: "The Childhood Cancer Data Initiative (CCDI) Hub is an entry point for researchers."
      - paragraph: "Explore Hub resources and tools."
---
```

### Failure behavior

If the file is missing, YAML is invalid, or the request fails, About search returns no hits until valid remote MD loads (no bundled JS fallback).

### Seed fixture

- `tests/fixtures/about/aboutSearchMarkdownSamples.js`
- `tests/fixtures/about/aboutSearchContent.json` (full corpus for Fuse unit tests)

About Global Search is frontend-only (Fuse.js). Mirror FAQ copy into `src/content/aboutSearchContent.yaml` and `aboutSearchContent.json` with `page: '/faqs'` so FAQ terms return the FAQ page. Keep YAML and JSON in sync after FAQ content changes.

## `newsData.md` (News + Latest Updates)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/newsData.md?ts=<timestamp>` |
| Hub routes | `/news`; homepage Latest Updates |
| Format | Markdown blocks separated by `---` / `#` headings (not YAML front matter) |

Each news item:

```markdown
# {title}
### {date} | {type}

| | |
| --- | --- |
| {highlight markdown} | <img src="{imageUrl}" width="220" alt="{imgKey}"> |

| Property | Value |
| --- | --- |
| id | {id} |
| slug | {slug}
| latestUpdate | true
| latestUpdateOrder | 1
```

| Field | Source |
|-------|--------|
| `title` | `#` heading |
| `date` / `type` | `###` line around `\|` |
| `highlight` | Left cell of the content table (MD → HTML `<p>…</p>`) |
| `img` / image URL | `<img alt>` / `<img src>` (optional; type-based key + bundled asset if omitted) |
| `id`, `slug`, `latestUpdate`, `latestUpdateOrder` | Property table |

**Not in `newsData.md`:** release notes live in `releaseNotesData.md` (and ecosystem `ccdiDataUpdates.md`). Descriptive `altList` text uses a small code fallback map keyed by `img`.

### Seed fixture

- `tests/fixtures/news/newsMarkdownSamples.js`

## `rareCancerData.md` (Pediatric, Adolescent, and Young Adult Rare Cancer Study)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/rareCancerData.md?ts=<timestamp>` |
| Hub route | `/pediatric-adolescent-and-young-adult-rare-cancer-study` |
| Format | YAML front matter + Markdown body (`##` / `###` / `####` + property-table ids) |

### Fields

| Key | Notes |
|-----|--------|
| `title` | Page banner title |
| `RCI_Header` | Absolute URL for the hero banner background (bundled header used if omitted) |
| `RCI_Data_Flow_Chart_URL` | Absolute URL for the data-flow image (bundled chart used if omitted) |
| `RCI_DOWNLOAD_CONFIG` | `{ url, filename }` for the contact-form PDF download |
| `navTitles[]` | Left-nav labels; must match `##` / `###` heading text exactly |

Intro Markdown lives in the body **before the first `##`**. An optional `![RCI data flow chart](<url>)` image is stripped from the intro (the page renders the chart once from `RCI_Data_Flow_Chart_URL`). Nested `####` question headings stay in the subtopic body.

Property tables set scroll/nav ids:

```markdown
| Property | Value |
| --- | --- |
| id | Rare_Cancer_Study_Introduction |
```

Known ids: topic `Rare_Cancer_Study_Introduction`; subtopics `HOW_TO_ACCESS_STUDY_DATA`, `GERMLINE_FINDINGS`, `CONTACT_INFORMATION`.

### Failure behavior

If the file is missing, YAML is invalid, or the request fails, the Rare Cancer page stays empty until valid remote MD loads (no `resourceData.yaml` fallback).

### Seed fixture

- `tests/fixtures/resource/rareCancerMarkdownSamples.js`

## `MCI_JSON2TSV.md` (CCDI MCI JSON2TSV)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/MCI_JSON2TSV.md?ts=<timestamp>` |
| Hub route | `/MCI_JSON2TSV` |
| Format | YAML front matter + Markdown body (`##` + leading property-table ids) |

### Fields

| Key | Notes |
|-----|--------|
| `title` | Page banner title (e.g. `CCDI MCI JSON2TSV`) |
| `headerImage` / `JSON2TSV_Header` | Optional absolute URL for the hero banner (bundled MCI header used if omitted) |
| `navTitles[]` | Left-nav labels; must match `##` heading text exactly |

Intro Markdown lives in the body **before the first `##`**. Each section is a flat `##` topic with a leading property table for scroll/nav `id` (same idea as Rare Cancer).

```markdown
---
title: CCDI MCI JSON2TSV
navTitles:
  - Finding and Exporting MCI Clinical JSON files in C3DC Explore Dashboard
  - Running the JSON2TSV tool in the Cancer Genomics Cloud (CGC)
---

Intro paragraphs…

## Finding and Exporting MCI Clinical JSON files in C3DC Explore Dashboard

| Property | Value |
| --- | --- |
| id | FINDING_AND_EXPORTING_MCI_CLINICAL_JSON |

Section body with [links](https://example.com) and images.

![Figure D1](assets/MCI%20JSON2TSV/FigureD1.png)
```

Relative image paths (e.g. `assets/…`) resolve against `REACT_APP_STATIC_CONTENT_URL`. Prefer hosting figures under Static Contents or Hub Assets.

Section bodies support the same fenced widgets as MCI (`responsive-img`, `mci-table`, `mci-search-table`, `mci-disease-table`, `mci-map`). Optional `###` subtopics (with leading property-table ids) nest under a `##` topic like other resource pages.

Known ids: `FINDING_AND_EXPORTING_MCI_CLINICAL_JSON`, `RUNNING_JSON2TSV_IN_CGC`, `CGC_RESOURCES`, `CONTACT_AND_SOURCE_CODE`.

### Failure behavior

If the file is missing, YAML is invalid, or the request fails, the page stays empty until valid remote MD loads.

### Seed fixture

- `tests/fixtures/resource/mciJson2TsvMarkdownSamples.js`

## `cpiData.md` (CCDI Participant Index)

| Item | Value |
|------|--------|
| Path | `${REACT_APP_STATIC_CONTENT_URL}/cpiData.md?ts=<timestamp>` |
| Hub route | `/ccdi-participant-index` |
| Format | YAML front matter for image URLs, then news-style `#` blocks separated by `---` |

Front matter holds asset URLs only. Intro copy is the markdown before the first `#` heading. Each topic is a `#` section with a trailing property table for `id` (same pattern as `newsData.md`).

```markdown
---
CPI_Header_URL: "https://example.com/cpi-header.png"
CPI_Img_URL: "https://example.com/cpi-diagram.png"
CPI_Cross_Dataset_Linkages_Icon_URL: "https://example.com/cpi-linkages.svg"
CPI_Domain_Coverage_Icon_URL: "https://example.com/cpi-domains.svg"
CPI_Total_Mapped_Participants_Ids_Icon_URL: "https://example.com/cpi-mapped.svg"
CPI_Unique_Participants_Icon_URL: "https://example.com/cpi-unique.svg"
---

Intro paragraph for the Participant Index page.

---

# Components

Markdown body with [links](https://example.com) and lists.

| Property | Value |
| --- | --- |
| id | CPI_Components |
```

| Field | Source |
|-------|--------|
| Image URLs | YAML front matter (`CPI_*_URL`) |
| Intro | Prose before the first `#` heading |
| `topic` | `#` heading |
| `content` | Markdown body (lists, links, bold) |
| `id` | Property table (`CPI_Components` keeps the Components diagram) |

Live CPI statistics still come from the Participant Index API, not from this file.

### Seed fixture

- `tests/fixtures/resource/cpiMarkdownSamples.js`

# Static content updates (homepage & navigation)

Hub homepage and primary navigation copy can be updated **without a portal code release** by editing YAML inside markdown files hosted in [`CBIIT/CCDI_Hub_Static_Contents`](https://github.com/CBIIT/CCDI_Hub_Static_Contents).

The portal loads these files at runtime from `REACT_APP_STATIC_CONTENT_URL` (see `public/injectEnv.js` / `config/inject.template.js`).

| File | Purpose |
|------|---------|
| `landingData.md` | Homepage hero, section titles, stats labels, resource cards, carousel |
| `navData.md` | Primary nav + Resources / About submenus |
| `aboutSearchContent.md` | Global Search About-tab Fuse.js corpus |
| `newsData.md` | News cards + homepage Latest Updates strip |
| `releaseNotesData.md` | Hub release notes (News tab + release notes page) |
| `cpiData.md` | CCDI Participant Index page (`/ccdi-participant-index`) |
| `MCI_JSON2TSV.md` | CCDI MCI JSON2TSV page (`/MCI_JSON2TSV`) |

Content format is **YAML front matter only** (markdown body is ignored). This matches gray-matter usage on other Hub pages while keeping structured lists easy to edit.

## Environment URL

| Env | Typical base |
|-----|----------------|
| Local / Dev | `https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Static_Contents/dev` |
| Prod | Same repo, production branch (set via k8s / `inject.template.js`) |

Fetch URLs look like:

```text
${REACT_APP_STATIC_CONTENT_URL}/landingData.md?ts=<timestamp>
${REACT_APP_STATIC_CONTENT_URL}/navData.md?ts=<timestamp>
${REACT_APP_STATIC_CONTENT_URL}/newsData.md?ts=<timestamp>
${REACT_APP_STATIC_CONTENT_URL}/releaseNotesData.md?ts=<timestamp>
${REACT_APP_STATIC_CONTENT_URL}/cpiData.md?ts=<timestamp>
${REACT_APP_STATIC_CONTENT_URL}/MCI_JSON2TSV.md?ts=<timestamp>
```

The `?ts=` query busts CDN/browser caches so merges show up on the next page load.

## `{{C3DC}}` token

Use `{{C3DC}}` anywhere a C3DC base URL is needed. The portal substitutes `REACT_APP_C3DC` (no trailing slash) at parse time.

Examples:

```yaml
link: "{{C3DC}}/exploreParticipants"
link: "{{C3DC}}/"
```

## Permissions & deploy

1. Open a PR against the env branch in `CCDI_Hub_Static_Contents` (team members with administered permissions).
2. Edit only the YAML between the `---` fences in `landingData.md`, `navData.md`, or `aboutSearchContent.md`.
3. Merge the PR.
4. Hard-refresh the Hub (or open a new session). No portal rebuild is required for content-only changes.

Portal releases are only required when enabling or changing the **code** that reads these files.

## YAML field cheat sheet

### `navData.md`

Required: `primary` (non-empty list).

| Key | Shape |
|-----|--------|
| `primary[]` | `name`, `link`, `className` (`navMobileItem` or `navMobileItem clickable`) |
| `resources[]` | `name`, `link` (becomes `navMobileSubItem`) |
| `about[]` | Section: `name` + `children[]` with `name`, `link` **or** flat `name`/`link` |

Quote values that contain `:` or special characters:

```yaml
className: "navMobileItem clickable"
```

### `landingData.md`

Any of these keys may be present; missing keys stay empty (no JS copy fallback).

| Key | Notes |
|-----|--------|
| `heroTitle`, `heroSubtitle` | Hero headline / supporting text (`heroSubtitle` may use `\|` multiline) |
| `introTitle3`, `introButtonTitle` | About buttons under the hero |
| `latestUpdatesTitle`, `resourceTitle`, `applicationsTitle`, `cloudResourcesTitle` | Section headings |
| `statsNote` | Footnote under stats |
| `stats[]` | `title`, `detail`, `link`; optional static `num` (live MCI/CCDC counts still filled by the app) |
| `resourcesApplications[]` / `resourcesCloud[]` | `id`, `title`, `subtitle?`, `content`, `link`, `img?`, `noLink?` |
| `carousel[]` | `content`, `link`, `img?`, `mobile?` |

HTML in titles (e.g. stats line breaks) must be quoted:

```yaml
title: "Reported Cases Under Age 40<br>(1995-2020)"
```

Image fields should be absolute URLs. If `img` / `mobile` are omitted, the portal keeps the bundled local asset for that `id` / carousel `content` when possible.

## Failure behavior

There is **no JS copy fallback**. If a file is missing, YAML is invalid, or the network request fails, homepage/nav content stays empty until valid remote MD loads. Local webpack images may still attach to remote rows by `id` / carousel `content` when the MD omits `img` / `mobile` URLs.

Host `landingData.md`, `navData.md`, and `aboutSearchContent.md` on the static-contents branch before expecting a filled homepage, nav, or About search results.

## Verify after deploy

1. Confirm the raw GitHub URL returns the new YAML (open in browser).
2. Load Hub home: hero text, resource cards, carousel labels/links.
3. Check primary nav: Explore / Studies C3DC links, Resources submenu, nested About sections.
4. Confirm no portal redeploy was needed for the content change.

## Fixtures in this repo

Copy-starting samples (for tests and for seeding the static-contents repo):

- `tests/fixtures/landing/landingMarkdownSamples.js`
- `tests/fixtures/nav/navMarkdownSamples.js`
- `tests/fixtures/about/aboutSearchMarkdownSamples.js`
- `tests/fixtures/about/aboutSearchContent.json`
- `tests/fixtures/news/newsMarkdownSamples.js`
- `tests/fixtures/resource/rareCancerMarkdownSamples.js`
- `tests/fixtures/resource/mciJson2TsvMarkdownSamples.js`
- `tests/fixtures/resource/cpiMarkdownSamples.js`
