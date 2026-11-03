import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LegacyC3dcUserGuideRedirect, {
  C3DC_USER_GUIDE_URL,
  LEGACY_CCDI_USAGE_INSTRUCTIONS_PDF_PATH,
} from '../../../src/pages/redirects/legacyC3dcUserGuideRedirect';

describe('LegacyC3dcUserGuideRedirect', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = { ...originalLocation, replace: jest.fn() };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('exposes the legacy PDF path and live C3DC user-guide URL', () => {
    expect(LEGACY_CCDI_USAGE_INSTRUCTIONS_PDF_PATH).toBe(
      '/static/media/CCDI_Usage_Instructions_Nov2024_v2.5.0.69ea3cd5.pdf',
    );
    expect(C3DC_USER_GUIDE_URL).toBe('https://clinicalcommons.ccdi.cancer.gov/user-guide');
  });

  it('redirects to the current C3DC user guide without serving a PDF', () => {
    const { container } = render(<LegacyC3dcUserGuideRedirect />);

    expect(window.location.replace).toHaveBeenCalledWith(C3DC_USER_GUIDE_URL);
    expect(container).toBeEmptyDOMElement();
  });
});
