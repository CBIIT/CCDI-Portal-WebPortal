/**
 * Data Usage Policies page — presentational/interaction tests.
 *
 * @see src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesView.js
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataUsagePoliciesView from '../../../../src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesView';

const viewData = {
  Data_Usage_Policies_Header: '',
  dataUsagePoliciesIntroText: '<p>Policies intro content.</p>',
  dataUsagePoliciesContent: [
    {
      id: 'Data_Use_Expectations',
      topic: 'Data Use Expectations',
      content: '<p>Expectation content.</p>',
    },
    {
      id: 'Data_Disclaimers',
      subtopic: 'Data Disclaimers',
      content: '<p>Disclaimer content.</p>',
    },
  ],
};

describe('DataUsagePoliciesView', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('should render page header, nav topics, intro text, and content', () => {
    render(<DataUsagePoliciesView data={viewData} />);

    expect(
      screen.getByText('CCDI Data Usage Policies & Terms'),
    ).toBeInTheDocument();
    expect(screen.getByText('TOPICS')).toBeInTheDocument();
    expect(screen.getByText('Policies intro content.')).toBeInTheDocument();
    expect(screen.getAllByText('Data Use Expectations').length).toBeGreaterThan(0);
    expect(screen.getByText('Expectation content.')).toBeInTheDocument();
    expect(screen.getAllByText('Data Disclaimers').length).toBeGreaterThan(0);
  });

  it('should scroll to section when a nav topic is clicked', () => {
    render(<DataUsagePoliciesView data={viewData} />);

    const navTarget = document.querySelector('.navTopicItem');
    fireEvent.click(navTarget);

    expect(window.scrollTo).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({
        top: expect.any(Number),
        behavior: 'smooth',
      }),
    );
  });

  it('should toggle mobile section collapse class and display', () => {
    const { container } = render(<DataUsagePoliciesView data={viewData} />);

    const mobileTitle = container.querySelector('.mciTitleMobile');
    const section = container.querySelector('.mciSection');

    expect(section.style.display).toBe('');
    expect(mobileTitle).toHaveClass('sectionCollapse');

    fireEvent.click(mobileTitle);
    expect(section.style.display).toBe('block');
    expect(mobileTitle.className).toBe('mciTitleMobile');

    fireEvent.click(mobileTitle);
    expect(section.style.display).toBe('none');
    expect(mobileTitle.className).toBe('mciTitleMobile sectionCollapse');
  });
});
