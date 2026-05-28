/**
 * Cart user guide link — MUI `linkStyles` theme overrides.
 */

import { linkStyles } from '../../../../../src/pages/cart/customComponent/userGuideButton/linkStyles';

describe('linkStyles', () => {
  it('should define link button styles with hover state', () => {
    const styles = linkStyles({});

    expect(styles.linkBtn).toEqual(
      expect.objectContaining({
        backgroundColor: '#536D70',
        width: '174px',
        height: '41px',
        boxShadow: 'none',
      }),
    );
    expect(styles.linkBtn['&:hover']).toEqual(
      expect.objectContaining({
        backgroundColor: '#2E4E51',
        boxShadow: 'none',
      }),
    );
  });
});
