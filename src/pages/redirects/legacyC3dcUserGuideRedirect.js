import { useEffect } from 'react';

/** Legacy Hub PDF path that previously served CCDI usage instructions. */
export const LEGACY_CCDI_USAGE_INSTRUCTIONS_PDF_PATH =
  '/static/media/CCDI_Usage_Instructions_Nov2024_v2.5.0.69ea3cd5.pdf';

/** Current C3DC user guide (stable path; not tied to a specific PDF version). */
export const C3DC_USER_GUIDE_URL = 'https://clinicalcommons.ccdi.cancer.gov/user-guide';

/**
 * Redirects bookmarks of the retired Hub usage-instructions PDF to the live C3DC user guide.
 * No PDF is served; the legacy path is only a routing alias.
 */
const LegacyC3dcUserGuideRedirect = () => {
  useEffect(() => {
    window.location.replace(C3DC_USER_GUIDE_URL);
  }, []);

  return null;
};

export default LegacyC3dcUserGuideRedirect;
