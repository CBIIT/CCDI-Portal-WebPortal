import matter from 'gray-matter';

function stripMarkdownHeadingBraceId(rawHeadingInner) {
  return String(rawHeadingInner || '')
    .trim()
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim();
}

/** Legacy-style section ids (e.g. Data_Use_Expectations). */
export function topicToSectionId(topic) {
  return stripMarkdownHeadingBraceId(topic)
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
}

export function resolveSectionBlockquoteVariant(topic) {
  const key = stripMarkdownHeadingBraceId(topic).trim().toLowerCase();
  if (key === 'contact' || key.startsWith('contact ')) {
    return 'callout';
  }
  if (key.includes('citing')) {
    return 'citation';
  }
  return 'default';
}

function parseIntroAndCallout(body) {
  const lines = String(body || '').split('\n');
  let firstH2 = lines.length;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s/.test(lines[i])) {
      firstH2 = i;
      break;
    }
  }

  const introBlock = lines.slice(0, firstH2).join('\n').trim();
  if (!introBlock) {
    return { introText: '', introCallout: '', rest: lines.slice(firstH2).join('\n').trim() };
  }

  const introLines = introBlock.split('\n');
  let calloutStart = -1;
  for (let i = 0; i < introLines.length; i += 1) {
    if (/^>\s?/.test(introLines[i])) {
      calloutStart = i;
      break;
    }
  }

  if (calloutStart >= 0) {
    return {
      introText: introLines.slice(0, calloutStart).join('\n').trim(),
      introCallout: introLines.slice(calloutStart).join('\n').trim(),
      rest: lines.slice(firstH2).join('\n').trim(),
    };
  }

  return {
    introText: introBlock,
    introCallout: '',
    rest: lines.slice(firstH2).join('\n').trim(),
  };
}

function splitH2Sections(restBody) {
  if (!restBody || !String(restBody).trim()) {
    return [];
  }
  const lines = restBody.split('\n');
  const sections = [];
  let cur = null;

  lines.forEach((line) => {
    const m = line.match(/^##\s+(.+)$/);
    if (m) {
      if (cur) {
        sections.push(cur);
      }
      const topic = stripMarkdownHeadingBraceId(m[1]);
      cur = {
        id: topicToSectionId(topic),
        topic,
        markdown: '',
        blockquoteVariant: resolveSectionBlockquoteVariant(topic),
      };
    } else if (cur) {
      cur.markdown = cur.markdown ? `${cur.markdown}\n${line}` : line;
    }
  });

  if (cur) {
    sections.push(cur);
  }

  return sections.map((section) => ({
    ...section,
    markdown: String(section.markdown || '').trim(),
  }));
}

/**
 * Parses dataUsagePolicies.md into view props.
 * @param {string} raw - full file contents with YAML front matter
 */
export function parseDataUsagePoliciesMarkdown(raw) {
  const { data: fm, content: body } = matter(raw || '');
  const { introText, introCallout, rest } = parseIntroAndCallout(body || '');

  return {
    ...fm,
    title: fm.title != null ? String(fm.title) : '',
    Data_Usage_Policies_Header: fm.Data_Usage_Policies_Header != null
      ? String(fm.Data_Usage_Policies_Header)
      : '',
    introText,
    introCallout,
    dataUsagePoliciesContent: splitH2Sections(rest),
  };
}

export default parseDataUsagePoliciesMarkdown;
