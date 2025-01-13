import React, { useState } from 'react';
import { cellTypes, headerTypes } from '@bento-core/table';
import ReactHtmlParser from "html-react-parser";
import { studyDownloadLinks, openDoubleLink } from '../../../../bento/studiesData';
import { CloudDownload } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export const CustomCellView = (props) => {
  const {
    dataField, dataFormatter, cellStyle,
  } = props;
  const [top5, setTop5] = useState(true);
  const newStyle = {
    color: "#60797B",
    fontSize: "12px",
    cursor: 'pointer',
    textDecoration: 'underline',
    height: '23px',
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
  } else if (cellStyle === 'DBGAP') {
    return(
      <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${props[dataField]}`} target="_blank" rel="noreferrer">{props[dataField]}</a>
    )
  } else if (cellStyle === 'STUDY_DOWNLOAD') {
    const study_id = props[dataField];
    const study_download_url = studyDownloadLinks[props[dataField]];
    const fileName = study_id + "_CCDI_Study_Manifest.xlsx";
    return(
      <Tooltip title="Download study manifest">
        <span onClick={()=>{
          openDoubleLink(study_download_url, fileName)
        }} style={downloadStyle}>
          <CloudDownload />
        </span>
      </Tooltip>
    )
  }
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
