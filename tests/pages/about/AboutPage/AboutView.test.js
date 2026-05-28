/**
 * About page — presentational view rendering.
 *
 * @see src/pages/about/AboutPage/AboutView.js
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutView from '../../../../src/pages/about/AboutPage/AboutView';

const aboutViewData = {
  About_Img: '',
  aboutData: {
    upperTitle: 'Childhood Cancer Data Initiative Hub',
    upperText: '<p>Upper paragraph content.</p>',
    lowerTitle: 'Childhood Cancer Data Initiative',
    lowerText: '<p>Lower paragraph content.</p>',
    aboutText: '<p>Contact paragraph content.</p>',
  },
};

describe('AboutView', () => {
  it('should render header, core content, and contact section', () => {
    render(<AboutView data={aboutViewData} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(
      screen.getByText('Childhood Cancer Data Initiative Hub'),
    ).toBeInTheDocument();
    expect(screen.getByText('Upper paragraph content.')).toBeInTheDocument();
    expect(
      screen.getAllByText('Childhood Cancer Data Initiative').length,
    ).toBeGreaterThan(0);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Contact paragraph content.')).toBeInTheDocument();
    expect(screen.getByAltText('about_img')).toBeInTheDocument();
  });

  it('should render shell even when aboutData is missing', () => {
    render(<AboutView data={{ About_Img: '' }} />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});
