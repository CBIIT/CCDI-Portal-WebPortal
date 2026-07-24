import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
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
  Tooltip,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useApolloClient } from '@apollo/client';
import styles from './ModalStyle';
import HeaderCell from './CustomCell';
import defaultTheme from './DefaultThemConfig';
import questionIcon from '../../assets/Question_Icon.svg';
import downloadIcon from '../../assets/download.svg';
import { fetchParticipantCpiData, openC3dcExplore } from './c3dcService';

const useStyles = makeStyles(() => ({
  questionIcon: {
    width: '10px',
    height: '10px',
    position: 'absolute',
    top: '3px',
    right: '-12px',
    cursor: 'pointer',
    zIndex: 1,
  },
  tooltipContent: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontStyle: 'Regular',
    fontSize: '13px',
    lineHeight: '17.5px',
    letterSpacing: '-0.01em',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: '0.5px solid #000000',
    borderRadius: '4px',
    padding: '12px',
    maxWidth: '400px',
  },
  customTooltip: {
    backgroundColor: '#FFFFFF !important',
    color: '#000000 !important',
    border: '0.5px solid #000000 !important',
    borderRadius: '4px !important',
    padding: '0 !important',
    boxShadow: 'none !important',
    '& .MuiTooltip-arrow': {
      color: '#000000 !important',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '450px',
  },
  errorText: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#B00020',
    padding: '16px',
    textAlign: 'center',
  },
}));

const CustomTableContainer = (props) => {
  const { children, themeConfig, className } = props;
  const tableStyle = {
    height: '450px',
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
  const classes = useStyles();
  const client = useApolloClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const themeConfig = createTheme(defaultTheme);

  const participantId = row.participant_id;
  const studyId = row.study_id;

  useEffect(() => {
    let cancelled = false;

    const loadCpiData = async () => {
      if (!open) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const cpiRows = await fetchParticipantCpiData(client, {
          participantId,
          studyId,
        });
        if (!cancelled) {
          setData(Array.isArray(cpiRows) ? cpiRows : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Unable to load CPI mappings from Clinical Commons.');
          // Fall back to Hub search payload if C3DC request fails.
          setData(Array.isArray(row.cpi_data) ? row.cpi_data : []);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadCpiData();

    return () => {
      cancelled = true;
    };
  }, [open, client, participantId, studyId, row.cpi_data]);

  const handleDownloadCSV = () => {
    const csvColumnOrder = displayColumns;
    const csvData = data.map((dataRow) => csvColumnOrder.map((column) => {
      const value = dataRow[column.dataField];
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    }));

    const headers = csvColumnOrder.map((column) => column.header).join(',');
    const csvContent = [
      headers,
      ...csvData.map((csvRow) => csvRow.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `alternative_identifiers_${participantId}_${studyId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    gap: '20px',
  };

  const downloadAltIdsButton = {
    width: '189px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#5A7C84',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
  };

  const viewInExploreButton = {
    width: '189px',
    height: '41px',
    borderRadius: '5px',
    backgroundColor: '#2A5C75',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: '12px',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
  };

  const modalBody = {
    position: 'absolute',
    top: '5%',
    left: '25%',
    width: '880px',
    height: '671px',
    background: '#FFFFFF',
    border: '1px solid #505050',
    borderRadius: '40px',
    overflow: 'visible',
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
    height: '50px',
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '400',
    padding: '0 25px',
    borderTop: '1px solid #505050',
    textAlign: 'center',
    lineHeight: '30px',
  };

  const link = {
    color: '#7D267E',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '700',
    textDecoration: 'underline',
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
    borderTop: '3px solid #939939',
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

  const displayColumns = [
    {
      dataField: 'associated_id',
      header: 'Participant ID',
      tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'repository_of_synonym_id',
      header: 'Name',
      tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'domain_description',
      header: 'Description',
      tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'domain_category',
      header: 'Category',
      tooltipText: 'sort',
      sortable: false,
    },
    {
      dataField: 'data_location',
      header: 'Location',
      tooltipText: 'sort',
      sortable: false,
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
            {`Alternative Identifiers for Participant ${participantId} in ${studyId}`}
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
          {loading ? 'Loading mapped identifiers…' : `${data.length} mapped identifiers`}
        </div>
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
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
                        key={column.dataField}
                        column={column}
                        style={{ paddingLeft: '3px', paddingRight: '3px', fontWeight: '700' }}
                      />
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody style={{ borderBottom: '3px solid rgb(147, 147, 147)' }}>
                {
                  data.map((currRow) => (
                    <TableRow key={`${currRow.associated_id}-${currRow.repository_of_synonym_id}`}>
                      {
                        displayColumns.map((column) => (
                          column.dataField !== 'data_location'
                            ? <TableCell key={column.dataField} style={cell}>{currRow[column.dataField]}</TableCell>
                            : (
                              <TableCell key={column.dataField} style={cellLast}>
                                <a href={currRow[column.dataField]} target="_blank" rel="noopener noreferrer">
                                  {currRow[column.dataField]}
                                </a>
                              </TableCell>
                            )
                        ))
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CustomTableContainer>
        )}
        {error ? <div className={classes.errorText}>{error}</div> : null}
        <div style={buttonContainer}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Button
              style={downloadAltIdsButton}
              onClick={handleDownloadCSV}
              disableRipple
              disabled={loading || data.length === 0}
            >
              <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                <div>DOWNLOAD</div>
                <div>ALTERNATIVE IDS</div>
              </div>
            </Button>
            <Tooltip
              title={(
                <div className={classes.tooltipContent}>
                  <div style={{ marginBottom: '8px' }}>
                    Clicking on DOWNLOAD ALTERNATIVE IDS will download the available alternative identifiers for this Participant.
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    CPI mappings are also available for each study as part of the downloadable study manifest. Follow these steps to download all alternative identifiers for a study:
                  </div>
                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{ marginBottom: '4px' }}>1. Go to the Explore Dashboard</div>
                    <div style={{ marginBottom: '4px' }}>2. Go to the Studies Tab of the Table</div>
                    <div style={{ marginBottom: '4px' }}>
                      3. Click on the icon <img src={downloadIcon} alt="Download" style={{ width: '12px', height: '8px', margin: '0 4px', verticalAlign: 'middle' }} /> in the Manifest column to download the Manifest.
                    </div>
                    <div>4. Open the downloaded Manifest and go to the &quot;alternative identifiers&quot; tab</div>
                  </div>
                </div>
              )}
              placement="top"
              arrow
              classes={{ tooltip: classes.customTooltip }}
            >
              <img src={questionIcon} alt="Help" className={classes.questionIcon} />
            </Tooltip>
          </div>

          <Button
            style={viewInExploreButton}
            onClick={() => openC3dcExplore(participantId)}
            disableRipple
          >
            VIEW IN EXPLORE
          </Button>
        </div>
        <div className="footer" style={footer}>
          <span>
            For more information about CPI, click{' '}
            <a
              style={link}
              href="https://participantindex-docs.ccdi.cancer.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </span>
        </div>
      </Box>
    </Modal>
  );
};

export default withStyles(styles)(CPIModal);
