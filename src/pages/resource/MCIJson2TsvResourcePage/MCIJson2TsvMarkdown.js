import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import env from '../../../utils/env';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

/** Resolve relative MD image paths against REACT_APP_STATIC_CONTENT_URL. */
export function resolveStaticContentAssetUrl(src) {
  if (src == null || String(src).trim() === '') {
    return src;
  }
  const value = String(src).trim();
  if (
    value.startsWith('http://')
    || value.startsWith('https://')
    || value.startsWith('//')
    || value.startsWith('data:')
    || value.startsWith('blob:')
  ) {
    return value;
  }
  const base = String(env.REACT_APP_STATIC_CONTENT_URL || '').replace(/\/$/, '');
  if (!base) {
    return value;
  }
  const path = value.replace(/^\.\//, '').replace(/^\//, '');
  return `${base}/${path}`;
}

/** Same class mapping as MciMarkdown — pairs with View `.ecosystemImg` / `.mci-md-img`. */
const RESP = {
  wide: 'ecosystemImg',
  mobile: 'ecosystemImgMobile',
  default: 'mci-md-img',
};

const MCI_CONTACT_SUBHEADINGS = new Set([
  'MCI Results Contacts',
  'MCI Data Contact',
  'Project:EveryChild Contact',
]);

function flattenMarkdownText(children) {
  if (children === undefined || children === null) {
    return '';
  }
  if (Array.isArray(children)) {
    return children.map(flattenMarkdownText).join('');
  }
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (children.props && children.props.children !== undefined) {
    return flattenMarkdownText(children.props.children);
  }
  return '';
}

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

const MCIJson2TsvMarkdown = ({ children }) => {
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
        img: ({ node: _img, src, alt, title, ...rest }) => {
          const resolved = resolveStaticContentAssetUrl(src);
          const cls = inlineImgClassName(resolved);
          return (
            <img
              {...rest}
              src={resolved}
              alt={alt || ''}
              title={title}
              className={cls}
              loading="lazy"
            />
          );
        },
        h4: ({ node: _h, children: headingChildren, ...rest }) => {
          const text = flattenMarkdownText(headingChildren).trim();
          if (MCI_CONTACT_SUBHEADINGS.has(text)) {
            return <p className="mci-contact-subheading">{headingChildren}</p>;
          }
          return <h4 {...rest}>{headingChildren}</h4>;
        },
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default MCIJson2TsvMarkdown;
