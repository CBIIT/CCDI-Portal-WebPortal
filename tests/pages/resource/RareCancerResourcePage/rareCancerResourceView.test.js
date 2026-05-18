/**
 * Unit tests for RareCancerResourceView (`resourceData.yaml` — rare cancer fields as static props).
 *
 * Structure follows tests/TEST_STRUCTURE.md:
 * Rendering → feature sections → Side effects → Edge cases.
 * Fixtures: tests/fixtures/resource/resourceDataViewProps.js (no network).
 */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  clickTopicNav,
  clickSubtopicNav,
  triggerResourceScroll,
  triggerResourceScrollAbsolute,
  triggerResourceScrollToTop,
  toggleMobileSection,
} from '../shared/resourceViewTestUtils';
import '@testing-library/jest-dom';
import RareCancerResourceView from '../../../../src/pages/resource/RareCancerResourcePage/RareCancerResourceView';
import { minimalRareCancerResourceData } from '../../../fixtures/resource/resourceDataViewProps';
import {
  multiTopicRareCancerData,
  rareCancerWithDownloadData,
  rareCancerCrossOriginDownloadData,
} from '../../../fixtures/resource/resourceInteractionData';

function renderRareCancerView(data = minimalRareCancerResourceData, initialEntries = ['/explore']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <RareCancerResourceView data={data} />
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
  jest.restoreAllMocks();
});

