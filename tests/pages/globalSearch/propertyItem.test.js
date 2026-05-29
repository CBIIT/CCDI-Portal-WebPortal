/**
 * PropertyItem — labels, links, line breaks, and falsy values.
 */

jest.mock('../../../src/utils/LineBreaksRenderer', () => ({
  __esModule: true,
  default: ({ htmlContent }) => <span data-testid="line-breaks">{htmlContent}</span>,
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import PropertyItem from '../../../src/pages/globalSearch/Cards/PropertyItem';

const theme = createMuiTheme();

function renderPropertyItem(props) {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <PropertyItem index={0} {...props} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('PropertyItem', () => {
  it('should render plain label and value', () => {
    renderPropertyItem({ label: 'Study ID', value: 'phs001' });
    expect(screen.getByText('Study ID:')).toBeInTheDocument();
    expect(screen.getByText('phs001')).toBeInTheDocument();
  });

  it('should render internal router link when link prop is provided', () => {
    renderPropertyItem({
      label: 'Page',
      value: 'Participant',
      link: '/data-model',
      linkText: 'Data Model',
    });
    expect(screen.getByRole('link', { name: 'Data Model' })).toHaveAttribute('href', '/data-model');
  });

  it('should render external anchor when link uses a protocol', () => {
    renderPropertyItem({
      label: 'Resource',
      value: 'Docs',
      link: 'https://example.com/docs',
      linkText: 'Documentation',
    });
    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveAttribute('href', 'https://example.com/docs');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render label as external link when labelLink is set', () => {
    renderPropertyItem({
      label: 'Glossary',
      labelLink: 'https://example.com/glossary',
      value: 'term',
    });
    expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute(
      'href',
      'https://example.com/glossary',
    );
  });

  it('should render line breaks when hasBreakLine is true', () => {
    renderPropertyItem({
      label: 'Description',
      value: 'Line one<br/>Line two',
      hasBreakLine: true,
    });
    expect(screen.getByTestId('line-breaks')).toHaveTextContent('Line one');
  });

  it('should render numeric zero as a value', () => {
    renderPropertyItem({ label: 'Count', value: 0 });
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render nothing when value is empty', () => {
    const { container } = renderPropertyItem({ label: 'Empty', value: '' });
    expect(container.querySelector('.propertyContainer')).toBeNull();
  });
});
