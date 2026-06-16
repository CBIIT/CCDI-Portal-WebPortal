/**
 * About page — presentational view rendering.
 *
 * @see src/pages/about/AboutPage/AboutView.js
 */

jest.mock('../../../../src/pages/about/AboutPage/AboutMarkdown', () => (
  function MockAboutMarkdown({ children, linkVariant }) {
    return (
      <div data-testid={`about-markdown-${linkVariant || 'default'}`}>
        {children}
      </div>
    );
  }
));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutView from '../../../../src/pages/about/AboutPage/AboutView';

const aboutViewData = {
  About_Img: 'https://example.com/about.png',
  aboutData: {
    upperTitle: 'Childhood Cancer Data Initiative Hub',
    upperText: 'Upper paragraph content.',
    lowerTitle: 'Childhood Cancer Data Initiative',
    lowerText: 'Lower paragraph content.',
    aboutText: 'Contact paragraph content.',
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
    expect(screen.getByTestId('about-markdown-default')).toBeInTheDocument();
    expect(screen.getAllByTestId('about-markdown-aboutLink').length).toBe(2);
    expect(screen.getByTestId('about-markdown-aboutContactLink')).toBeInTheDocument();
  });

  it('should render shell even when aboutData is missing', () => {
    render(<AboutView data={{ About_Img: '' }} />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});
