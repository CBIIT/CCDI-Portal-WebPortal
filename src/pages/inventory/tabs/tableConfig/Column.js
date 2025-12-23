import React, { useState } from 'react';
import { cellTypes, headerTypes } from '@bento-core/table';
import ReactHtmlParser from "html-react-parser";
import { studyDownloadLinks, openDoubleLink } from '../../../../bento/studiesData';
import { CloudDownload } from '@material-ui/icons';
import { Tooltip, Modal, Box, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

// Styles for Sample ID Modal
const useModalStyles = makeStyles(() => ({
  modalBody: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '836px',
    height: '671px',
    backgroundColor: '#FFFFFF',
    borderRadius: '40px',
    border: '1px solid #E0E0E0',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    padding: '0px',
    outline: 'none',
    opacity: 1,
    overflow: 'hidden',
  },
  header: {
    borderBottom: '2px solid #E0E0E0',
    padding: '16px 24px',
    position: 'relative',
    height: '55px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '19px',
    lineHeight: '21px',
    letterSpacing: '2%',
    textAlign: 'center',
    color: '#000000',
  },
  closeButton: {
    position: 'absolute',
    left: '790px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#000000',
    padding: '0',
    width: '18px',
    height: '18px',
    opacity: 1,
    '& svg': {
      width: '18px',
      height: '18px',
    },
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '836px',
    height: '36px',
    padding: '0 24px 0 14px',
    borderBottom: '0.5px solid #000000',
    opacity: 1,
    boxSizing: 'border-box',
  },
  resultCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  resultNumber: {
    fontFamily: 'Nunito',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '17px',
    letterSpacing: '0%',
    color: '#477C90',
  },
  resultText: {
    fontFamily: 'Nunito',
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '17px',
    letterSpacing: '0%',
    color: '#477C90',
  },
  sortButton: {
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '17px',
    letterSpacing: '0%',
    color: '#646464',
    cursor: 'pointer',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    padding: '0',
    '&:hover': {
      color: '#005999',
    },
  },
  sortButtonActive: {
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '17px',
    letterSpacing: '0%',
    color: '#0B73C3',
    cursor: 'pointer',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    padding: '0',
    '&:hover': {
      color: '#005999',
    },
  },
  gridContainer: {
    padding: '0',
    height: 'calc(671px - 91px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#477C90',
      borderRadius: '4px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#366070',
      backgroundClip: 'padding-box',
    },
  },
  idGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0',
    width: '100%',
    overflow: 'hidden',
  },
  idCell: {
    fontFamily: 'Nunito',
    fontWeight: 300,
    fontSize: '16px',
    lineHeight: '15px',
    letterSpacing: '0%',
    color: '#000000',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: '14px',
    paddingLeft: '14px',
    paddingTop: '0',
    paddingBottom: '0',
    borderWidth: '0px 0.5px 0.5px 0px',
    borderStyle: 'solid',
    borderColor: '#000000',
    borderRadius: '0',
    textAlign: 'left',
    boxSizing: 'border-box',
    opacity: 1,
    '&:nth-child(3n)': {
      borderRightWidth: '0px',
    },
  },
}));

