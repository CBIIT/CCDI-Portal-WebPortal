/**
 * Cart **`LinkButton`** — external user guide PDF link.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LinkButton from '../../../../../src/pages/cart/customComponent/userGuideButton/linkButton';

const theme = createMuiTheme();

describe('cart LinkButton', () => {
  it('should render a user guide link that opens the PDF in a new tab', () => {
    render(
      <ThemeProvider theme={theme}>
        <LinkButton />
      </ThemeProvider>,
    );

    const link = screen.getByRole('link', { name: 'User Guide' });
    expect(link).toHaveAttribute('href', '/user-guide.pdf');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('button', { name: 'User Guide' })).toBeInTheDocument();
  });
});
