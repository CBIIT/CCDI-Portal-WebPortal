export const exportStyles = (props) =>({
    availableDownloadDropdownBtnIsOpen: {
        backgroundColor: '#2A6E93',
        borderTop: '1px solid #686868',
        borderRight: '1px solid #686868',
        borderLeft: '1px solid #686868',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '0px',
        width: '190px',
        height: '41px',
        padding: '2px 14px',
        borderBottomLeftRadius: '0px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#2A6E93',
          boxShadow: 'none',
        },
    
    },
    availableDownloadDropdownBtn: {
        backgroundColor: '#2A6E93',
        borderRadius: '5px',
        boxShadow: 'none',
        width: '190px',
        height: '41px',
        textWrap: 'nowrap',
        padding: '2px 14px',
        '&:hover': {
          backgroundColor: '#2A6E93',
          boxShadow: 'none',
        },
    },
      availableDownloadDropdownBtnLabel: {
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '12px',
        lineHeight: '13px',
        fontFamily: 'Poppins',
        textTransform: 'uppercase',
        whiteSpace: 'wrap',
        textAlign: 'left',
    },
    availableDownloadBtnContained: { 

    },
    availableDownloadDropdownBtnStartIcon: {
        margin: '0px',
    },
    dropdownMenuList: {
        paddingTop: '0px',
        paddingBottom: '0px',
        backgroundColor: '#EFF2F6',
        color: '#343434',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',
    },
    dropdownPaper: {
        maxWidth: '190px',
    },
    styledMenuItem: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '13px',
        textTransform: 'uppercase',
        height: '41px',
        padding: 0,
        borderRight: '1px solid #0C534C',
        borderBottom: '1px solid #0C534C',
        borderLeft: '1px solid #0C534C',
        '&:nth-child(even)': {
            backgroundColor: '#CCD5E1',
            borderRadius: '0px 0px 5px 5px',
        },
    },
})