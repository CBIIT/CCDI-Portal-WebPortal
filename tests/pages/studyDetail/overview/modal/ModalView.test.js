/**
 * ModalView — enlarged study profile modal open/close.
 */

jest.mock('../../../../../src/pages/studyDetail/overview/tabs/TabsView', () => ({
  __esModule: true,
  default: function MockTabsView({ data, isModalView }) {
    const React = require('react');
    return React.createElement(
      'div',
      { 'data-testid': 'tabs-view', 'data-modal': String(isModalView) },
      data.study_id,
    );
  },
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ModalView from '../../../../../src/pages/studyDetail/overview/modal/ModalView';
import { overviewViewDataFixture } from '../../../../fixtures/studyDetail/overviewViewProps';

const theme = createMuiTheme();

describe('ModalView', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
  });

  it('should render open button and keep modal closed initially', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalView data={overviewViewDataFixture} />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: /see enlarged view/i })).toBeInTheDocument();
    expect(screen.queryByText(/Study Profile:/i)).not.toBeInTheDocument();
  });

  it('should open modal with study id and modal tabs when button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalView data={overviewViewDataFixture} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /see enlarged view/i }));

    expect(screen.getByText(/Study Profile:/i)).toBeInTheDocument();
    expect(screen.getByTestId('tabs-view')).toHaveTextContent('phs002431');
    const tabsView = screen.getByTestId('tabs-view');
    expect(tabsView).toHaveAttribute('data-modal', 'true');
  });

  it('should close modal when close button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <ModalView data={overviewViewDataFixture} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /see enlarged view/i }));
    expect(screen.getByText(/Study Profile:/i)).toBeInTheDocument();

    const modalHeader = screen.getByText(/Study Profile:/i).parentElement;
    fireEvent.click(modalHeader.querySelector('button'));

    expect(screen.queryByText(/Study Profile:/i)).not.toBeInTheDocument();
  });
});
