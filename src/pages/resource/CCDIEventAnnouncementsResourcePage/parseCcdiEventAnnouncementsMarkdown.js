import matter from 'gray-matter';

/**
 * One-line CommonMark / GFM image: ![alt](src) or ![alt](src "title")
 * or ![alt](<https://x>) (optional "title" after)
 */
function parseMarkdownImageFromLine(line) {
  const s = String(line).trim();
  if (!s.startsWith('![')) {
    return null;
  }
  const b = s.indexOf('](');
  if (b < 0) {
    return null;
  }
  const alt = s.slice(2, b);
  if (s.slice(b, b + 2) !== '](') {
    return null;
  }
  if (s[s.length - 1] !== ')') {
    return null;
  }
  const inner = s.slice(b + 2, s.length - 1);
  const innerT = inner.trim();
  if (!innerT) {
    return null;
  }
  let m = innerT.match(/^<([^>]+)>\s*(?:"((?:\\.|[^"\\])*)")?$/);
  if (m) {
    return { alt, src: m[1].trim(), title: m[2] || undefined };
  }
  m = innerT.match(/^(\S+)(?:\s+"((?:\\.|[^"\\])*)")?$/);
  if (m) {
    return { alt, src: m[1], title: m[2] || undefined };
  }
  return null;
}

/** After optional leading blank lines, the first line may be a markdown image (page hero). */
function extractLeadingImageFromIntro(introMd) {
  if (!String(introMd || '').trim()) {
    return { headerImage: null, introWithoutHeaderImage: introMd || '' };
  }
  const lines = String(introMd).split('\n');
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') {
    i += 1;
  }
  if (i >= lines.length) {
    return { headerImage: null, introWithoutHeaderImage: String(introMd).trim() };
  }
  const img = parseMarkdownImageFromLine(lines[i]);
  if (!img) {
    return { headerImage: null, introWithoutHeaderImage: String(introMd).trim() };
  }
  const rest = lines.slice(i + 1).join('\n').trim();
  return { headerImage: img, introWithoutHeaderImage: rest || '' };
}

function slugify(text) {
  const s = String(text)
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return (s || 'section').slice(0, 120);
}

function parseHeadingH2(line) {
  const re = /^##\s+(.+?)(?:\s*\{#([^}]+)\})?\s*$/;
  const m = line.match(re);
  if (!m) {
    return null;
  }
  return { title: m[1].trim(), id: m[2] || slugify(m[1]) };
}

function splitH2Sections(body) {
  if (!body || !String(body).trim()) {
    return [];
  }
  const lines = String(body).split('\n');
  const sections = [];
  let cur = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^##\s/.test(line)) {
      if (cur) {
        sections.push({
          id: cur.id,
          topic: cur.topic,
          content: cur.lines.join('\n').trim(),
        });
      }
      const p = parseHeadingH2(line);
      cur = p
        ? { topic: p.title, id: p.id, lines: [] }
        : {
            topic: line.replace(/^##\s+/, '').trim(),
            id: slugify(line),
            lines: [],
          };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) {
    sections.push({
      id: cur.id,
      topic: cur.topic,
      content: cur.lines.join('\n').trim(),
    });
  }
  return sections;
}

function extractIntroAndRestFromBody(body) {
  if (!body || !String(body).trim()) {
    return { introMarkdown: '', rest: '' };
  }
  const lines = String(body).split('\n');
  let introEnd = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s/.test(lines[i])) {
      introEnd = i;
      break;
    }
  }
  if (introEnd === -1) {
    return { introMarkdown: String(body).trim(), rest: '' };
  }
  return {
    introMarkdown: lines.slice(0, introEnd).join('\n').trim(),
    rest: lines.slice(introEnd).join('\n'),
  };
}

/**
 * CCDI Events & Announcements: intro (before the first `##`) may start with
 * `![alt](url "title")` — the FE uses `url` for `CCDIContainer` / header background and
 * strips that line from intro body. `CCDI_Event_Announcements_Header` in front matter is
 * used only as a fallback when there is no such lead image line. Then `## Topic {#anchorId}` and
 * section bodies (often HTML).
 */
export function parseCcdiEventAnnouncementsMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { ccdiEventAnnouncementsIntroText: _fmIntro, ...restFm } = fm;
  const { introMarkdown, rest } = extractIntroAndRestFromBody(body || '');
  const ccdiEventAnnouncementsContent = splitH2Sections(rest);
  const { headerImage, introWithoutHeaderImage } = extractLeadingImageFromIntro(
    introMarkdown
  );
  const introFromBody = String(introWithoutHeaderImage || '').trim() !== '' ? introWithoutHeaderImage : undefined;
  const headerFromImage = headerImage && headerImage.src ? String(headerImage.src) : undefined;

  return {
    ...restFm,
    ccdiEventAnnouncementsContent,
    ccdiEventAnnouncementsHeaderImageUrl: headerFromImage,
    ccdiEventAnnouncementsIntroMarkdown: introFromBody,
    ccdiEventAnnouncementsIntroText: _fmIntro,
  };
}

export default parseCcdiEventAnnouncementsMarkdown;
