import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { applyContentVariables } from '../../../utils/resolveContentTokens';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

const CpiMarkdown = ({ children, variables }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }

  const source = applyContentVariables(String(children), variables);

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
              className={external ? 'link' : undefined}
              target={external || mailto ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              {linkChildren}
            </a>
          );
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
};

export default CpiMarkdown;
