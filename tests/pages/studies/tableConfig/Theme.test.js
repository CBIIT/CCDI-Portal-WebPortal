import {
  themeConfig,
  tblHeader,
  extendedView,
  toolbar,
} from '../../../../src/pages/studies/tableConfig/Theme';

describe('studies table Theme config', () => {
  it('should expose expected theme sections', () => {
    expect(themeConfig).toEqual(
      expect.objectContaining({
        tblHeader: expect.any(Object),
        tblBody: expect.any(Object),
        tblContainer: expect.any(Object),
        tblPgn: expect.any(Object),
        extendedView: expect.any(Object),
        toolbar: expect.any(Object),
      }),
    );
  });

  it('should include header and pagination style keys used by the table', () => {
    expect(tblHeader.MuiTableCell.head.fontFamily).toBe('Open Sans');
    expect(extendedView.tblTopPgn.MuiTablePagination.toolbar.minHeight).toBe('40px');
    expect(toolbar.MuiToolbar.root.borderTop).toBe('1px solid #8A7F7C');
  });
});
