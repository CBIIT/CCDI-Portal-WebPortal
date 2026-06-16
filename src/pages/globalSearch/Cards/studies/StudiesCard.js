import React, { useState, useRef, useEffect } from 'react';
import {
  Grid, Typography, Button, Box, List, ListItem, ListItemText, Tooltip
} from '@material-ui/core';
import { cn } from 'bento-components';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { ReactComponent as DownArrowIcon } from '../../assets/Down_Arrow.svg';
import { ReactComponent as UpArrowIcon } from '../../assets/Up_Arrow.svg';
import { studyDownloadLinks, openDoubleLink } from '../../../../bento/studiesData';

const CONSENT_GLOSSARY_URL = 'https://www.ncbi.nlm.nih.gov/gap/docs/submissionguide/#consentgloss';

const bareConsentSegment = (segment) => {
  const t = String(segment).trim();
  if (!t) return null;
  const m = t.match(/^\[(.*)\]$/);
  const inner = m ? m[1] : t;
  const v = inner.trim();
  return v || null;
};

const parseConsentCodes = (raw) => {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((c) => c != null && String(c).trim() !== '')
      .flatMap((c) => parseConsentCodes(c));
  }
  const s = String(raw).trim();
  if (!s) return [];
  const oneBracketPair = /^\[([^\]]*)\]$/;
  const wrapped = s.match(oneBracketPair);
  if (wrapped) {
    return wrapped[1]
      .split(',')
      .map((part) => bareConsentSegment(part))
      .filter(Boolean);
  }
  const bracketMatches = [...s.matchAll(/\[([^\]]+)\]/g)];
  if (bracketMatches.length > 0) {
    return bracketMatches.flatMap((m) => m[1]
      .split(',')
      .map((part) => bareConsentSegment(part))
      .filter(Boolean));
  }
  return s.split(',').map((part) => bareConsentSegment(part)).filter(Boolean);
};

// Utility function to truncate title with start...end format
const truncateTitle = (title, containerWidth) => {
  if (!title || !containerWidth) return { truncated: title, needsTruncation: false };
  
  const maxTitleWidth = containerWidth * 0.5; // 50% of container width
  
  // Create temporary element to measure text width
  const tempElement = document.createElement('span');
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden';
  tempElement.style.fontSize = '18px'; // Default title font size
  tempElement.style.fontFamily = 'Inter';
  tempElement.style.fontWeight = '500';
  tempElement.textContent = title;
  
  document.body.appendChild(tempElement);
  const titleWidth = tempElement.offsetWidth;
  document.body.removeChild(tempElement);
  
  if (titleWidth <= maxTitleWidth) {
    return { truncated: title, needsTruncation: false };
  }
  
  // Calculate how many characters to show at start and end
  const ellipsisWidth = 20; // Approximate width of "..."
  const availableWidth = maxTitleWidth - ellipsisWidth;
  const charWidth = titleWidth / title.length;
  const availableChars = Math.floor(availableWidth / charWidth);
  
  if (availableChars <= 6) {
    // Too short, just truncate normally
    return { truncated: title.substring(0, Math.max(3, availableChars)) + '...', needsTruncation: true };
  }
  
  const startChars = Math.ceil(availableChars * 0.6); // 60% at start
  const endChars = Math.floor(availableChars * 0.4); // 40% at end
  
  const startText = title.substring(0, startChars);
  const endText = title.substring(title.length - endChars);
  
  return { 
    truncated: `${startText}...${endText}`, 
    needsTruncation: true 
  };
};

