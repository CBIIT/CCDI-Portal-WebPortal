/**
 * Unit tests for MCIJson2TsvResourceView.
 */

jest.mock('../../../../src/pages/resource/MCIJson2TsvResourcePage/MCIJson2TsvMarkdown', () => (
  function MockMCIJson2TsvMarkdown({ children }) {
    return <div data-testid="json2tsv-markdown">{children}</div>;
  }
));

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MCIJson2TsvResourceView from '../../../../src/pages/resource/MCIJson2TsvResourcePage/MCIJson2TsvResourceView';
import {
  clickTopicNav,
  triggerResourceScroll,
  toggleMobileSection,
} from '../shared/resourceViewTestUtils';

const viewData = {
  title: 'CCDI MCI JSON2TSV',
  headerImage: 'https://example.com/json2tsv-header.png',
  introText: 'JSON2TSV intro for unit test.',
  navTitles: ['Finding Section', 'CGC Resources'],
  mciJson2TsvContent: [
    {
      id: 'FINDING_SECTION',
      topic: 'Finding Section',
      content: 'Finding body content.',
    },
    {
      id: 'CGC_RESOURCES',
      topic: 'CGC Resources',
      content: 'CGC resources body.',
    },
  ],
};

function renderView(data = viewData) {
  return render(
    <MemoryRouter initialEntries={['/MCI_JSON2TSV']}>
      <MCIJson2TsvResourceView data={data} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  for (let i = 0; i < 3; i += 1) {
    document.body.appendChild(document.createElement('footer'));
  }
});

afterEach(() => {
  document.querySelectorAll('footer').forEach((el) => el.remove());
});

describe('MCIJson2TsvResourceView', () => {
  it('should render title, topics, intro, and CGC App link', () => {
    renderView();
    expect(screen.getByText('CCDI MCI JSON2TSV')).toBeInTheDocument();
    expect(screen.getByText('TOPICS')).toBeInTheDocument();
    expect(screen.getAllByText('Finding Section').length).toBeGreaterThan(0);
    expect(screen.getByText(/JSON2TSV intro for unit test/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CGC App/i })).toHaveAttribute(
      'href',
      'https://cgc.sbgenomics.com/u/rowan_letter_era/ccdi-mci-json2tsv-commit',
    );
  });

  it('should highlight topic and scroll when a nav item is clicked', () => {
    const scrollTo = jest.fn();
    window.scrollTo = scrollTo;
    renderView();

    const topic = clickTopicNav('CGC Resources');
    expect(topic).toHaveClass('selected');
    expect(scrollTo).toHaveBeenCalled();
  });

  it('should apply sticky nav class when page is scrolled', () => {
    renderView();
    triggerResourceScroll('MCIJson2TsvBody');
    expect(document.getElementById('leftNav').className).toContain('navListSticky');
  });

  it('should toggle mobile section visibility', () => {
    renderView();
    const mobileHeader = toggleMobileSection();
    expect(mobileHeader.className).not.toContain('sectionCollapse');
  });
});
