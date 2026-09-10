import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

/** Pair with `.ecosystemImg` / `.ecosystemImgMobile` in FederationResourceView. Prefer ```responsive-img```; this tags rare inline `![alt](url?variant=…)` images. */
const RESP = {
  wide: 'ecosystemImg',
  mobile: 'ecosystemImgMobile',
  default: 'federation-md-img',
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

const FederationMarkdown = ({ children }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _a, children: linkChildren, href, ...rest }) => {
          const external = isExternal(href);
          const mailto = href && href.startsWith('mailto:');
          return (
            <a
              {...rest}
              href={href}
              className={external || mailto ? 'link' : undefined}
              target={external || mailto ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              {linkChildren}
            </a>
          );
        },
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

export default FederationMarkdown;
