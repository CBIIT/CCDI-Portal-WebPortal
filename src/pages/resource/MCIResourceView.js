import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { NavLink } from 'react-router-dom';
import { MCIContent } from '../../bento/mciData';
import headerImg from '../../assets/resources/MCI_header_white.png';
import exportIcon from '../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../assets/icons/Export_Icon.svg';
import ccdiDataEcosystemImg from '../../assets/resources/MCI_CCDI_Data_Ecosystem.png';
import MCITable from './components/MCITable';
import MCISearchTable from './components/MCISearchTable';
import MCINumberTable from './components/MCINumberTable';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DonutChart from '../../components/common/DonutChart';
import MapView from '../../components/common/mapGenerator';

const MCIResourceContainer = styled.div`
    width: 100%;

    .resourceBreadcrumbContainer {
        width: 1420px;
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
        width: 1420px;
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
        width: 1420px;
        margin: 0 auto;
        display: flex;
        line-height: 64px;
        background: #087D6F;
        font-family: Poppins;
        font-weight: 600;
        color: #ffffff;
        font-size: 35px;
        padding-left: 75px;
    }

    .goToSiteButton {
        display: flex;
        margin-left: auto;
        background: #035D63;
        font-weight: 400;
        font-size: 19px;
        padding: 0 38px;
    }

    .goToSiteText {
        color: #FFFFFF;
        text-decoration: none;
        padding-right: 34px;
        letter-spacing: 0.02em;
        background: url(${exportIcon}) right center no-repeat;
    }
`;

const MCIResourceBody = styled.div`
    width: 1420px;
    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px; 
    .navSection {
        width: 20%;
        color: #4D889E;
        position: relative;
    }

    .navList {
        position: static;
    }

    .navListSticky {
        position: fixed;
        top: 55px;
        width: 272px;
    }
    .navListAbsolute {
        position: absolute;
        bottom: 0;
        width: 272px;
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

    .contentSection {
        display: flex;
        width: 80%;
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
    }

    p {
        margin-top: 0;
    }

    .mciContentContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 60px;

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
`;

const MCIResourceView = () => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const handleScroll = () => {
        const bodyElement = document.getElementById('MCIBody');
        const footerList = document.getElementsByTagName('footer');
        let footer;
        if (window.innerWidth >= 1024) {
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
            <div className='resourceHeader'><div className='resourceHeaderBackground'><div className='resourceHeaderText'>CCDI Hub</div></div></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    Molecular Characterization Initiative
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
                            MCIContent.map((mciItem, topicid) => {
                                const topickey = `topic_${topicid}`;
                                return (
                                    <div name={mciItem.id} className={selectedNavTitle === mciItem.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{mciItem.topic}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {
                            MCIContent.map((mciItem, mciid) => {
                                const mcikey = `mci_${mciid}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={mciItem.id} className='mciTitle'>{mciItem.topic}</div>
                                        <div className='mciContentContainer'>
                                            {ReactHtmlParser(mciItem.content)}
                                            {mciItem.map && <MapView />}
                                            {mciItem.topic.includes('CCDI Data Ecosystem') && <img src={ccdiDataEcosystemImg} alt="CCDI Data Ecosystem"/>}
                                            {mciItem.table &&
                                            <>
                                                <MCITable table={mciItem.table} />
                                                <div>{mciItem.table.footer}</div>
                                            </>
                                            }
                                            {mciItem.searchTable && <MCISearchTable table={mciItem.searchTable} /> }
                                            {mciItem.numberTable && 
                                            <>
                                                <MCINumberTable table={mciItem.numberTable} />
                                                <div>{mciItem.numberTable.footer}</div>
                                            </>
                                            }
                                            {mciItem.donut && 
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
                                            }
                                        </div>
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
