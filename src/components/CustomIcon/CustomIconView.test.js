import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomIcon from './CustomIconView';

describe('CustomIcon Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <CustomIcon imgSrc="test-icon.svg" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render an img element with the provided imgSrc', () => {
      const testSrc = '/path/to/test-icon.svg';
      render(<CustomIcon imgSrc={testSrc} />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', testSrc);
    });

    it('should render with default alt text when imgAlt is not provided', () => {
      render(<CustomIcon imgSrc="test-icon.svg" />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toBeInTheDocument();
    });

    it('should render with custom alt text when imgAlt is provided', () => {
      const customAlt = 'Custom icon description';
      render(<CustomIcon imgSrc="test-icon.svg" imgAlt={customAlt} />);
      
      const img = screen.getByAltText(customAlt);
      expect(img).toBeInTheDocument();
    });
  });

  describe('Material-UI Icon Wrapper', () => {
    it('should render the image inside a Material-UI Icon component', () => {
      const { container } = render(
        <CustomIcon imgSrc="test-icon.svg" />
      );
      
      // Material-UI Icon component renders as a span with specific class
      const iconWrapper = container.querySelector('span[class*="MuiIcon"]');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply custom styles to the image', () => {
      render(<CustomIcon imgSrc="test-icon.svg" />);
      
      const img = screen.getByAltText('Logo alt text');
      // Check if the image has a class attribute (styled by withStyles)
      expect(img).toHaveAttribute('class');
      expect(img.className).toContain('Logo-root');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty imgSrc string', () => {
      render(<CustomIcon imgSrc="" />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '');
    });

    it('should handle special characters in imgSrc', () => {
      const specialSrc = '/path/to/icon with spaces & special-chars.svg';
      render(<CustomIcon imgSrc={specialSrc} />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toHaveAttribute('src', specialSrc);
    });

    it('should handle special characters in imgAlt', () => {
      const specialAlt = 'Icon with & special < characters >';
      render(<CustomIcon imgSrc="test.svg" imgAlt={specialAlt} />);
      
      const img = screen.getByAltText(specialAlt);
      expect(img).toHaveAttribute('alt', specialAlt);
    });

    it('should handle very long imgAlt text', () => {
      const longAlt = 'This is a very long alt text that describes the icon in great detail with many words and characters to test how the component handles lengthy descriptions';
      render(<CustomIcon imgSrc="test.svg" imgAlt={longAlt} />);
      
      const img = screen.getByAltText(longAlt);
      expect(img).toHaveAttribute('alt', longAlt);
    });
  });

  describe('Different Image Sources', () => {
    it('should handle absolute URLs', () => {
      const absoluteUrl = 'https://example.com/icon.svg';
      render(<CustomIcon imgSrc={absoluteUrl} />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toHaveAttribute('src', absoluteUrl);
    });

    it('should handle relative paths', () => {
      const relativePath = './assets/icons/icon.svg';
      render(<CustomIcon imgSrc={relativePath} />);
      
      const img = screen.getByAltText('Logo alt text');
      expect(img).toHaveAttribute('src', relativePath);
    });

    it('should handle different image formats', () => {
      const formats = ['icon.svg', 'icon.png', 'icon.jpg', 'icon.webp'];
      
      formats.forEach((format) => {
        const { unmount } = render(<CustomIcon imgSrc={format} />);
        const img = screen.getByAltText('Logo alt text');
        expect(img).toHaveAttribute('src', format);
        unmount();
      });
    });
  });
});

