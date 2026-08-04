import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

function getLinkClassName(href, linkVariant) {
  if (!href) {
    return undefined;
  }
  if (linkVariant === 'aboutLink' && isExternal(href)) {
    return 'aboutLink';
  }
  if (linkVariant === 'aboutContactLink' && href.startsWith('mailto:')) {
    return 'aboutContactLink';
  }
  return undefined;
}

const AboutMarkdown = ({ children, linkVariant = 'default' }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _a, children: linkChildren, href, ...rest }) => {
          const className = getLinkClassName(href, linkVariant);
          const external = isExternal(href);
          const mailto = href && href.startsWith('mailto:');
          const externalProps = (external || mailto)
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};

          return (
            <a
              {...rest}
              href={href}
              className={className}
              {...externalProps}
              target={external || mailto ? '_blank' : undefined}
              rel="noreferrer"
            >
              {linkChildren}
            </a>
          );
        },
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default AboutMarkdown;
