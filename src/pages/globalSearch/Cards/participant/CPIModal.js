import React, { useState, useEffect } from 'react';
import {
  Box,
  createTheme,
  Modal,
  Typography,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from '@material-ui/core';
// import CustomTableBody from '../../body/CustomTblBody';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './ModalStyle';
// import TableHeader from '../../header/CustomTblHeader';
import HeaderCell from './CustomCell';
import defaultTheme from './DefaultThemConfig';

const CustomTableContainer = (props) => {
  const { children, themeConfig, className } = props;
  const tableStyle = {
    height: '480px',
    overflowX: 'hidden',
  };
  return (
    <ThemeProvider theme={themeConfig}>
      <TableContainer className={className} id="tableContainer" component={Paper} style={tableStyle}>
        {children}
      </TableContainer>
    </ThemeProvider>
  );
};

const CPIModal = ({
  open,
  onClose,
  row,
}) => {
  const [sortBy, setSortBy] = useState('associated_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState(row.cpi_data);
  const themeConfig = createTheme(defaultTheme);

  useEffect(() => {
    setData(row.cpi_data);
  }, [row]);


  const sortingData = (column, newOrder) => {
    const sortedData = data.sort((a, b) => a[column].localeCompare(b[column]));

    if (newOrder === 'desc') {
      return sortedData.reverse();
    }
    return sortedData;
  };

  const handleSortByColumn = (column, order) => {
    const newOrder = (order === 'asc' && sortBy === column) ? 'desc' : 'asc';
    const newData = sortingData(column, newOrder);
    setData(newData);
    setSortBy(column);
    setSortOrder(newOrder);
  };

  const modalBody = {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '840px',
    height: '671px',
    background: '#FFFFFF',
    border: '1px solid #505050',
    borderRadius: '40px',
    overflow: 'hidden',
  };

  const header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
  };

  const cell = {
    paddingLeft: '3px',
    paddingRight: '5px',
  };

  const cellLast = {
    paddingLeft: '3px',
    paddingRight: '10px',
    wordBreak: 'break-word',
  };

  const footer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '55px',
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    padding: '40px',
    paddingLeft: '35px',
    paddingRight: '20px',
    borderTop: '1px solid #505050',
  };

  const link = {
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '700',
    position: 'relative',
    top: '11.5px',
    right: '39px',
  };

  const modalTitle = {
    fontFamily: 'Poppins',
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    color: '#000000',
  };

  const closeButton = {
    marginLeft: '769px',
    position: 'absolute',
    backgroundColor: 'transparent',
  };

  const countContainer = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    borderTop: '3px solid #939393',
    borderBottom: '3px solid #939393',
    height: '51px',
    paddingLeft: '16px',
  };

  const tableContainer = {
    '&::-webkit-scrollbar': {
      width: '6px',
      borderWidth: '0px 1px 1px 1px',
      borderStyle: 'solid',
      borderColor: '#B0B0B0',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#CECECE',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#003F74',
    },
  };

  const participantId = row.participant_id;
  const displayColumns = [
    {
      dataField: 'associated_id',
      header: 'Participant ID',
      tooltipText: 'sort',
    },
    {
      dataField: 'repository_of_synonym_id',
      header: 'Name',
      tooltipText: 'sort',
    },
    {
      dataField: 'domain_description',
      header: 'Description',
      tooltipText: 'sort',
    },
    {
      dataField: 'domain_category',
      header: 'Category',
      tooltipText: 'sort',
    },
    {
      dataField: 'data_location',
      header: 'Location',
      tooltipText: 'sort',
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${row.id}-modal`}
    >
      <Box style={modalBody}>
        <div className="header" style={header}>
          <Typography id="modal-modal-title" className="modalTitle" style={modalTitle}>
            {`Participant ID ${participantId} : CPI Mappings`}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="closeButton"
            style={closeButton}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="container" style={countContainer}>
          {`${data.length} mapped identifiers`}
        </div>
        <CustomTableContainer
          style={tableContainer}
          themeConfig={themeConfig}
        >
          <Table>
            <TableHead>
              <TableRow>
                {
                  displayColumns.map((column) => (
                    <HeaderCell
                      column={column}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      toggleSort={() => handleSortByColumn(column.dataField, sortOrder)}
                      style={{ paddingLeft: '3px', paddingRight: '3px', fontWeight: '700' }}
                    />
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody style={{ borderBottom: '3px solid rgb(147, 147, 147)' }}>
              {
                data.map((currRow) => (
                  <TableRow>
                    {
                      displayColumns.map((column) => (
                        (
                          column.dataField !== 'data_location'
                            ? <TableCell style={cell}>{currRow[column.dataField]}</TableCell>
                            : <TableCell style={cellLast}><a href={currRow[column.dataField]} target="_blank" rel="noopener noreferrer">{currRow[column.dataField]}</a></TableCell>
                        )
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CustomTableContainer>
        <div className="footer" style={footer}>
          All CPI mappings for a given study can be found in the "synonyms"
          tab of the downloadable manifest,
          available under the "Studies" tab in the Explore Dashboard.
          For more information about CPI, click&nbsp;
          <a style={link} href="https://participantindex-docs.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">here</a>
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
