/**
 * Shared setup/helpers for resource *ResourceView interaction tests.
 */

import { fireEvent } from '@testing-library/react';

export function setupResourceViewDom() {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
}

export function teardownResourceViewDom() {
  document.querySelectorAll('footer').forEach((el) => el.remove());
}

export function clickTopicNav(label) {
  const navItem = Array.from(document.querySelectorAll('.navTopicItem:not(.subtitle)'))
    .find((el) => el.textContent === label);
  if (!navItem) {
    throw new Error(`Topic nav item not found: ${label}`);
  }
  fireEvent.click(navItem);
  return navItem;
}

export function clickSubtopicNav(label) {
  const navItem = Array.from(document.querySelectorAll('.navTopicItem.subtitle'))
    .find((el) => el.textContent === label);
  if (!navItem) {
    throw new Error(`Subtopic nav item not found: ${label}`);
  }
  fireEvent.click(navItem);
  return navItem;
}

export function triggerResourceScroll(bodyId = 'FederationBody') {
  const body = document.getElementById(bodyId);
  if (body) {
    Object.defineProperty(body, 'offsetTop', { configurable: true, value: 0 });
  }
  document.querySelectorAll('footer').forEach((footer) => {
    Object.defineProperty(footer, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 2000 }),
    });
  });
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    writable: true,
    value: 200,
  });
  fireEvent.scroll(document);
}

export function triggerResourceScrollAbsolute(bodyId = 'FederationBody', footerTop = 50) {
  const body = document.getElementById(bodyId);
  if (body) {
    Object.defineProperty(body, 'offsetTop', { configurable: true, value: 0 });
  }
  const leftNav = document.getElementById('leftNav');
  if (leftNav) {
    Object.defineProperty(leftNav, 'offsetHeight', { configurable: true, value: 400 });
  }
  document.querySelectorAll('footer').forEach((footer) => {
    Object.defineProperty(footer, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: footerTop }),
    });
  });
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    writable: true,
    value: 500,
  });
  fireEvent.scroll(document);
}

export function triggerResourceScrollToTop(bodyId = 'FederationBody') {
  const body = document.getElementById(bodyId);
  if (body) {
    Object.defineProperty(body, 'offsetTop', { configurable: true, value: 100 });
  }
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    writable: true,
    value: 0,
  });
  fireEvent.scroll(document);
}

export function toggleMobileSection(mobileSelector = '.mciTitleMobile') {
  const mobileHeader = document.querySelector(mobileSelector);
  if (!mobileHeader) {
    throw new Error(`Mobile section header not found: ${mobileSelector}`);
  }
  fireEvent.click(mobileHeader);
  return mobileHeader;
}
