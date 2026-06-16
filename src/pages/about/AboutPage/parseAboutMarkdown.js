import matter from 'gray-matter';

function splitLowerSection(sectionBody) {
  const trimmed = String(sectionBody || '').trim();
  if (!trimmed) {
    return { lowerText: '', aboutText: '' };
  }

  const parts = trimmed.split(/\n\n+/);
  if (parts.length === 0) {
    return { lowerText: '', aboutText: '' };
  }

  return {
    lowerText: parts[0].trim(),
    aboutText: parts.slice(1).join('\n\n').trim(),
  };
}

function parseAboutBody(body) {
  const lines = String(body || '').split('\n');
  let h2Index = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s/.test(lines[i])) {
      h2Index = i;
      break;
    }
  }

  if (h2Index === -1) {
    return {
      upperText: String(body || '').trim(),
      lowerTitle: '',
      lowerText: '',
      aboutText: '',
    };
  }

  const upperText = lines.slice(0, h2Index).join('\n').trim();
  const h2Match = lines[h2Index].match(/^##\s+(.+)$/);
  const lowerTitle = h2Match ? h2Match[1].trim() : '';
  const rest = lines.slice(h2Index + 1).join('\n').trim();
  const { lowerText, aboutText } = splitLowerSection(rest);

  return {
    upperText,
    lowerTitle,
    lowerText,
    aboutText,
  };
}

export default function parseAboutMarkdown(rawMarkdown) {
  const source = String(rawMarkdown || '').replace(/^\uFEFF/, '');
  const { data: frontMatter, content } = matter(source);
  const title = String(frontMatter.title || '').trim();
  const About_Img = String(frontMatter.About_Img || '').trim();
  const bodyParts = parseAboutBody(content);

  return {
    title,
    About_Img,
    aboutData: {
      upperTitle: title,
      upperText: bodyParts.upperText,
      lowerTitle: bodyParts.lowerTitle,
      lowerText: bodyParts.lowerText,
      aboutText: bodyParts.aboutText,
    },
  };
}
