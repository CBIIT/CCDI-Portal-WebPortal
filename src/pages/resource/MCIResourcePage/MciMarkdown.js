import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

/** Pair with `.ecosystemImg` / `.ecosystemImgMobile` in MCIResourceMarkdownView. Prefer ```responsive-img``` in mciData; this only tags rare inline `![alt](url?variant=…)` images. */
const RESP = {
  wide: 'ecosystemImg',
  mobile: 'ecosystemImgMobile',
  default: 'mci-md-img',
};

function inlineImgClassName(src) {
  const raw = String(src || '').trim();
  if (!raw) return RESP.default;
  let u;
  try {
    u = new URL(raw, 'https://placeholder.local');
  } catch {
    return RESP.default;
  }
  const p = (u.searchParams.get('variant') || u.searchParams.get('mci') || '').trim().toLowerCase();
  if (p === 'mobile' || p === 'narrow' || p === 'small') return RESP.mobile;
  if (p === 'wide' || p === 'desktop' || p === 'large' || p === 'main') return RESP.wide;
  return RESP.default;
}

const MciMarkdown = ({ children }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _a, children, href, ...rest }) => (
          <a
            {...rest}
            href={href}
            className={isExternal(href) ? 'link' : undefined}
            target={isExternal(href) ? '_blank' : undefined}
            rel={isExternal(href) ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        img: ({ node: _i, src, alt, title, ...rest }) => {
          const cls = inlineImgClassName(src);
          return (
            <img
              {...rest}
              src={src}
              alt={alt || ''}
              title={title}
              className={cls}
              loading="lazy"
            />
          );
        },
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default MciMarkdown;
