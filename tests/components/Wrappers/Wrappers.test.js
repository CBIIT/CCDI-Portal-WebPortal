/**
 * Wrappers — themed Badge, Typography, and Button helpers.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Badge, Typography, Button } from '../../../src/components/Wrappers/Wrappers';

const theme = createTheme({
  palette: {
    primary: { main: '#1F4671', light: '#3A75BD' },
    secondary: { main: '#10A075' },
    text: { primary: '#313131' },
  },
  typography: {
    fontSize: 14,
    h6: { fontSize: '1rem' },
  },
  customShadows: {
    widget: '0 1px 3px rgba(0,0,0,0.2)',
    widgetWide: '0 4px 8px rgba(0,0,0,0.2)',
  },
});

function withTheme(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('Wrappers', () => {
  describe('Typography', () => {
    it('should apply color, weight, and size from theme', () => {
      withTheme(
        <Typography color="primary" weight="bold" size="lg">
          Stats label
        </Typography>,
      );
      const el = screen.getByText('Stats label');
      expect(el).toHaveStyle({ fontWeight: '600' });
    });

    it('should default to regular weight and base size', () => {
      withTheme(<Typography>Default text</Typography>);
      expect(screen.getByText('Default text')).toHaveStyle({ fontWeight: '400' });
    });

    it('should support light, medium, and all font size multipliers', () => {
      withTheme(
        <>
          <Typography weight="light" size="xs" data-testid="xs-text">
            XS
          </Typography>
          <Typography weight="medium" size="sm" data-testid="sm-text">
            SM
          </Typography>
          <Typography size="md" data-testid="md-text">
            MD
          </Typography>
          <Typography size="l" variant="h6" data-testid="l-text">
            L
          </Typography>
          <Typography size="xl" data-testid="xl-text">
            XL
          </Typography>
          <Typography size="xxl" data-testid="xxl-text">
            XXL
          </Typography>
        </>,
      );
      expect(screen.getByTestId('xs-text')).toHaveStyle({ fontWeight: '300' });
      expect(screen.getByTestId('sm-text')).toHaveStyle({ fontWeight: '500' });
      expect(screen.getByTestId('xl-text')).toHaveStyle({ fontSize: 'calc(14px * 1.7)' });
      expect(screen.getByTestId('xxl-text')).toHaveStyle({ fontSize: 'calc(14px * 2)' });
    });

    it('should apply custom font family when provided', () => {
      withTheme(
        <Typography family="Inter, sans-serif">
          Custom family
        </Typography>,
      );
      expect(screen.getByText('Custom family')).toHaveStyle({ fontFamily: 'Inter, sans-serif' });
    });
  });

  describe('Badge', () => {
    it('should render children with palette color', () => {
      withTheme(
        <Badge color="secondary" badgeContent={3}>
          <span>Inbox</span>
        </Badge>,
      );
      expect(screen.getByText('Inbox')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should accept colorBrightness for palette shade', () => {
      withTheme(
        <Badge color="primary" colorBrightness="light" badgeContent={1}>
          <span>Alerts</span>
        </Badge>,
      );
      expect(screen.getByText('Alerts')).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('should render contained button with bgColor', () => {
      withTheme(
        <Button variant="contained" color="primary" bgColor="secondary">
          Submit
        </Button>,
      );
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should apply select class when select prop is set', () => {
      withTheme(
        <Button select className="extra">
          Selected
        </Button>,
      );
      expect(screen.getByRole('button', { name: 'Selected' })).toHaveClass('extra');
    });

    it('should render outlined variant', () => {
      withTheme(
        <Button variant="outlined" color="primary">
          Cancel
        </Button>,
      );
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });
  });
});
