export const tblHeader = {
  MuiTableCell: {
    head: {
      color: '#0F253A',
      position: 'relative',
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textDecoration: 'none',
    },
  },
  MuiTableSortLabel: {
    root: {
      color: '#0F253A',
      position: 'relative',
      fontSize: '15px',
      fontFamily: 'Open Sans',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textDecoration: 'none',
      '&:hover': {
        color: '#13344A',
      },
      '&:hover $svg': {
      },
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '1px solid #000000',
    },
  },
};

const tblBody = {
  MuiTableCell: {
    root: {
      minHeight: '45px',
      padding: '0px 5px 0px 20px',
      color: '#004C73',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 16px',
    },
    body: {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      color: '#24415C',
      '& p': {
        fontFamily: 'Open Sans',
        fontSize: '14px',
      },
      '&.file_name': {
        minWidth: '300px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.md5sum': {
        minWidth: '160px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.diagnosis': {
        minWidth: '250px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.anatomic_site': {
        minWidth: '250px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.file_type': {
        minWidth: '150px',
        '& p': {
          lineBreak: 'anywhere',
        },
      },
      '&.acl': {
        textAlign: 'center',
      },
    },
  },
}

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '50px',
        borderTop: '1px solid #8A7F7C',
      },
      caption: {
        fontFamily: 'Open Sans',
        fontSize: '12px',
      },
      select: {
        fontFamily: 'Open Sans',
        fontSize: '12px',
      },
      toolbar: {
        minHeight: '40px',
      }
    },
  },
};

export const toolbar = {
  MuiToolbar: {
    root: {
      borderTop: '2px solid #e7e5e5',
      '& div' :{
        fontFamily: 'Open Sans',
        fontSize: '14px',
      }
    },
    regular: {
      '@media (min-width: 600px)': {
        minHeight: '35px',
      },
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      paddingRight: '50px',
      borderTop: '3px solid #8A7F7C',
      borderBottom: '1px solid #8A7F7C',
      '&:last-child': {
        paddingRight: '50px',
      }
    },
    toolbar: {
      minHeight: '40px',
    },
    caption: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
    },
    select: {
      fontFamily: 'Open Sans',
      fontSize: '12px',
    },
  },
};

export const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    }
  },
  MuiTable: {
    root: {
      transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
      borderTop: '3px solid #8A7F7C',
    },
  },
};

export const themeConfig = {
  tblHeader,
  tblBody,
  tblContainer,
  tblPgn,
  extendedView,
  toolbar,
};
