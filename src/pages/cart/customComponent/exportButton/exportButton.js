
import React, { useEffect, useState, useRef, useMemo } from 'react';
import gql from 'graphql-tag';
import { Paper, Popper, Button, ClickAwayListener, Grow, MenuItem, MenuList, withStyles } from '@material-ui/core';
import { noop } from 'lodash';
import { useQuery } from '@apollo/client';
import { MY_CART } from '../../../../bento/tableDownloadCSV'
import { manifestData, myFilesPageData } from '../../../../bento/fileCentricCartWorkflowData'
import client from '../../../../utils/graphqlClient';
import arrowDownSvg from './assets/arrowDown.svg';
import arrowDownGraySvg from './assets/arrowDownGray.svg';
// import linkIcon from './assets/linkIcon.svg';
import arrowUpSvg from './assets/arrowUp.svg';
import cgcIcon from './assets/cgc.svg';
import manifestIcon from './assets/manifest.svg';
// import { getManifestData } from './util/TableService';
import { exportStyles } from './exportStyles';
import { downloadJson } from './util/downloadJson';
import ToolTip from "@bento-core/tool-tip";

const ExportButtonView = (props,) => {
    const { classes, filesId } = props;
    const LABEL = 'Available Export Options';
    const {
        EXPORT_TO_CANCER_GENOMICS_CLOUD, DOWNLOAD_MANIFEST
      } = {
        EXPORT_TO_CANCER_GENOMICS_CLOUD: 'Export to Cancer Genomics Cloud',
        DOWNLOAD_MANIFEST: 'Download Manifest',
      };
    const OPTIONS = [
        EXPORT_TO_CANCER_GENOMICS_CLOUD, DOWNLOAD_MANIFEST
    ];

    const [manifest, setManifest] = useState('');
    const [sbgUrl, setSBGUrl] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading] = useState(false);
    const [label] = useState(LABEL);
    const anchorRef = useRef(null);
    const STORE_MANIFEST_QUERY = gql`
      query storeManifest($manifestString: String!) {
          storeManifest(manifest: $manifestString)
      }
    `;

    //transform data structure
    const getManifestPayload = (manifestContent) => {
      // console.log(manifestContent);
      if (!manifestContent || (manifestContent.filesInList && manifestContent.filesInList.length === 0)) {
        return null;
      }
      const appendString = 'drs://nci-crdc.datacommons.io/'
      const processedStoreManifestPayload = manifestContent.filesInList.map((el) => {
        const obj = {}
        for (let i = 0; i < manifestData.keysToInclude.length; i++) {
          if (manifestData.keysToInclude[i] === 'file_id') {
            obj[manifestData.header[i]] = el && el[manifestData.keysToInclude[i]] ? 
              appendString + el[manifestData.keysToInclude[i]] 
              : 
              "";
          }
          else {
            obj[manifestData.header[i]] = el && el[manifestData.keysToInclude[i]] ? 
            el[manifestData.keysToInclude[i]] 
            : 
            "";
          }
        }
        return obj;
        });
      return processedStoreManifestPayload;
  };

  const { urlData } = useQuery(STORE_MANIFEST_QUERY, {
    variables: { manifestString: JSON.stringify(getManifestPayload(manifest)) },
    context: { clientName: 'interopService' },
    skip: !getManifestPayload(manifest),
    fetchPolicy: 'no-cache',
  });

  const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
      }
      setOpen(false);
  };
  function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
  }

  const dropDownButtonTooltipTitle = useMemo(() => {
    switch (filesId.length > 0) {
      case true:
        return '';
      case false:
        return (
          <div>Please visit the <a style={{color: '#165F83'}} href='/explore'>Explore page</a> and add some files to the cart to get started.</div>
        );
      default:
        return '';
    }
  }, [filesId]);

  const dropDownListTooltipTitle = (type) => {
    switch (type) {
      case EXPORT_TO_CANCER_GENOMICS_CLOUD:
        return 'Export selected data to Cancer Genomics Cloud for access and analysis.';
      case DOWNLOAD_MANIFEST:
        return 'Save manifest file to your computer.';
      default:
        return '';
    }
  } 

  const StyledMenuItem = withStyles(() => ({
      root: {
        padding: '2px 12px',
        overflow: 'auto',
        whiteSpace: 'wrap',
      },
    }))(MenuItem);

  async function fetchData() {
    let result = await client.query({
      query: MY_CART,
      variables:{
        file_ids: filesId,
      },
    });
    setManifest(result.data);
  }

  useEffect(() => {
    fetchData();
  }, [filesId]);

  useEffect(() => {
    if (urlData && urlData.storeManifest) {
      setSBGUrl(urlData.storeManifest);
    }
  }, [urlData]);
    
    const initiateDownload = (currLabel) => {
        switch (currLabel) {
          case 'Export to Cancer Genomics Cloud': 
            window.open(`https://cgc.sbgenomics.com/import-redirect/drs/csv?URL=${encodeURIComponent(sbgUrl)}`, '_blank');
            break;
          case 'Download Manifest':
            downloadJson(manifest, '', myFilesPageData.manifestFileName, manifestData);
            break;
          default: noop(manifest);
            break;
        }
        noop();
    };

    const getMenuItem = (type) => {
        let icon;
        switch (type) {
          case EXPORT_TO_CANCER_GENOMICS_CLOUD:
            icon = cgcIcon;
            break;
          case DOWNLOAD_MANIFEST:
            icon = manifestIcon;
            break;
          default:
            icon = manifestIcon;
            break;
        }
        return (
          <ToolTip
            arrow
            interactive
            title={dropDownListTooltipTitle(type)}
            placement="left"
            fontFamily="Poppins"
            fontSize="13px"
            fontWeight="400"
          >
            <StyledMenuItem onClick={() => {
              initiateDownload(type);
              setOpen(false);
            }}
            key={type}
            className={classes.styledMenuItem}
            >
              <div>{type}</div>
              {
                icon && (
                <span style={{paddingLeft: '7px'}}>
                  <img src={icon} alt="icon" />
                </span>
                )
              }
            </StyledMenuItem>
          </ToolTip>
        );
      };
    

    const options = OPTIONS.map((item) => getMenuItem(item));

    return (
        <>
          <ToolTip
            arrow
            maxWidth={200}
            placement="left"
            title={dropDownButtonTooltipTitle}
          >
            <Button
              classes={{
                root: open
                  ? classes.availableDownloadDropdownBtnIsOpen
                  : classes.availableDownloadDropdownBtn,
                label: classes.availableDownloadDropdownBtnLabel,
                contained: classes.availableDownloadBtnContained,
                startIcon: classes.availableDownloadDropdownBtnStartIcon,
              }}
              endIcon={<img style={{ marginLeft: '8px' }} src={filesId.length === 0 ? arrowDownGraySvg : open ? arrowUpSvg : arrowDownSvg} alt="arrow icon" />}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              disableRipple
              disabled={filesId ? filesId.length === 0 : 0}
            >
              {isLoading ? (<p>Loading...</p>) : (
                <>
                  {label}
                </>
              )}
            </Button>
          </ToolTip>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              style={{ zIndex: '9999' }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper
                    className={classes.dropdownPaper}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                        classes={{
                          root: classes.dropdownMenuList,
                        }}
                      >
                        {options}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
        </>
    );

}
export default withStyles(exportStyles)(ExportButtonView);