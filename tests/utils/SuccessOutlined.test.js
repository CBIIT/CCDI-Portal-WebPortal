/**
 * `SuccessOutlined` icon — wraps `@bento-core/util` `createSvgIcon`.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@bento-core/util', () => {
  const React = require('react');
  return {
    createSvgIcon: (path, displayName) => {
      const Icon = (props) => (
        <svg data-mui-test={`${displayName}Icon`} {...props}>
          {path}
        </svg>
      );
      Icon.displayName = displayName;
      return Icon;
    },
  };
});

import SuccessOutlined from '../../src/utils/SuccessOutlined';

describe('SuccessOutlined', () => {
  describe('Rendering', () => {
    it('should render an svg icon with SuccessOutlined display name', () => {
      const { container } = render(<SuccessOutlined />);
      const svg = container.querySelector('svg[data-mui-test="SuccessOutlinedIcon"]');
      expect(svg).toBeInTheDocument();
      expect(svg.querySelector('path')).toBeInTheDocument();
    });
  });
});