// Generic Modal Component for displaying lists of IDs
const IDListModal = ({ open, onClose, ids, columnLabel }) => {
  const classes = useModalStyles();
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  const displayedIds = sortAlphabetically 
    ? [...ids].sort((a, b) => a.localeCompare(b))
    : ids;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="id-list-modal"
    >
      <Box className={classes.modalBody}>
        <div className={classes.header}>
          <Typography className={classes.modalTitle}>
            {columnLabel}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.contentHeader}>
          <div className={classes.resultCount}>
            <span className={classes.resultNumber}>{ids.length}</span>
            <span className={classes.resultText}>result{ids.length !== 1 ? 's' : ''}</span>
          </div>
          <button
            className={sortAlphabetically ? classes.sortButtonActive : classes.sortButton}
            onClick={() => setSortAlphabetically(!sortAlphabetically)}
          >
            Sort Alphabetically
          </button>
        </div>
        <div className={classes.gridContainer}>
          <div className={classes.idGrid}>
            {displayedIds.map((id, index) => (
              <div key={index} className={classes.idCell}>
                {id}
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export const CustomCellView = (props) => {
  const {
    dataField, dataFormatter, cellStyle, label, header
  } = props;
  const [top5, setTop5] = useState(true);
  const newStyle = {
    color: "#07679C",
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "22px",
    letterSpacing: "0%",
    textDecoration: "underline",
    textDecorationStyle: "solid",
    cursor: 'pointer',
  };
  const downloadStyle = {
    color: "#60797B",
    fontSize: "12px",
    cursor: 'pointer',
    height: '23px',
  };
  if (cellStyle === 'TRANSFORM') {
    const content = dataFormatter(props[dataField]);
    return (<>{ReactHtmlParser(content)}</>);
  } else if (cellStyle === 'EXPAND') {
    const completeData = props[dataField].join("<br>");
    if (props[dataField].length <= 5) {
      return (<>{ReactHtmlParser(completeData)}</>);
    } else {
      const top5Data = props[dataField].slice(0, 5).join("<br>");
      return (
        <>
          {ReactHtmlParser(top5 ? top5Data : completeData)}
          <div onClick={() => setTop5(!top5)} style={newStyle}>{top5 ? "Read More" : "Read Less"}</div>
        </>
      );
    }
  } else if (cellStyle === 'MODAL') {
    // Parse the bracketed list of IDs (e.g., "[BS_TTVFCG7S, BS_R3XEWNNV, BS_0BNNT7Q]")
    const rawData = props[dataField];
    let ids = [];
    
    if (rawData) {
      // Remove brackets and split by comma
      const cleaned = rawData.replace(/[[]/g, '').trim();
      if (cleaned) {
        ids = cleaned.split(',').map(id => id.trim()).filter(id => id.length > 0);
      }
    }
    
    if (ids.length === 0) {
      return <></>;
    }
    
    // Component to handle modal state
    const ModalCell = () => {
      const [modalOpen, setModalOpen] = useState(false);
      const columnLabel = header || dataField || 'IDs';
      
      if (ids.length <= 5) {
        // Display all IDs, one per line
        return (
          <div style={{ lineHeight: '1.5' }}>
            {ids.map((id, index) => (
              <div key={index}>{id}</div>
            ))}
          </div>
        );
      } else {
        // Display first 5 IDs and a "View All >" button
        const first5Ids = ids.slice(0, 5);
        return (
          <>
            <div style={{ lineHeight: '1.5' }}>
              {first5Ids.map((id, index) => (
                <div key={index}>{id}</div>
              ))}
              <div 
                onClick={() => setModalOpen(true)} 
                style={newStyle}
              >
                View All &gt;
              </div>
            </div>
            <IDListModal 
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              ids={ids}
              columnLabel={columnLabel}
            />
          </>
        );
      }
    };
    
    return <ModalCell />;
  } else if (cellStyle === 'DBGAP') {
    return (
      <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${props[dataField]}`} target="_blank" rel="noreferrer">{props[dataField]}</a>
    )
  } else if (cellStyle === 'STUDY_DOWNLOAD') {
    const study_id = props[dataField];
    const study_download_url = studyDownloadLinks[props[dataField]];
    const fileName = study_id + "_CCDI_Study_Manifest.xlsx";
    return (
      <Tooltip title="Download study manifest">
        <span onClick={() => {
          openDoubleLink(study_download_url, fileName)
        }} style={downloadStyle}>
          <CloudDownload />
        </span>
      </Tooltip>
    )
  } else if (dataField === 'cohort') {
    return (
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', width: 67 }}>
        {
          label.map((cohort, index) => (
            <Tooltip title={<div>

              {label.map((coh, innerIndex) => (
                <div style={{ display: 'flex', gap: 10, marginBottom: 5 }}>
                  <div style={{
                    backgroundColor: coh["color"],
                    width: 17,
                    height: 17,
                    border: '1px solid #686868',
                    borderRadius: 4
                  }}>
                  </div>
                  {coh["cohort"]}
                </div>
              ))
              }

            </div>} arrow placement="top">
              <div style={{
                backgroundColor: cohort["color"],
                width: 17,
                height: 17,
                border: '1px solid #686868',
                borderRadius: 4
              }}>
              </div>
            </Tooltip>
          ))
        }
      </div>
    )
  }
  
  // Default case: render the field value directly
  return <>{props[dataField]}</>;
};

export const CustomHeaderCellView = () => (<></>);

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */

  const displayCustomView = columns.map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};
