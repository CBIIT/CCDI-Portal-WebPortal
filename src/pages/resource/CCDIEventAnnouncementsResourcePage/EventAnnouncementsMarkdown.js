import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  EVENT_ROUTE_BASE,
  getDetailPageSlugForLinkText,
} from './eventsUtils';

function isExternal(href) {
  if (!href) {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
}

function isMailto(href) {
  return Boolean(href && href.startsWith('mailto:'));
}

function collectText(node) {
  if (node == null || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(collectText).join('');
  }
  if (React.isValidElement(node)) {
    return collectText(node.props.children);
  }
  return '';
}

const EventAnnouncementsMarkdown = ({ children }) => {
  if (children === undefined || children === null || children === '') {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node: _a, children: linkChildren, href, ...rest }) => {
          const linkText = collectText(linkChildren).trim();
          const detailSlug = getDetailPageSlugForLinkText(linkText);
          const internalHref = href && href.startsWith(EVENT_ROUTE_BASE) ? href : null;
          const to = detailSlug
            ? `${EVENT_ROUTE_BASE}/${detailSlug}`
            : internalHref;

          if (to) {
            return (
              <Link {...rest} to={to}>
                {linkChildren}
              </Link>
            );
          }

          const external = isExternal(href) || isMailto(href);
          return (
            <a
              {...rest}
              href={href}
              className={external ? 'link' : undefined}
              target={external ? '_blank' : undefined}
              rel="noopener noreferrer"
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

export default EventAnnouncementsMarkdown;
