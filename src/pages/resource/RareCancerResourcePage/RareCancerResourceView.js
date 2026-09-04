import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import headerImg from '../../../assets/resources/Rare_Cancer_Header.png';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GetAppIcon from '@material-ui/icons/GetApp';
import RareCancerMarkdown from './RareCancerMarkdown';
import { buildRareCancerNavItems } from './parseRareCancerMarkdown';

const ResourceContainer = styled.div`
    width: 100%;

    .resourceBreadcrumbContainer {
        // width: 1420px;
        margin: 0 auto;
        display: none;
    }

    .resourceBreadcrumb {
        font-family: Public Sans;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin: 3px 0 3px 32px;
        line-height: 27px;
        color: #1B1B1B;
    }

    .breadcrumbLink:hover {
        color: #004e7a;
    }

    .arrowIcon {
        font-size: medium;
        padding-top: 7px;
        margin: 0 3px;
        color: #71767a;
    }

    .resourceHeader {
        width: 100%;
        height: 214px;
        background: #e6ebee;
    }

    .resourceHeaderBackground {
        width: 100%;
        height: 214px;
        /* Quote the URL so https:// is not treated as a CSS // comment. */
        background-image: url(${props => JSON.stringify(props.headerImg || headerImg)});
        background-repeat:no-repeat;
        background-position:center;
    }

    .resourceHeaderText {
        // width: 1420px;
        margin: 0 auto;
        padding: 150px 0 0 75px;
        color: #19676D;
        font-family: Poppins;
        font-size: 40px;
        font-weight: 400;
    }

    .resourceTitleContainer {
        background: #087D6F;
    }

    .resourceTitle {
        // width: 1420px;
        margin: 0 auto;
        display: flex;
        line-height: 38px;
        background: #087D6F;
        font-family: Poppins;
        font-weight: 600;
        color: #ffffff;
        font-size: 35px;
    }

    .resourceTitleText {
        padding: 15px 0;
        padding-left: 75px;
    }

    .goToSiteButton {
        display: flex;
        margin-left: auto;
        background: #035D63;
        font-weight: 400;
        font-size: 19px;
        line-height: 21px;
        padding: 0 25px;
    }

    .goToSiteText {
        color: #FFFFFF;
        text-decoration: none;
        padding: 42px 34px 23px 0;
        letter-spacing: 0.02em;
        background: url(${exportIcon}) right center no-repeat;
    }

    @media (min-width: 1420px) {
        .resourceTitle {
            width: 1420px;
        }

        .resourceHeaderText {
            width: 1420px;
        }

        .resourceBreadcrumbContainer {
            width: 1420px;
        }
    }

    @media (max-width: 1140px) {
        .resourceTitleText {
            padding-left: calc(50vw - 500px);
        }

        .resourceHeaderText {
            padding-left: calc(50vw - 500px);
        }
    }

    @media (max-width: 1023px) {

        .resourceBreadcrumb {
            margin-left: 16px;
        }
        .resourceTitle {
            display: block;
        }
        
        .resourceHeaderText {
            padding-left: 16px;
        }

        .resourceTitleText {
            padding-left: 16px;
        }

        .goToSiteButton {
            padding-left: 16px;
        }

        .goToSiteText {
            padding: 15px 34px 15px 0;
        }
    }

    @media (max-width: 865px) {
        .resourceHeaderBackground {
            width: 865px;
        }
    }
`;

const ResourceBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px; 
    .navSection {
        width: 240px;
        color: #477C90;
        position: relative;
    }

    .navList {
        position: static;
    }

    .navListSticky {
        position: fixed;
        top: 55px;
        width: 240px;
    }
    .navListAbsolute {
        position: absolute;
        bottom: 0;
        width: 240px;
    }

    .navTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 17px;
        letter-spacing: 0.02em;
        margin-bottom: 29px;
    }

    .navTopicItem {
        margin-bottom: 20px;
        color: #477C90;
        text-decoration: none;
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.01em;
        line-height: 19px;
    }

    .selected {
        font-family: Inter;
        font-weight: 600;
        color: #05555C;
    }

    .navTopicItem:hover {
        cursor: pointer;
        font-family: Inter;
        font-weight: 600;
        color: #05555C;
    }

    .subtitle {
        margin-left: 20px;
    }

    .contentSection {
        display: flex;
        width: calc(100% - 240px);
        padding: 0 32px 0 36px;
        margin-bottom: 100px;
    }

    .introContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 50px;

        a {
            color: #455299;
            font-weight: 700;
            text-decoration: underline;
            text-underline-position: under;
            line-break: anywhere;
        }

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }

        img {
            display: block;
            width: 75%;
            max-width: 467px;
            margin: 0 auto 30px auto;
        }
    }

    .mciTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 25px;
        line-height: 26px;
        letter-spacing: -0.02em;
        margin-bottom: 20px;
        color: #05555C;

        @media (max-width: 767px) {
            display: none;
        }
    }

    .mciTitleMobile {
        width: 100%;
        padding: 12px 10px;
        margin-bottom: 20px;
        font-family: Open Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 20px;
        text-align: left;
        color: #FFFFFF;
        background: url(${closeIcon}) right 10px center no-repeat;
        background-color: #187C85;
        display: none;

        @media (max-width: 767px) {
            display: block;
        }
    }
    
    .sectionCollapse {
        background: url(${arrowDownIcon}) right 10px center no-repeat;
        background-color: #187C85;
    }

    .mciTitleMobile:hover {
        cursor: pointer;
    }

    .mciSubtitle {
        color: #05555C;
        font-family: Poppins;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px; /* 118.182% */
        letter-spacing: -0.044px;
        text-transform: uppercase;
        margin-left: 20px;
        margin-bottom: 24px;
    }

    p {
        font-weight: 500;
        margin-top: 0;
        min-width: 0;
    }

    li {
        font-weight: 500;
    }

    h3 {
        color: #05555C;
        font-family: Poppins;
        font-size: 18px;
        font-style: italic;
        font-weight: 500;
        line-height: 26px; /* 144.444% */
        letter-spacing: -0.036px;
        margin-bottom: 24px;
        margin-top: -12px;
    }

    .mciContentContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-left: 20px;

        a {
            color: #455299;
            font-weight: 700;
            text-decoration: underline;
            text-underline-position: under;
            line-break: anywhere;
        }

        h4 {
            font-family: Poppins;
            font-weight: 400;
            font-size: 19px;
            line-height: 21px;
            letter-spacing: 0.02em;
        }

        ul {
            padding-left: 30px;
        }

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }
    }

    .donutContainer {
        display: flex;
    }

    .donutTitleContainer {
        width: 100%;
        font-family: Poppins;
        font-size: 19px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;

        h4 {
            width: 400px;
            margin: 120px 0 0 150px;
        }

    }

    @media (max-width: 767px) {
        padding: 55px 0 0 0;

        .navSection {
            display: none;
        }

        .contentSection {
            width: 100%;
            padding: 0 16px;
        }

        .contentList {
            width: 100%;
        }

        .mciSection {
            padding: 0 5px;
        }

        .mobileCollapse {
            display: block;
            @media (max-width: 767px) {
                display: none;
            }
        }

        .mciSubtitle {
            margin-left: 0;
        }

        .mciContentContainer {
            margin-left: 0;
        }
    }
`;

const ContactFormDownloadButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 14px 0;
`;

const ContactFormDownloadButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    width: 189px;
    height: 41px;
    padding: 0 6px 0 8px;
    box-sizing: border-box;
    background: #2d545e;
    border: 1px solid #8fb1cc;
    border-radius: 4px;
    cursor: pointer;
    color: #ffffff;

    &:hover {
        filter: brightness(1.06);
    }

    &:focus {
        outline: 2px solid #8fb1cc;
        outline-offset: 2px;
    }

    .contactFormDownloadButtonText {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-family: Poppins, sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 12px;
        line-height: 13px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        vertical-align: middle;
        leading-trim: none;
        color: #ffffff;
    }

    .contactFormDownloadIcon {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
        font-size: 22px;
        color: #ffffff;
    }
