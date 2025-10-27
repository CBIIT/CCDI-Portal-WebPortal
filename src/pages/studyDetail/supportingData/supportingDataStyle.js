export const styles = () => ({
    container: {
        display: 'contents',
    },
    dataContainer: {
        gridColumn: '1 / -1',
        padding: '40px 40px',
    },
    repositoryAccordion: {
        marginBottom: '20px',
        border: '1px solid #E0E0E0',
        borderRadius: '0 !important',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            marginBottom: '20px',
        },
    },
    accordionSummary: {
        width: '100%',
        background: '#f2fcff',
        borderTop: '3px solid #007EA8',
        borderBottom: '3px solid #007EA8',
        marginBottom: '-1px',
        '&.Mui-expanded': {
            minHeight: '56px !important',
        },
        '& .MuiAccordionSummary-content': {
            margin: '12px 0',
            alignItems: 'center',
            '&.Mui-expanded': {
                margin: '12px 0',
            },
        },
    },
    repositoryTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'Poppins',
        fontSize: '18px',
        fontWeight: 600,
        color: '#0E546E',
    },
    repositoryLabel: {
        color: '#666',
        fontWeight: 400,
        marginRight: '8px',
        fontSize: '14px',
    },
    externalLinkIcon: {
        width: '16px',
        height: '16px',
        marginLeft: '8px',
        cursor: 'pointer',
        color: '#0E546E',
    },
    accordionDetails: {
        padding: 0,
    },
    dataTable: {
        width: '100%',
        borderCollapse: 'collapse',
        '& thead > tr': {
            borderBottom: '1px solid #E0E0E0',
        },

        '& th': {
            padding: '16px',
            paddingLeft: '20px',
        },
        '& td': {
            borderBottom: '1px solid #E0E0E0',
            minWidth: '180px',
        },
        '& tr:nth-child(even)': {
            backgroundColor: '#FAFAFA',
        },
    },
    emptyState: {
        padding: '40px',
        textAlign: 'center',
        color: '#757575',
        fontFamily: 'Inter',
        fontSize: '16px',
        width: '100%',
    },
});

