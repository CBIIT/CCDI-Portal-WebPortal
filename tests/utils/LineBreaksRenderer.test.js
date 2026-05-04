/**
 * Phase 3 — `src/utils/LineBreaksRenderer.js`: sanitized HTML span.
 */

jest.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: jest.fn((html) => `[sanitized]${html}`),
  },
}));

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import LineBreaksRenderer from '../../src/utils/LineBreaksRenderer';

describe('LineBreaksRenderer', () => {
  it('should pass content through DOMPurify when sanitize is true', () => {
    const DOMPurify = require('dompurify').default;
    const { container } = render(<LineBreaksRenderer htmlContent="hello<br/>world" sanitize />);
    expect(DOMPurify.sanitize).toHaveBeenCalled();
    expect(container.innerHTML).toContain('[sanitized]');
  });

  it('should skip sanitization when sanitize is false', () => {
    const DOMPurify = require('dompurify').default;
    DOMPurify.sanitize.mockClear();
    const { container } = render(<LineBreaksRenderer htmlContent="<em>x</em>" sanitize={false} />);
    expect(DOMPurify.sanitize).not.toHaveBeenCalled();
    expect(container.querySelector('em')).toBeInTheDocument();
  });
});
