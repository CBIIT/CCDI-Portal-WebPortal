export default () => ({
  backgroundContainer: {
    background: '#E7EEF5',
    paddingTop: '70px',
    paddingBottom: '80px',
  },
  myFilesWrapper: {
    position: 'relative',
    border: '#4555AB 4px solid',
    borderRadius: '35px',
    marginLeft: '3%',
    marginRight: '3%',
    paddingBottom: '82px',
    background: 'white',
    paddingRight: '3%',
    paddingLeft: '3%',
  },
  textContainer: {
    position: 'absolute',
    top: '90px',
    left: '70px',
    width: '520px',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    color: '#000000',
    zIndex: '2',
    '& a': {
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#004C73',
    },
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
});
