/**
 * Global Search **`ValueCard`** (data-model value presentation) — Phase 4.
 *
 * @see src/pages/globalSearch/Cards/ValueCard.js
 */

jest.mock('@bento-core/util', () => ({
  prepareLinks: (definitions, row) =>
    definitions.map((def) => ({
      ...def,
      link: def.link,
      linkText: def.linkText,
      value: row && def.dataField !== undefined ? row[def.dataField] : undefined,
    })),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';

import ValueCard from '../../../src/pages/globalSearch/Cards/ValueCard';

import { valueCardRow } from '../../fixtures/globalSearch/cardPresentationFixtures';

const theme = createMuiTheme();

describe('Global Search — ValueCard', () => {
  beforeEach(() => {
    global.MutationObserver = class {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
      }
    };
    if (!document.createRange) {
      document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: document.body,
      });
    }
  });

  it('should render model header and bound property rows', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ValueCard data={valueCardRow} index={0} />
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(screen.getByText(`MODEL: ${valueCardRow.value}`)).toBeInTheDocument();
    expect(screen.getByText('Data Model Node:')).toBeInTheDocument();
    expect(screen.getByText(valueCardRow.node_name)).toBeInTheDocument();
    expect(screen.getByText('Property Name:')).toBeInTheDocument();
    expect(screen.getByText(valueCardRow.property_name)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Data Model' })).toHaveAttribute(
      'href',
      '/data-model',
    );
  });
});
