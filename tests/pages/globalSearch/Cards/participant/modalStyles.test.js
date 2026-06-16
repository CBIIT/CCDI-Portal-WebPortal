/**
 * Global Search **CPI modal** style fixtures — `DefaultThemConfig` and `ModalStyle`.
 *
 * These modules are pure data exports consumed by `CPIModal`. We assert their
 * shape so that `withStyles` / `createTheme` continue to receive valid input.
 *
 * @see src/pages/globalSearch/Cards/participant/DefaultThemConfig.js
 * @see src/pages/globalSearch/Cards/participant/ModalStyle.js
 */

import defaultTheme from '../../../../../src/pages/globalSearch/Cards/participant/DefaultThemConfig';
import modalStyles from '../../../../../src/pages/globalSearch/Cards/participant/ModalStyle';

describe('DefaultThemConfig', () => {
  it('should expose Material-UI overrides keyed by component name', () => {
    expect(defaultTheme).toBeDefined();
    expect(defaultTheme.overrides).toEqual(expect.any(Object));
    expect(defaultTheme.overrides).toEqual(
      expect.objectContaining({
        MuiTableRow: expect.any(Object),
        MuiTableHead: expect.any(Object),
        MuiTableCell: expect.any(Object),
        MuiLink: expect.any(Object),
        MuiCheckbox: expect.any(Object),
        MuiButtonBase: expect.any(Object),
        MuiSvgIcon: expect.any(Object),
      }),
    );
  });

  it('should style the table row head and zebra striping', () => {
    const { MuiTableRow } = defaultTheme.overrides;
    expect(MuiTableRow.head.height).toBe('40px');
    expect(MuiTableRow.root['&:nth-child(even)']).toEqual(
      expect.objectContaining({ background: expect.any(String) }),
    );
  });

  it('should style table cells with shared padding tokens', () => {
    const { MuiTableCell } = defaultTheme.overrides;
    expect(MuiTableCell.root.padding).toBe('0px 5px 0px 20px');
    expect(MuiTableCell.body.color).toBe('#004C73');
  });
});

describe('ModalStyle', () => {
  it('should be a factory returning the modal style sheet object', () => {
    expect(typeof modalStyles).toBe('function');
    const styles = modalStyles();
    expect(styles).toEqual(
      expect.objectContaining({
        header: expect.any(Object),
        modalBody: expect.any(Object),
        searchContainer: expect.any(Object),
        sortGroup: expect.any(Object),
        itemContainer: expect.any(Object),
      }),
    );
  });

  it('should produce identical output across invocations (stable shape)', () => {
    expect(modalStyles()).toEqual(modalStyles());
  });

  it('should style the modal body with absolute positioning and width', () => {
    const styles = modalStyles();
    expect(styles.modalBody.position).toBe('absolute');
    expect(styles.modalBody.width).toBe('840px');
  });
});
