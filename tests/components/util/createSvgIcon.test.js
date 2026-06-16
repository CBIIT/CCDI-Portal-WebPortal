/**
 * `createSvgIcon` — MUI SvgIcon wrapper with display name and test id.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import createSvgIcon from '../../../src/components/util/createSvgIcon';

describe('createSvgIcon', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('Rendering', () => {
    it('should render SvgIcon with data-mui-test and path children', () => {
      const Icon = createSvgIcon(<path data-testid="path-node" d="M0 0" />, 'UnitTest');
      const { container } = render(<Icon />);

      expect(container.querySelector('svg[data-mui-test="UnitTestIcon"]')).toBeInTheDocument();
      expect(screen.getByTestId('path-node')).toBeInTheDocument();
      expect(Icon.muiName).toBeTruthy();
    });

    it('should set displayName in non-production builds', () => {
      process.env.NODE_ENV = 'development';
      const Icon = createSvgIcon(<path d="M0 0" />, 'DevIcon');
      expect(Icon.displayName).toBe('DevIconIcon');
    });
  });
});