const StudiesCard = ({ data = {}, index }) => {
  const {
    study_id,
    study_name,
    study_status,
    num_of_participants,
    num_of_files,
    consent_codes,
  } = data;

  const classes = useStyles();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [consentCodesExpanded, setConsentCodesExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const dropdownRef = useRef(null);
  const cardRef = useRef(null);

  // Measure container width for title truncation
  useEffect(() => {
    const measureWidth = () => {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth);
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewStudy = () => {
    navigate(`/studies/${study_id}`);
  };

  const handleCBioPortal = () => {
    window.open('https://cbioportal.ccdi.cancer.gov/', '_blank');
  };

  const handleDownloadManifest = () => {
    const downloadUrl = studyDownloadLinks[study_id];
    if (downloadUrl) {
      const fileName = `${study_id}_CCDI_Study_Manifest.xlsx`;
      openDoubleLink(downloadUrl, fileName);
    } else {
      console.warn(`No download link found for study: ${study_id}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderInfo = (label, value = '') => (
    <div className={classes.keyAndValueRow}>
      <Typography variant="h6" className={classes.key}>
        {label}
      </Typography>
      <Typography variant="body1" className={classes.value}>
        {value}
      </Typography>
    </div>
  );

  const renderConsentCodes = () => {
    const codes = parseConsentCodes(consent_codes);

    const getMaxLength = () => {
      if (window.innerWidth <= 600) {
        return 35;
      }
      if (window.innerWidth <= 900) {
        return 55;
      }
      if (window.innerWidth <= 1200) {
        return 75;
      }
      return 95;
    };

    const [maxLength, setMaxLength] = React.useState(getMaxLength());

    React.useEffect(() => {
      const handleResize = () => {
        setMaxLength(getMaxLength());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (codes.length === 0) {
      return { content: null, arrow: null };
    }

    const joined = codes.join('; ');
    const shouldTruncate = codes.length > 0 && joined.length > maxLength;

    const getDisplayItems = () => {
      if (!shouldTruncate || consentCodesExpanded) {
        return codes.map((c) => ({ text: c, fullCode: c }));
      }
      let acc = '';
      const visible = [];
      for (let i = 0; i < codes.length; i += 1) {
        const code = codes[i];
        const sep = visible.length ? '; ' : '';
        const next = acc + sep + code;
        if (next.length > maxLength) {
          if (visible.length === 0) {
            return [{ text: `${code.substring(0, maxLength)}...`, fullCode: code }];
          }
          break;
        }
        visible.push(code);
        acc = next;
      }
      return visible.map((c) => ({ text: c, fullCode: c }));
    };

    const displayItems = getDisplayItems();

    const showMoreIndicator = shouldTruncate && !consentCodesExpanded && displayItems.length < codes.length;

    const handleToggleExpand = () => {
      setConsentCodesExpanded(!consentCodesExpanded);
    };

    return {
      content: (
        <div className={cn(classes.keyAndValueRow, classes.consentCodesRow)}>
          <Typography variant="h6" className={classes.key} component="div">
            CONSENT CODES:
          </Typography>
          <div className={classes.consentCodesContainer}>
            <div className={classes.treatmentTextContainer}>
              <span
                className={shouldTruncate ? classes.clickableText : undefined}
                style={{ display: 'inline', paddingLeft: 0 }}
                onClick={shouldTruncate ? handleToggleExpand : undefined}
                onKeyDown={
                  shouldTruncate
                    ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggleExpand();
                      }
                    }
                    : undefined
                }
                role={shouldTruncate ? 'button' : undefined}
                tabIndex={shouldTruncate ? 0 : undefined}
              >
                {displayItems.map((item, i) => (
                  <React.Fragment key={`${item.fullCode}-${i}`}>
                    {i > 0 ? '; ' : ''}
                    <span className={classes.consentCodeItem}>
                      <a
                        href={CONSENT_GLOSSARY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.consentCodeLink}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`${item.fullCode} (opens dbGaP consent glossary in a new tab)`}
                      >
                        {item.text}
                      </a>
                      <OpenInNewIcon className={classes.consentExternalIcon} fontSize="small" aria-hidden />
                    </span>
                  </React.Fragment>
                ))}
                {showMoreIndicator ? '...' : null}
              </span>
            </div>
          </div>
        </div>
      ),
      arrow: shouldTruncate && codes.length > 0 ? (
        <span
          className={classes.expandToggle}
          onClick={handleToggleExpand}
        >
          {consentCodesExpanded ? <UpArrowIcon className={classes.expandIcon} /> : <DownArrowIcon className={classes.expandIcon} />}
        </span>
      ) : null,
    };
  };

  return (
    <div className={classes.card} ref={cardRef}>
      {/* Header with study title and dropdown button */}
      <div className={classes.cardHeader}>
        <Grid container alignItems="flex-start">
          <Grid item xs className={classes.titleContainer}>
            <div className={cn(classes.keyAndValueRow, classes.titleRow)}>
              <span className={classes.titleKey}>STUDIES</span>
              {(() => {
                const { truncated, needsTruncation } = truncateTitle(study_id, containerWidth);
                const linkElement = (
                  <a href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study_id}`} rel='noreferrer' target='_blank'>
                    {needsTruncation ? truncated : study_id}
                  </a>
                );
                return needsTruncation ? (
                  <Tooltip title={study_id} placement="top">
                    <Typography variant="h3" className={classes.titleValue}>
                      {linkElement}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="h3" className={classes.titleValue}>
                    {linkElement}
                  </Typography>
                );
              })()}
            </div>
          </Grid>
          
          {/* Dropdown button moved to top right */}
          <Grid item className={classes.buttonAlignWithTitle}>
            <Box className={classes.dropdownContainer} ref={dropdownRef}>
              <Button 
                className={`${classes.button} ${dropdownOpen ? classes.buttonOpen : ''}`}
                variant="outlined" 
                onClick={handleDropdownToggle}
              >
                <span>AVAILABLE ACTIONS</span>
                {dropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Button>
              
              {dropdownOpen && (
                <Box className={classes.dropdown}>
                  <List className={classes.dropdownList}>
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleViewStudy}
                    >
                      <ListItemText 
                        primary="VIEW STUDY" 
                        className={classes.dropdownItemText}
                      />
                    </ListItem>
                    
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleDownloadManifest}
                    >
                      <ListItemText 
                        primary="DOWNLOAD MANIFEST" 
                        className={classes.dropdownItemText}
                      />
                    </ListItem>
                    
                    <ListItem 
                      button 
                      className={classes.dropdownItem}
                      onClick={handleCBioPortal}
                    >
                      <ListItemText 
                        primary="CCDI CBioPortal" 
                        className={classes.dropdownItemText}
                      />
                      <OpenInNewIcon style={{ color: '#07679C', fontSize: '16px' }} />
                    </ListItem>
                  </List>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
      
      {/* Content area */}
      <div className={classes.contentArea}>
        {/* Study Name - Line 1 */}
        <div className={classes.propertyLine}>
          {renderInfo('Study Name:', study_name)}
        </div>
        
        {/* Number of participants, Study Status, Number of files - Line 2 */}
        <div className={classes.groupedProperties}>
          <div className={classes.propertyGroup}>
            {renderInfo('Number of Participants:', num_of_participants)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Study Status:', study_status)}
          </div>
          <div className={classes.propertyGroup}>
            {renderInfo('Number of Files:', num_of_files)}
          </div>
        </div>

        {(() => {
          const consentBlock = renderConsentCodes();
          if (!consentBlock.content) return null;
          return (
            <div className={classes.propertyLine}>
              {consentBlock.content}
              {consentBlock.arrow}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default StudiesCard;
