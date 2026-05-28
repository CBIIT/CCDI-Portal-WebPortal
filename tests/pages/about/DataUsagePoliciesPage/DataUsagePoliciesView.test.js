/**
 * Data Usage Policies page — presentational/interaction tests.
 *
 * @see src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesView.js
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataUsagePoliciesView from '../../../../src/pages/about/DataUsagePoliciesPage/DataUsagePoliciesView';
import {
  setupResourceViewDom,
  teardownResourceViewDom,
  clickSubtopicNav,
  triggerResourceScroll,
  triggerResourceScrollAbsolute,
  triggerResourceScrollToTop,
} from '../../resource/shared/resourceViewTestUtils';

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
    setupResourceViewDom();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1400,
    });
  });

  afterEach(() => {
    teardownResourceViewDom();
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

    const section = document.createElement('div');
    Object.defineProperty(section, 'offsetTop', { configurable: true, value: 300 });
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'Data_Use_Expectations') return section;
      return document.querySelector(`#${id}`) || null;
    });

    const navTarget = document.querySelector('.navTopicItem');
    fireEvent.click(navTarget);

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({
        top: 245,
        behavior: 'smooth',
      }),
    );
    document.getElementById.mockRestore();
  });

  it('should apply selected class when a subtopic nav item is clicked', () => {
    render(<DataUsagePoliciesView data={viewData} />);
    const subtopic = clickSubtopicNav('Data Disclaimers');
    expect(subtopic).toHaveClass('selected');
  });

  it('should scroll to top on mount', () => {
    render(<DataUsagePoliciesView data={viewData} />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should use sticky nav when page is scrolled past body top', () => {
    render(<DataUsagePoliciesView data={viewData} />);
    triggerResourceScroll('DataUsagePoliciesBody');
    expect(document.getElementById('leftNav')).toHaveClass('navListSticky');
  });

  it('should use absolute nav when footer is near the nav', () => {
    render(<DataUsagePoliciesView data={viewData} />);
    triggerResourceScrollAbsolute('DataUsagePoliciesBody', 50);
    expect(document.getElementById('leftNav')).toHaveClass('navListAbsolute');
  });

  it('should reset nav to static when scrolled back to top', () => {
    render(<DataUsagePoliciesView data={viewData} />);
    triggerResourceScroll('DataUsagePoliciesBody');
    triggerResourceScrollToTop('DataUsagePoliciesBody');
    expect(document.getElementById('leftNav')).toHaveClass('navList');
  });

  it('should pick tablet footer when viewport width is between 768 and 1204', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 900 });
    render(<DataUsagePoliciesView data={viewData} />);
    triggerResourceScroll('DataUsagePoliciesBody');
    expect(document.getElementById('leftNav')).toHaveClass('navListSticky');
  });

  it('should pick mobile footer when viewport width is 767 or below', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 500 });
    render(<DataUsagePoliciesView data={viewData} />);
    triggerResourceScroll('DataUsagePoliciesBody');
    expect(document.getElementById('leftNav')).toHaveClass('navListSticky');
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
