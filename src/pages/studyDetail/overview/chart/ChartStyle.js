// Style definitions for chart component
const styles = {
  chartContainerModal: {
    width: '100%',
    minWidth: '900px',
    height: '550px',
    minHeight: '400px',
    margin: '25px 0 15px',
  },
  chartContainer: {
    width: '100%',
    minWidth: '500px',
    height: '400px',
    minHeight: '400px',
    margin: '25px 0 15px',
  },
  legendList: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#555',
    padding: '0 5px',
    backgroundColor: 'transparent',
  },
  legendItemAlt: {
    backgroundColor: '#f0f0f0',
  },
  legendItemHovered: {
    boxShadow: '2px 2px 4px #ccc',
    position: 'relative',
  },
  legendColorBox: {
    width: '12px',
    height: '12px',
    borderRadius: '2px',
    marginRight: '8px',
    display: 'inline-block',
  },
  legendItemLabel: {
    maxWidth: '300px',
  },
  tooltip: {
    background: '#fff',
    border: '1px solid #CCCCCC',
    padding: '8px',
    color: '#000',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    fontSize: '12px',
  },
  tooltipLabel: {
    fontWeight: '400',
  },
  tooltipValue: {
    fontWeight: '700',
  },
};

export default styles;
