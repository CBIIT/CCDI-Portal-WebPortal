import matter from 'gray-matter';

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
 * CCDI Events & Announcements: front matter (header URL, etc.) + body: optional intro
 * (markdown) before the first `##` heading, then `## Topic {#anchorId}` sections; each
 * section body is usually HTML (same as legacy YAML `content`).
 */
export function parseCcdiEventAnnouncementsMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { ccdiEventAnnouncementsIntroText: _fmIntro, ...restFm } = fm;
  const { introMarkdown, rest } = extractIntroAndRestFromBody(body || '');
  const ccdiEventAnnouncementsContent = splitH2Sections(rest);

  const introFromBody = String(introMarkdown || '').trim() !== '' ? introMarkdown : undefined;

  return {
    ...restFm,
    ccdiEventAnnouncementsContent,
    ccdiEventAnnouncementsIntroMarkdown: introFromBody,
    ccdiEventAnnouncementsIntroText: _fmIntro,
  };
}

export default parseCcdiEventAnnouncementsMarkdown;
