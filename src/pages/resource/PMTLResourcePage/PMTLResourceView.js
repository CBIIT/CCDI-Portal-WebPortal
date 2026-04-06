import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
// import { MCIContent, introText } from '../../../bento/mciData';
import headerImg from '../../../assets/resources/PMTL_header.png';
import headerMobileImg from '../../../assets/resources/PMTL_header.png';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
// import ccdiDataEcosystemImg from '../../../assets/resources/MCI_CCDI_Data_Ecosystem.png';
// import ccdiDataEcosystemMobileImg from '../../../assets/resources/MCI_CCDI_Data_Ecosystem_Mobile.png';
import PMTLTable from '../components/PMTLTable';
import PMTLTableMobile from '../components/PMTLTableMobile';
import MCISearchTable from '../components/MCISearchTable';
import MCISearchTableMobile from '../components/MCISearchTableMobile';
import MCIDiseaseTable from '../components/MCIDiseaseTable';
import MCIDiseaseTableMobile from '../components/MCIDiseaseTableMobile';
//import MCINumberTable from './components/MCINumberTable';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
//import DonutChart from '../../components/common/DonutChart';
import MapView from '../../../components/common/mapGenerator';
import MapViewMobile from '../components/MapViewMobile';

const PMTLResourceContainer = styled.div`
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

        @media (max-width: 767px) {
            display: none;
        }
    }

    .resourceHeaderMobile {
        width: 100%;
        height: 214px;
        background: #e6ebee;
        display: none;

        @media (max-width: 767px) {
            display: block;
        }
    }

    .resourceHeaderBackground {
        width: 100%;
        height: 214px;
        background-image: url(${props => props.headerImg || headerImg});
        background-repeat:no-repeat;
        background-position:center;
    }

    .resourceHeaderBackgroundMobile {
        width: 100%;
        height: 214px;
        background-image: url(${props => props.headerMobileImg || headerMobileImg});
        background-repeat:no-repeat;
        background-position:center;
    }

    .resourceHeaderText {
        // width: 1420px;
        margin: 0 auto;
        padding: 150px 0 0 75px;
        color: #ffffff;
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

const PMTLResourceBody = styled.div`
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
    }

    .pmtlTitle {
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

    .pmtlTitleMobile {
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

    .pmtlTitleMobile:hover {
        cursor: pointer;
    }

    .pmtlSubtitle {
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

    .pmtlContentContainer {
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

    .PMTLTableMobileContainer {
        display: none;
    }

    .PMTLSearchTableMobileContainer {
        display: none;
    }

    .ecosystemImg {
        width: 100%;
    }

    .ecosystemImgMobile {
        display: none;
    }

    .MapMobileContainer {
        display: none;
    }

    .PMTLDiseaseTableMobileContainer {
        display: none;
    }

    @media (max-width: 1023px) {
        .PMTLTableContainer {
            display: none;
        }
        .PMTLTableMobileContainer {
            display: block;
        }
        
        .PMTLSearchTableContainer {
            display: none;
        }

        .PMTLSearchTableMobileContainer {
            display: block;
        }
        
        .MapContainer {
            display: none;
        }

        .MapMobileContainer {
            display: block;
        }

        .PMTLDiseaseTableContainer {
            display: none;
        }

        .PMTLDiseaseTableMobileContainer {
            display: block;
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

        .pmtlSection {
            padding: 0 5px;
        }

        .mobileCollapse {
            display: block;
            @media (max-width: 767px) {
                display: none;
            }
        }

        .pmtlSubtitle {
            margin-left: 0;
        }

        .pmtlContentContainer {
            margin-left: 0;
        }

        .ecosystemImg {
            display: none;
        }

        .ecosystemImgMobile {
            display: block;
            width: 310px;
            margin: 10px auto;
        }
    }
`;

const PMTLResourceView = ({data}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const sectionList = useRef([]);
    const PMTLContent = data.pmtlContent;
    if (PMTLContent) {
        sectionList.current = PMTLContent.map((element, i) => {
            return sectionList.current[i] || createRef()
        });
    }
    const handleScroll = () => {
        const bodyElement = document.getElementById('PMTLBody');
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
            e.target.className = 'pmtlTitleMobile sectionCollapse';
        } else {
            sectionList.current[i].current.style.display = 'block';
            e.target.className = 'pmtlTitleMobile';
        }
    }

    return (
        <PMTLResourceContainer headerImg={data.MCI_header} headerMobileImg={data.MCI_header_mobile}>
            <div className='resourceBreadcrumbContainer'>
                <div className='resourceBreadcrumb'>
                    <NavLink className="breadcrumbLink" to='/'>Home</NavLink>
                    <ArrowForwardIosIcon className='arrowIcon' alt="arrowIcon"/>
                    <span>Pediatric Molecular Target List (PMTL)</span>
                    </div>
            </div>
            <div className='resourceHeader'>
                <div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub</div></div>
            </div>
            <div className='resourceHeaderMobile'>
                <div className='resourceHeaderBackgroundMobile'><div className='resourceHeaderText'>CCDI Hub</div></div>
            </div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div className='resourceTitleText'>Pediatric Molecular Target Lists</div>
                    {/* <div className='goToSiteButton'>
                        <a className='goToSiteText' href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790" target="_blank" rel="noopener noreferrer">Request Access (dbGaP)</a>
                    </div> */}
                </div>
            </div>
            <PMTLResourceBody id='PMTLBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            PMTLContent && PMTLContent.map((pmtl, topicid) => {
                                const topickey = `topic_${topicid}`;
                                return (
                                    <>
                                        <div name={pmtl.id} className={selectedNavTitle === pmtl.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{pmtl.topic}</div>
                                        <div>
                                            {
                                                pmtl.list.map((pmtlItem, idx) => {
                                                    const listItemKey = `listItem_${idx}`;
                                                        return (
                                                            <div name={pmtlItem.id} className={selectedNavTitle === pmtlItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={listItemKey} onClick={handleClickEvent}>{pmtlItem.subtopic}</div>
                                                        )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {data.introText && <div className='introContainer'>{ReactHtmlParser(data.introText)}</div>}
                        {
                            PMTLContent && PMTLContent.map((pmtl, pmtlidx) => {
                                const pmtlkey = `pmtl_${pmtlidx}`;
                                return (
                                    <div key={pmtlkey}>
                                        <div id={pmtl.id} className='pmtlTitle'>{pmtl.topic && pmtl.topic}</div>
                                        <div id={pmtl.id} name={pmtlidx} className='pmtlTitleMobile sectionCollapse' onClick={handleCollapseSection}>{pmtl.topic && pmtl.topic}</div>
                                        <div className="pmtlSection mobileCollapse" ref={sectionList.current[pmtlidx]}>
                                        {
                                            pmtl.list.map((pmtlItem, idx) => {
                                                return (
                                                    <>
                                                        <div id={pmtlItem.id} className='pmtlSubtitle'>{pmtlItem.subtopic && pmtlItem.subtopic}</div>
                                                        <div className='pmtlContentContainer'>
                                                            {pmtlItem.content && ReactHtmlParser(pmtlItem.content)}
                                                            {/* {pmtlItem.donut && 
                                                            <div className='donutContainer'>
                                                                <div className='donutTitleContainer'><h4>{pmtlItem.donut.title}</h4></div>
                                                                <DonutChart
                                                                    data={pmtlItem.donut.data}
                                                                    innerRadiusP={65}
                                                                    outerRadiusP={115}
                                                                    paddingSpace={pmtlItem.donut.length === 1 ? 0 : 0.5}
                                                                    textColor="black"
                                                                />
                                                            </div>
                                                            } */}
                                                            {pmtlItem.diseaseTable && 
                                                            <>
                                                                <div className='PMTLDiseaseTableContainer'><MCIDiseaseTable table={pmtlItem.diseaseTable}/></div>

                                                                <div className='PMTLDiseaseTableMobileContainer'><MCIDiseaseTableMobile table={pmtlItem.diseaseTable}/></div>
                                                                <p>{pmtlItem.diseaseTable.footer}</p>
                                                            </>
                                                            }
                                                            {pmtlItem.map &&
                                                            <>
                                                                <div className='MapContainer'><MapView mapData={pmtlItem.map} /></div>
                                                                <div className='MapMobileContainer'><MapViewMobile mapData={pmtlItem.map}/></div>
                                                            </>
                                                            }
                                                            {pmtlItem.table &&
                                                            <>
                                                                <div className='PMTLTableContainer'><PMTLTable table={pmtlItem.table} /></div>
                                                                <div className='PMTLTableMobileContainer'><PMTLTableMobile table={pmtlItem.table} /></div>
                                                                <p>{pmtlItem.table.footer}</p>
                                                            </>
                                                            }
                                                            {pmtlItem.annotation && 
                                                            <>
                                                                <p style={{marginTop: "1em"}}>{pmtlItem.annotation}</p>
                                                            </>
                                                            }
                                                            {pmtlItem.searchTable &&
                                                            <>
                                                                <div className='PMTLSearchTableContainer'><MCISearchTable table={pmtlItem.searchTable} /></div>
                                                                <div className='PMTLSearchTableMobileContainer'><MCISearchTableMobile table={pmtlItem.searchTable} /></div>
                                                            </> }
                                                            {/* {pmtlItem.numberTable && 
                                                            <>
                                                                <MCINumberTable table={pmtlItem.numberTable} />
                                                                <div>{pmtlItem.numberTable.footer}</div>
                                                            </>
                                                            } */}
                                                        </div>
                                                        {pmtlItem.content && <div style={{height: '40px'}} />}
                                                    </>
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
            </PMTLResourceBody>
        </PMTLResourceContainer>
    )
}

export default PMTLResourceView;
