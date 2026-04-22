import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isExternal(href) {
  if (!href) return false;
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

const MciMarkdown = ({ children }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _node, children, href, ...rest }) => (
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
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default MciMarkdown;
