/**
 * AddSelectedFiles view — button click and optional tooltip.
 */

jest.mock('@bento-core/tool-tip', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddSelectedFilesView, {
  ToolTipView,
} from '../../../src/pages/globalSearch/Cards/files/AddSelectedFiles/AddSelectedFilesView';

beforeEach(() => {
  global.MutationObserver = class MutationObserver {
    disconnect() {}
    observe() {}
    takeRecords() { return []; }
  };
});

describe('AddSelectedFilesView', () => {
  it('should call eventHandler when button is clicked', () => {
    const handler = jest.fn();
    render(
      <AddSelectedFilesView
        eventHandler={handler}
        title="ADD FILES"
        clsName="btn"
        disabled={false}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'ADD FILES' }));
    expect(handler).toHaveBeenCalled();
  });

  it('should disable the button when disabled is true', () => {
    render(
      <AddSelectedFilesView
        eventHandler={jest.fn()}
        title="ADD FILES"
        clsName="btn"
        disabled
      />,
    );
    expect(screen.getByRole('button', { name: 'ADD FILES' })).toBeDisabled();
  });

  it('should render tooltip when tooltipCofig is provided', () => {
    render(
      <AddSelectedFilesView
        eventHandler={jest.fn()}
        title="ADD FILES"
        clsName="btn"
        disabled={false}
        tooltipCofig={{ src: '/tip.png', alt: 'tip', section: 'files' }}
        classes={{ customTooltip: 't', customArrow: 'a' }}
      />,
    );
    expect(screen.getByAltText('tip')).toBeInTheDocument();
  });

  it('should render ToolTipView with section fallback title', () => {
    render(
      <ToolTipView
        section="files"
        tooltipCofig={{ src: '/icon.png', alt: 'help', files: 'Add selected files' }}
        classes={{ customTooltip: 't', customArrow: 'a' }}
      />,
    );
    expect(screen.getByAltText('help')).toBeInTheDocument();
  });
});
