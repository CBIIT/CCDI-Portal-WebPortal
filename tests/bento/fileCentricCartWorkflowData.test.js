/**
 * `src/bento/fileCentricCartWorkflowData.js` — cart config and layout custom elements.
 */

jest.mock('../../src/pages/cart/customComponent/exportButton/exportButtonController', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function MockExportButton() {
      return React.createElement('div', { 'data-testid': 'export-button' });
    },
  };
});

jest.mock('../../src/pages/cart/customComponent/userGuideButton/linkButton', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function MockLinkButton() {
      return React.createElement('div', { 'data-testid': 'link-button' });
    },
  };
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  navBarCartData,
  alertMessage,
  maximumNumberOfFilesAllowedInTheCart,
  tooltipContent,
  myFilesPageData,
  manifestData,
  GET_MY_CART_DATA_QUERY,
  table,
} from '../../src/bento/fileCentricCartWorkflowData';

describe('fileCentricCartWorkflowData', () => {
  it('should expose cart navigation and limits', () => {
    expect(navBarCartData.cartLink).toBe('/fileCentricCart');
    expect(maximumNumberOfFilesAllowedInTheCart).toBe(200000);
    expect(alertMessage).toContain('200,000');
    expect(tooltipContent.myFiles).toContain('Manifest');
  });

  it('should define manifest column mapping', () => {
    expect(manifestData.keysToInclude).toEqual(
      expect.arrayContaining(['guid', 'file_name', 'md5sum']),
    );
    expect(manifestData.header).toHaveLength(4);
  });

  it('should configure files table with cart query', () => {
    expect(table.paginationAPIField).toBe('filesInList');
    expect(table.api).toBe(GET_MY_CART_DATA_QUERY);
    expect(table.columns.some((c) => c.dataField === 'file_name')).toBe(true);
  });

  it('should render custom header buttons from layout config', () => {
    const buttonsLayout = myFilesPageData.layout.find((l) => l.container === 'buttons');
    const customItems = buttonsLayout.items.filter((item) => item.customViewElem);

    expect(customItems).toHaveLength(2);

    customItems.forEach((item) => {
      const { container } = render(item.customViewElem({ testProp: true }));
      expect(container.firstChild).toBeTruthy();
    });

    expect(screen.getByTestId('link-button')).toBeInTheDocument();
    expect(screen.getByTestId('export-button')).toBeInTheDocument();
  });
});
