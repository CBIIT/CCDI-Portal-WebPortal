import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import headerImg from '../../../assets/resources/Federation_Header.png';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
// import { federationContent, introText } from '../../../bento/federationData';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import ccdiDataAccessImg from '../../../assets/resources/Federation_CCDI_Data_Access.png';


const FederationResourceContainer = styled.div`
    width: 100%;

    .resourceBreadcrumbContainer {
        // width: 1420px;
        margin: 0 auto;
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
        background-image: url(${headerImg});
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
        padding: 23px 0;
        padding-right: 34px;
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
`;

const FederationResourceBody = styled.div`
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

    .introContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 50px;

        a {
            color: #455299;
            font-weight: 600;
            text-decoration: underline;
            text-underline-position: under;
            line-break: anywhere;
        }
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
        padding: 0 32px 0 50px;
        margin-bottom: 100px;
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
        margin-top: 0;
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
            font-weight: 600;
            text-decoration: underline;
            text-underline-position: under;
        }

        h4 {
            font-family: Poppins;
            font-weight: 400;
            font-size: 19px;
            line-height: 21px;
            letter-spacing: 0.02em;
        }

        .link {
            padding-right: 20px;
            background: url(${exportIconBlue}) right center no-repeat;
        }
    }

    .federationImg {
        width: 75%;
        max-width: 467px;
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

        .mciContentContainer {
            margin-left: 0;
        }
    }
`;

const FederationResourceView = ({data}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const sectionList = useRef([]);
    const federationContent = data.federationContent;
    if (federationContent) {
        sectionList.current = federationContent.map((element, i) => {
            return sectionList.current[i] || createRef()
        });
    }
    const handleScroll = () => {
        const bodyElement = document.getElementById('FederationBody');
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
        window.scrollTo(0, 0);
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [])

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const element = document.getElementById(id);
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
        <FederationResourceContainer>
            <div className='resourceHeader'><div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub</div></div></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div className='resourceTitleText'>CCDI Data Federation Resource</div>
                    <div className='goToSiteButton'>
                        <a className='goToSiteText' href="https://cbiit.github.io/ccdi-federation-api-aggregation/" target="_blank" rel="noopener noreferrer">API Access</a>
                    </div>
                </div>
            </div>
            <FederationResourceBody id='FederationBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            federationContent && federationContent.map((federationItem, topicid) => {
                                const topickey = `topic_${topicid}`;
                                if (federationItem.topic) {
                                    return (
                                        <div name={federationItem.id} className={selectedNavTitle === federationItem.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{federationItem.topic}</div>
                                    )
                                }
                                return (
                                    <div name={federationItem.id} className={selectedNavTitle === federationItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={topickey} onClick={handleClickEvent}>{federationItem.subtopic}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {data.federationIntroText && <div className='introContainer'>{ReactHtmlParser(data.federationIntroText)}</div>}
                        {
                            federationContent && federationContent.map((federationItem, mciid) => {
                                const mcikey = `federation_${mciid}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={federationItem.id} className='mciTitle'>{federationItem.topic && federationItem.topic}</div>
                                        <div id={federationItem.id} name={mciid} className='mciTitleMobile sectionCollapse' onClick={handleCollapseSection}>{federationItem.topic && federationItem.topic}</div>
                                        <div className="mciSection mobileCollapse" ref={sectionList.current[mciid]}>
                                            <div className='mciContentContainer'>
                                                {federationItem.content && ReactHtmlParser(federationItem.content)}
                                                
                                                {federationItem.id && federationItem.id.includes('Data_Access') && 
                                                <div style={{ justifyContent: 'center', display: 'flex'}}>
                                                    <img className="federationImg" src={ccdiDataAccessImg} alt="Infographic displaying the CCDI Federation Service ecosystem. Users can directly access individual source nodes (KidsFirst, PCDC, St. Jude Cloud, Treehouse) or utilize the aggregation capabilities of the Federation Service to query data across all nodes simultaneously."/>
                                                </div>
                                                }
                                            </div>
                                            {federationItem.content && <div style={{height: '40px'}} />}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </FederationResourceBody>
        </FederationResourceContainer>
    )
}

export default FederationResourceView;