`;

const DEFAULT_PAGE_TITLE = 'Pediatric, Adolescent, and Young Adult Rare Cancer Study';

const DEFAULT_DOWNLOAD_CONFIG = {
  url: 'https://raw.githubusercontent.com/CBIIT/CCDI_Hub_Assets/main/PDF/Resources/RCI/rare-cancer-study_contact.pdf',
  filename: 'rare-cancer-study_contact.pdf',
};

/** Splits markdown after the first prose paragraph so the contact-form button can sit between paragraphs. */
function splitMarkdownAfterFirstParagraph(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return { before: '', after: '' };
  }
  const lines = markdown.split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].trim()) {
    i += 1;
  }
  while (i < lines.length && /^#{1,6}\s/.test(lines[i].trim())) {
    i += 1;
    while (i < lines.length && !lines[i].trim()) {
      i += 1;
    }
  }
  while (i < lines.length && lines[i].trim()) {
    i += 1;
  }
  return {
    before: lines.slice(0, i).join('\n').trim(),
    after: lines.slice(i).join('\n').trim(),
  };
}

async function handleContactFormDownload(e, config) {
  e.preventDefault();
  const { url, filename } = config && config.url ? config : DEFAULT_DOWNLOAD_CONFIG;
  const downloadUrl = url;

  const isSameOrigin = (targetUrl) => {
    try {
      return new URL(targetUrl, window.location.origin).origin === window.location.origin;
    } catch {
      return true; // relative path
    }
  };

  if (isSameOrigin(downloadUrl)) {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  try {
    const res = await fetch(downloadUrl, { mode: 'cors' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Download failed:', err);
    window.open(downloadUrl, '_blank');
  }
}

function ContactInformationContent({ markdown, downloadConfig }) {
  const { before, after } = splitMarkdownAfterFirstParagraph(markdown);
  return (
    <>
      {before ? <RareCancerMarkdown>{before}</RareCancerMarkdown> : null}
      <ContactFormDownloadButtonWrap>
        <ContactFormDownloadButton
          type="button"
          aria-label="Download contact form PDF"
          onClick={(e) => handleContactFormDownload(e, downloadConfig)}
        >
          <span className="contactFormDownloadButtonText">
            <span>DOWNLOAD</span>
            <span>CONTACT FORM</span>
          </span>
          <GetAppIcon className="contactFormDownloadIcon" aria-hidden />
        </ContactFormDownloadButton>
      </ContactFormDownloadButtonWrap>
      {after ? <RareCancerMarkdown>{after}</RareCancerMarkdown> : null}
    </>
  );
}

const RareCancerResourceView = ({ data = {} }) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const sectionList = useRef([]);
    const location = useLocation();
    const MCIContent = data.rareCancerContent;
    const navItems = buildRareCancerNavItems(data.navTitles, MCIContent);
    const pageTitle = data.title || DEFAULT_PAGE_TITLE;
    const downloadConfig = data.RCI_DOWNLOAD_CONFIG || DEFAULT_DOWNLOAD_CONFIG;
    if (MCIContent) {
        sectionList.current = MCIContent.map((element, i) => {
            return sectionList.current[i] || createRef()
        });
    }
    const handleScroll = () => {
        const bodyElement = document.getElementById('MCIBody');
        const footerList = document.getElementsByTagName('footer');
        let footer;
        if (window.innerWidth > 1204) {
            footer = footerList[0];
        } else if (window.innerWidth > 767) {
            footer = footerList[1];
        } else {
            footer = footerList[2];
        }
        const footerToTop = footer.getBoundingClientRect().top;
        const leftNavHeight = document.getElementById('leftNav').offsetHeight;
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > bodyElement.offsetTop) {
            setStickyNavStyle("navListSticky");
            if (footerToTop < leftNavHeight + 55) {
                setStickyNavStyle("navListAbsolute");
            }
        } else {
            setStickyNavStyle("navList");
        }
    }

    useEffect(() => {
        const hash = location.hash ? location.hash.slice(1) : null;
        if (!hash) {
            window.scrollTo(0, 0);
        }
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Scroll to hash anchor when data is loaded (markdown is async)
    useEffect(() => {
        const rawHash = location.hash ? location.hash.slice(1) : null;
        if (!rawHash || !MCIContent) return;

        const scrollToAnchor = () => {
            const element = document.getElementById(rawHash)
                || document.getElementById(rawHash.toUpperCase());
            if (element) {
                setSelectedNavTitle(element.id);
                window.scrollTo({
                    top: element.offsetTop - 55,
                    behavior: 'smooth'
                });
            }
        };

        scrollToAnchor();
        // Retry after a short delay in case DOM hasn't finished painting
        const timer = setTimeout(scrollToAnchor, 1000);
        return () => clearTimeout(timer);
    }, [location.hash, MCIContent]);

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const element = document.getElementById(id);
        if (!element) {
            return;
        }
        window.scrollTo({ 
            top: element.offsetTop - 55,
            behavior: "smooth" 
        });
    }

    const handleCollapseSection = e => {
        const i = e.target.getAttribute("name");
        const currentDisplay = sectionList.current[i].current.style.display;
        if (currentDisplay === 'block') {
            sectionList.current[i].current.style.display = 'none';
            e.target.className = 'mciTitleMobile sectionCollapse';
        } else {
            sectionList.current[i].current.style.display = 'block';
            e.target.className = 'mciTitleMobile';
        }
    }

    return (
        <ResourceContainer headerImg={data.RCI_Header}>
            <div className='resourceBreadcrumbContainer'>
                <div className='resourceBreadcrumb'>
                    <NavLink className="breadcrumbLink" to='/'>Home</NavLink>
                    <ArrowForwardIosIcon className='arrowIcon' alt="arrowIcon"/>
                    <span>Molecular Characterization Initative</span>
                    </div>
            </div>
            <div className='resourceHeader'>
                <div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub</div></div>
            </div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div className='resourceTitleText'>{pageTitle}</div>
                </div>
            </div>
            <ResourceBody id='MCIBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            navItems.map((navItem, navIdx) => {
                                const navKey = `nav_${navIdx}`;
                                const className = navItem.isSubtitle
                                    ? (selectedNavTitle === navItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle')
                                    : (selectedNavTitle === navItem.id ? 'navTopicItem selected' : 'navTopicItem');
                                return (
                                    <div name={navItem.id} className={className} key={navKey} onClick={handleClickEvent}>{navItem.label}</div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {data.rareCancerIntroText && <div className='introContainer'><RareCancerMarkdown>{data.rareCancerIntroText}</RareCancerMarkdown></div>}
                        {
                            MCIContent && MCIContent.map((mci, mciidx) => {
                                const mcikey = `mci_${mciidx}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={mci.id} className='mciTitle'>{mci.topic && mci.topic}</div>
                                        <div id={mci.id} name={mciidx} className='mciTitleMobile sectionCollapse' onClick={handleCollapseSection}>{mci.topic && mci.topic}</div>
                                        <div className="mciSection mobileCollapse" ref={sectionList.current[mciidx]}>
                                        {
                                            mci.list.map((mciItem, idx) => {
                                                const listItemKey = `listItem_${mciidx}_${idx}`;
                                                return (
                                                    <div key={listItemKey}>
                                                        <div id={mciItem.id} className='mciSubtitle'>{mciItem.subtopic && mciItem.subtopic}</div>
                                                        <div className='mciContentContainer'>
                                                            {mciItem.content && (
                                                                mciItem.id === 'CONTACT_INFORMATION' ? (
                                                                    <ContactInformationContent markdown={mciItem.content} downloadConfig={downloadConfig} />
                                                                ) : (
                                                                    <RareCancerMarkdown>{mciItem.content}</RareCancerMarkdown>
                                                                )
                                                            )}
                                                        </div>
                                                        {mciItem.content && <div style={{height: '40px'}} />}
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </ResourceBody>
        </ResourceContainer>
    )
}

export default RareCancerResourceView;
