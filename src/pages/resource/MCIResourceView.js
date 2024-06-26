import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
import { MCIContent } from '../../bento/mciData';
import headerImg from '../../assets/resources/MCI_header_white.png';
import headerMobileImg from '../../assets/resources/MCI_header_white_mobile.png';
import exportIcon from '../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../assets/icons/Export_Icon.svg';
import ccdiDataEcosystemImg from '../../assets/resources/MCI_CCDI_Data_Ecosystem.png';
import ccdiDataEcosystemMobileImg from '../../assets/resources/MCI_CCDI_Data_Ecosystem_Mobile.png';
import MCITable from './components/MCITable';
import MCITableMobile from './components/MCITableMobile';
import MCISearchTable from './components/MCISearchTable';
import MCISearchTableMobile from './components/MCISearchTableMobile';
import MCIDiseaseTable from './components/MCIDiseaseTable';
import MCIDiseaseTableMobile from './components/MCIDiseaseTableMobile';
//import MCINumberTable from './components/MCINumberTable';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
//import DonutChart from '../../components/common/DonutChart';
import MapView from '../../components/common/mapGenerator';
import MapViewMobile from './components/MapViewMobile';

const MCIResourceContainer = styled.div`
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
        background-image: url(${headerImg});
        background-repeat:no-repeat;
        background-position:center;
    }

    .resourceHeaderBackgroundMobile {
        width: 100%;
        height: 214px;
        background-image: url(${headerMobileImg});
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

const MCIResourceBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px; 
    .navSection {
        width: 240px;
        color: #4D889E;
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
        color: #4D889E;
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

    .mciTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 25px;
        line-height: 26px;
        letter-spacing: -0.02em;
        margin-bottom: 20px;
        color: #05555C;
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
        min-width: 0;
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

    .MCITableMobileContainer {
        display: none;
    }

    .MCISearchTableMobileContainer {
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

    .MCIDiseaseTableMobileContainer {
        display: none;
    }

    @media (max-width: 1023px) {
        .MCITableContainer {
            display: none;
        }
        .MCITableMobileContainer {
            display: block;
        }
        
        .MCISearchTableContainer {
            display: none;
        }

        .MCISearchTableMobileContainer {
            display: block;
        }
        
        .MapContainer {
            display: none;
        }

        .MapMobileContainer {
            display: block;
        }

        .MCIDiseaseTableContainer {
            display: none;
        }

        .MCIDiseaseTableMobileContainer {
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

        .mciSubtitle {
            margin-left: 0;
        }

        .mciContentContainer {
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

const MCIResourceView = () => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
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

    return (
        <MCIResourceContainer>
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
            <div className='resourceHeaderMobile'>
                <div className='resourceHeaderBackgroundMobile'><div className='resourceHeaderText'>CCDI Hub</div></div>
            </div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    <div className='resourceTitleText'>Molecular Characterization Initiative</div>
                    <div className='goToSiteButton'>
                        <a className='goToSiteText' href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002790" target="_blank" rel="noopener noreferrer">Request Access (dbGaP)</a>
                    </div>
                </div>
            </div>
            <MCIResourceBody id='MCIBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            MCIContent.map((mci, topicid) => {
                                const topickey = `topic_${topicid}`;
                                return (
                                    <>
                                        <div name={mci.id} className={selectedNavTitle === mci.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{mci.topic}</div>
                                        <div>
                                            {
                                                mci.list.map((mciItem, idx) => {
                                                    const listItemKey = `listItem_${idx}`;
                                                        return (
                                                            <div name={mciItem.id} className={selectedNavTitle === mciItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={listItemKey} onClick={handleClickEvent}>{mciItem.subtopic}</div>
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
                        {
                            MCIContent.map((mci, mciid) => {
                                const mcikey = `mci_${mciid}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={mci.id} className='mciTitle'>{mci.topic && mci.topic}</div>
                                        {
                                            mci.list.map((mciItem) => {
                                                return (
                                                    <div>
                                                        <div id={mciItem.id} className='mciSubtitle'>{mciItem.subtopic && mciItem.subtopic}</div>
                                                        <div className='mciContentContainer'>
                                                            {mciItem.content && ReactHtmlParser(mciItem.content)}
                                                            {/* {mciItem.donut && 
                                                            <div className='donutContainer'>
                                                                <div className='donutTitleContainer'><h4>{mciItem.donut.title}</h4></div>
                                                                <DonutChart
                                                                    data={mciItem.donut.data}
                                                                    innerRadiusP={65}
                                                                    outerRadiusP={115}
                                                                    paddingSpace={mciItem.donut.length === 1 ? 0 : 0.5}
                                                                    textColor="black"
                                                                />
                                                            </div>
                                                            } */}
                                                            {mciItem.diseaseTable && mciItem.diseaseDonut && 
                                                            <>
                                                                <div className='MCIDiseaseTableContainer'><MCIDiseaseTable table={mciItem.diseaseTable} donut={mciItem.diseaseDonut}/></div>
                                                                <div className='MCIDiseaseTableMobileContainer'><MCIDiseaseTableMobile table={mciItem.diseaseTable}/></div>
                                                                <div>{mciItem.diseaseTable.footer}</div>
                                                            </>
                                                            }
                                                            {mciItem.map &&
                                                            <>
                                                                <div className='MapContainer'><MapView mapData={mciItem.map} /></div>
                                                                <div className='MapMobileContainer'><MapViewMobile mapData={mciItem.map}/></div>
                                                            </>
                                                            }
                                                            {mciItem.content && mciItem.content.includes('CCDI Data Ecosystem?') && 
                                                            <>
                                                                <img className="ecosystemImg" src={ccdiDataEcosystemImg} alt="CCDI Data Ecosystem"/>
                                                                <img className="ecosystemImgMobile" src={ccdiDataEcosystemMobileImg} alt="CCDI Data Ecosystem Mobile"/>
                                                                <p style={{marginTop: '24px'}}>MCI assays and data types, and the data flow to patients, providers, and the CCDI Data Ecosystem.</p>
                                                            </>
                                                            }
                                                            {mciItem.table &&
                                                            <>
                                                                <div className='MCITableContainer'><MCITable table={mciItem.table} /></div>
                                                                <div className='MCITableMobileContainer'><MCITableMobile table={mciItem.table} /></div>
                                                                <div>{mciItem.table.footer}</div>
                                                            </>
                                                            }
                                                            {mciItem.annotation && 
                                                            <>
                                                                <p style={{marginTop: "1em"}}>{mciItem.annotation}</p>
                                                            </>
                                                            }
                                                            {mciItem.searchTable &&
                                                            <>
                                                                <div className='MCISearchTableContainer'><MCISearchTable table={mciItem.searchTable} /></div>
                                                                <div className='MCISearchTableMobileContainer'><MCISearchTableMobile table={mciItem.searchTable} /></div>
                                                            </> }
                                                            {/* {mciItem.numberTable && 
                                                            <>
                                                                <MCINumberTable table={mciItem.numberTable} />
                                                                <div>{mciItem.numberTable.footer}</div>
                                                            </>
                                                            } */}
                                                        </div>
                                                        {mciItem.content && <div style={{height: '40px'}} />}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </MCIResourceBody>
        </MCIResourceContainer>
    )
}

export default MCIResourceView;