describe('RareCancerResourceView', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderRareCancerView();
      expect(container).toBeInTheDocument();
    });

    it('should render with default fixture data', () => {
      renderRareCancerView();
      expect(
        screen.getByText(/Pediatric, Adolescent, and Young Adult Rare Cancer Study/i),
      ).toBeInTheDocument();
      expect(screen.getByText('TOPICS')).toBeInTheDocument();
    });

    it('should render RCI data flow image with custom URL when provided', () => {
      renderRareCancerView(rareCancerWithDownloadData);
      const img = screen.getByAltText('RCI data flow');
      expect(img).toHaveAttribute('src', 'https://example.com/custom-rci-flow-chart.png');
    });
  });

  describe('Navigation and links', () => {
    it('should link Home to root (breadcrumb is display:none; query with hidden: true)', () => {
      renderRareCancerView();
      expect(screen.getByRole('link', { name: /Home/i, hidden: true })).toHaveAttribute('href', '/');
    });
  });

  describe('Topics and body content', () => {
    it('should show topic nav, intro, and subsection from rareCancerContent', () => {
      renderRareCancerView();
      expect(screen.getAllByText('Rare Cancer Topic').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Rare Subsection').length).toBeGreaterThan(0);
      expect(screen.getByText(/Rare cancer intro for unit test/i)).toBeInTheDocument();
      expect(screen.getByText(/Rare cancer subsection body/i)).toBeInTheDocument();
    });
  });

  describe('Contact form download', () => {
    it('should trigger same-origin download when contact link is clicked', () => {
      renderRareCancerView(rareCancerWithDownloadData);
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      const removeChildSpy = jest.spyOn(document.body, 'removeChild');

      fireEvent.click(screen.getByText('Download contact form'));

      expect(appendChildSpy).toHaveBeenCalled();
      const appendedLink = appendChildSpy.mock.calls.find(
        ([node]) => node && node.tagName === 'A',
      );
      expect(appendedLink).toBeDefined();
      expect(appendedLink[0].download).toBe('rare-cancer-contact.pdf');
      expect(removeChildSpy).toHaveBeenCalled();
    });

    it('should download cross-origin PDF via fetch when request succeeds', async () => {
      const blob = new Blob(['pdf-bytes'], { type: 'application/pdf' });
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        blob: () => Promise.resolve(blob),
      });
      URL.createObjectURL = jest.fn(() => 'blob:mock-url');
      URL.revokeObjectURL = jest.fn();

      renderRareCancerView(rareCancerCrossOriginDownloadData);
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');

      fireEvent.click(screen.getByText('Download contact form'));

      await act(async () => {
        await Promise.resolve();
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://cdn.example.com/rare-cancer-contact.pdf',
        { mode: 'cors' },
      );
      expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
      expect(appendChildSpy).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('should treat malformed download URL as same-origin fallback', () => {
      const malformedDownloadData = {
        ...rareCancerWithDownloadData,
        RCI_DOWNLOAD_CONFIG: { url: 'http://', filename: 'bad.pdf' },
      };
      renderRareCancerView(malformedDownloadData);
      const appendChildSpy = jest.spyOn(document.body, 'appendChild');

      fireEvent.click(screen.getByText('Download contact form'));

      expect(appendChildSpy).toHaveBeenCalled();
    });

    it('should open PDF in new tab when cross-origin fetch fails', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      global.fetch = jest.fn().mockRejectedValue(new Error('network'));
      window.open = jest.fn();

      renderRareCancerView(rareCancerCrossOriginDownloadData);

      fireEvent.click(screen.getByText('Section download'));

      await act(async () => {
        await Promise.resolve();
      });

      expect(window.open).toHaveBeenCalledWith(
        'https://cdn.example.com/rare-cancer-contact.pdf',
        '_blank',
      );
      consoleError.mockRestore();
    });
  });

  describe('Side effects', () => {
    it('should call window.scrollTo when there is no location hash', () => {
      const scrollToMock = jest.fn();
      window.scrollTo = scrollToMock;
      renderRareCancerView();
      expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    });

    it('should scroll to hash anchor and select nav when hash matches section id', () => {
      jest.useFakeTimers();
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;

      renderRareCancerView(multiTopicRareCancerData, ['/rare#RC_SECTION']);

      const anchor = document.getElementById('RC_SECTION');
      Object.defineProperty(anchor, 'offsetTop', { configurable: true, value: 800 });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ top: 745, behavior: 'smooth' }),
      );
      expect(document.querySelector('.navTopicItem.selected[name="RC_SECTION"]')).toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Navigation interactions', () => {
    it('should highlight topic when nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderRareCancerView(multiTopicRareCancerData);
      const topic = clickTopicNav('Rare Topic B');
      expect(topic).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalled();
    });

    it('should scroll when a subtopic nav item is clicked', () => {
      const scrollTo = jest.fn();
      window.scrollTo = scrollTo;
      renderRareCancerView(multiTopicRareCancerData);
      const subtopic = clickSubtopicNav('Rare Sub B');
      expect(subtopic).toHaveClass('selected');
      expect(scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'smooth' }),
      );
    });

    it('should apply sticky nav on scroll', () => {
      renderRareCancerView(multiTopicRareCancerData);
      triggerResourceScroll('MCIBody');
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });

    it('should apply absolute nav when footer is near viewport top', () => {
      renderRareCancerView(multiTopicRareCancerData);
      triggerResourceScrollAbsolute('MCIBody', 50);
      expect(document.getElementById('leftNav').className).toContain('navListAbsolute');
    });

    it('should reset nav to static when scrolled back to top', () => {
      renderRareCancerView(multiTopicRareCancerData);
      triggerResourceScroll('MCIBody');
      triggerResourceScrollToTop('MCIBody');
      expect(document.getElementById('leftNav').className).toBe('navList');
    });

    it('should use first footer index on desktop width during scroll', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1300,
      });

      renderRareCancerView(multiTopicRareCancerData);

      const body = document.getElementById('MCIBody');
      Object.defineProperty(body, 'offsetTop', { configurable: true, value: 0 });
      const firstFooter = document.getElementsByTagName('footer')[0];
      const rectSpy = jest.spyOn(firstFooter, 'getBoundingClientRect').mockReturnValue({ top: 2000 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        writable: true,
        value: 200,
      });
      fireEvent.scroll(document);

      expect(rectSpy).toHaveBeenCalled();
    });

    it('should use last footer index on mobile width during scroll', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderRareCancerView(multiTopicRareCancerData);

      const body = document.getElementById('MCIBody');
      Object.defineProperty(body, 'offsetTop', { configurable: true, value: 0 });
      const lastFooter = document.getElementsByTagName('footer')[2];
      const rectSpy = jest.spyOn(lastFooter, 'getBoundingClientRect').mockReturnValue({ top: 2000 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        writable: true,
        value: 200,
      });
      fireEvent.scroll(document);

      expect(rectSpy).toHaveBeenCalled();
    });

    it('should use middle footer index on tablet width during scroll', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900,
      });

      renderRareCancerView(multiTopicRareCancerData);

      const body = document.getElementById('MCIBody');
      Object.defineProperty(body, 'offsetTop', { configurable: true, value: 0 });
      const middleFooter = document.getElementsByTagName('footer')[1];
      const rectSpy = jest.spyOn(middleFooter, 'getBoundingClientRect').mockReturnValue({ top: 2000 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        configurable: true,
        writable: true,
        value: 200,
      });
      fireEvent.scroll(document);

      expect(rectSpy).toHaveBeenCalled();
      expect(document.getElementById('leftNav').className).toContain('navListSticky');
    });

    it('should toggle mobile section expand and collapse', () => {
      renderRareCancerView(multiTopicRareCancerData);
      const mobileHeader = document.querySelector('.mciTitleMobile');

      fireEvent.click(mobileHeader);
      expect(mobileHeader.className).not.toContain('sectionCollapse');

      fireEvent.click(mobileHeader);
      expect(mobileHeader.className).toContain('sectionCollapse');
    });

    it('should expand mobile section via toggleMobileSection helper', () => {
      renderRareCancerView(multiTopicRareCancerData);
      const mobileHeader = toggleMobileSection();
      expect(mobileHeader.className).not.toContain('sectionCollapse');
    });
  });

  describe('Edge cases', () => {
    it('should render when rareCancerContent is missing without throwing', () => {
      expect(() =>
        renderRareCancerView({ rareCancerIntroText: '<p>Intro only.</p>' }),
      ).not.toThrow();
      expect(screen.getByText(/Intro only/i)).toBeInTheDocument();
    });
  });
});
