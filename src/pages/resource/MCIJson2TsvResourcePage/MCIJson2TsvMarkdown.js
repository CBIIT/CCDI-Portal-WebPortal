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
        img: ({ node: _img, src, alt, ...rest }) => (
          <img
            {...rest}
            src={resolveStaticContentAssetUrl(src)}
            alt={alt || ''}
          />
        ),
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default MCIJson2TsvMarkdown;
