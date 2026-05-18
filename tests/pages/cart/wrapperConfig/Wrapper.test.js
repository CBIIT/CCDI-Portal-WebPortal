/**
 * Cart `wrapperConfig` — paginated-table layout sections for MY FILES.
 */

jest.mock('../../../../src/bento/fileCentricCartWorkflowData', () => ({
  myFilesPageData: {
    headerIconSrc: '/cart-icon.svg',
    headerIconAlt: 'Cart',
    textareaPlaceholder: 'Add manifest comments',
  },
  tooltipContent: { myFiles: 'Download manifest tooltip' },
}));

import { types, btnTypes } from '@bento-core/paginated-table';
import { wrapperConfig } from '../../../../src/pages/cart/wrapperConfig/Wrapper';
import { tooltipContent } from '../../../../src/bento/fileCentricCartWorkflowData';

describe('cart wrapperConfig', () => {
  it('should define outer layout, header actions, table, and footer sections', () => {
    expect(wrapperConfig).toHaveLength(4);

    const [outerLayout, headerButtons, tableSection, footer] = wrapperConfig;

    expect(outerLayout).toMatchObject({
      container: 'outer_layout',
      clsName: 'container_outer_layout',
    });
    expect(outerLayout.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: types.ICON, clsName: 'cart_icon' }),
        expect.objectContaining({ type: types.TEXT, text: 'Cart >' }),
        expect.objectContaining({ type: types.TEXT, text: 'Selected Files' }),
      ]),
    );

    expect(headerButtons).toMatchObject({
      container: 'buttons',
      clsName: 'container_header',
    });
    expect(headerButtons.items[0]).toMatchObject({
      title: 'DOWNLOAD MANIFEST',
      type: types.BUTTON,
      role: btnTypes.DOWNLOAD_MANIFEST,
      btnType: btnTypes.DOWNLOAD_MANIFEST,
      tooltipCofig: tooltipContent,
    });

    expect(tableSection).toEqual({ container: 'paginatedTable', paginatedTable: true });

    expect(footer).toMatchObject({
      container: 'buttons',
      clsName: 'container_footer',
    });
    expect(footer.items[0]).toMatchObject({
      clsName: 'manifest_comments',
      type: types.TEXT_INPUT,
    });
  });
});
