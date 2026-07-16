import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

function blockquoteClassName(variant) {
  if (variant === 'callout') {
    return 'calloutBox';
  }
  if (variant === 'citation') {
    return 'citationQuote';
  }
  return 'policiesBlockquote';
}

const DataUsagePoliciesMarkdown = ({ children, blockquoteVariant = 'default' }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }

  const bqClass = blockquoteClassName(blockquoteVariant);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _a, children: linkChildren, href, ...rest }) => {
          const ext = isExternal(href);
          const externalProps = ext
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
            <a
              {...rest}
              href={href}
              className={ext ? 'link' : undefined}
              {...externalProps}
            >
              {linkChildren}
            </a>
          );
        },
        blockquote: ({ node: _b, children: quoteChildren, ...rest }) => (
          <blockquote {...rest} className={bqClass}>
            {quoteChildren}
          </blockquote>
        ),
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default DataUsagePoliciesMarkdown;
