// Style definitions for Modal component
const styles = {
  root: {
    textAlign: 'center',
  },
  openButton: {
    textTransform: 'none',
    color: '#455299',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '22px',
    textDecoration: 'underline',
    background: 'none',
    padding: '0px',
    minWidth: 'auto',
    paddingLeft: '3rem',
    '&:hover': {
        backgroundColor: 'transparent',
      },
  },
  openButtonIcon:{
    fontSize: '27px !important'
  },
  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    outline: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    minWidth: '900px',
    minWeight: '550px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '16px',
    paddingBottom: '8px',
    marginBottom: '16px',
  },
  modalTitle: {
    margin: '0px',
    fontSize: '19px',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  titleSpan: {
    fontWeight: '700',
  },
  closeButton: {
    minWidth: '0px',
    padding: '4px',
  },
  modalBody: {
    padding: '16px',
    paddingTop: '0px',
  },
};

export default styles;
