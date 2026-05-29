/**
 * UserGuideButton — opens in-page user guide modal.
 */

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserGuideButton from '../../../../src/pages/inventory/sideBar/UserGuideButton';

const theme = createMuiTheme();

describe('UserGuideButton', () => {
  beforeEach(() => {
    global.MutationObserver = class MutationObserver {
      disconnect() {}
      observe() {}
      takeRecords() { return []; }
    };
    Element.prototype.scrollIntoView = jest.fn();
    document.getElementById = jest.fn((id) => ({
      offsetTop: 100,
    }));
  });

  it('should render guide button label', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserGuideButton />
      </ThemeProvider>,
    );
    expect(screen.getByText('Explore the CCDI User Guide')).toBeInTheDocument();
  });

  it('should open modal with topics when button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserGuideButton />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('USER GUIDE TOPICS')).toBeInTheDocument();
    expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CCDI Hub Explore Dashboard and Cart/i).length).toBeGreaterThan(0);
  });

  it('should close modal when close icon is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <UserGuideButton />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('close'));
    expect(screen.queryByText('USER GUIDE TOPICS')).not.toBeInTheDocument();
  });

  it('should scroll content when a topic nav item is clicked', () => {
    const scrollTo = jest.fn();
    document.getElementById = jest.fn((id) => {
      if (id === 'UserGuideContentSection') {
        return { scrollTo };
      }
      return { offsetTop: 200 };
    });

    render(
      <ThemeProvider theme={theme}>
        <UserGuideButton />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getAllByText('Contact Information')[0]);
    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' }),
    );
  });
});
