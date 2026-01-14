import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import exportIcon from '../../../assets/resources/Explore_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';
// import { cpiResourceData, introText } from '../../../bento/cpiResourceData';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import blurBorder from '../../../assets/resources/blur_border.svg';
import blurBorderMobile from '../../../assets/resources/blur_border_mobile.svg';

const CPIResourceContainer = styled.div`
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
        padding: 15px 0 15px 75px;
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
        .resourceTitle {
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

        .resourceTitle {
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

const ResourceHeaderBackground = styled.div`
    width: 100%;
    height: 214px;
    background-image: url(${props => props.headerImg || ''});
    background-repeat: no-repeat;
    background-position: center;
`;

const CPIResourceBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 32px 0 32px; 

    p {
        font-weight: 500;
    }

    li {
        font-weight: 500;
    }

    .navSection {
        width: 240px;
        color: #4D889E;
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
            font-weight: 700;
            text-decoration: underline;
            text-underline-position: under;
            line-break: anywhere;
        }
    }

    .infoContainer {
        text-align: center;
        width: 100%;
        font-family: Poppins;
        color: #919191;
        font-weight: 500;
        font-size: 13px;
        line-height: 22px;
        letter-spacing: 0.26px;
        text-transform: uppercase;
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
        padding: 0 32px 0 20px;
        margin-bottom: 100px;

        @media (max-width: 1023px) {
            width: calc(100% - 197px);
            padding-left: 0;
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
            font-weight: 700;
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

    .CPIImg {
        width: 100%;
        height: 100%;
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

    @media (max-width: 1023px) {
        padding: 43px 16px 0 16px; 
        .navSection {
            width: 197px;
        }

        .navListSticky {
            width: 197px;
        }
        .navListAbsolute {
            width: 197px;
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

const CPIStatsContainer = styled.div`
    width: 100%;
    background: white;
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: center;
    margin-bottom: 50px;

    .statsHeader {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
    }

    .statsTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 19px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        letter-spacing: 0.38px;
    }

    .statsSubtitle {
        font-family: 'Open Sans';
        font-weight: 400;
        font-size: 14px;
        line-height: 1.2;
        color: #0f253a;
    }

    .statsContent {
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: flex-start;
        width: 100%;
        max-width: 710px;
    }

    .statRow {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .statItem {
        display: flex;
        gap: 15px;
        align-items: stretch;
        width: 100%;
    }

    .statIcon {
        flex-shrink: 0;
        width: 50px;
        display: flex;
        align-items: center;
    }

    .statInfo {
        display: flex;
        flex-direction: column;
        border-right: 0.75px solid #919191;
    }

    .statLabel {
        font-family: Poppins;
        font-weight: 500;
        font-size: 13px;
        line-height: 22px;
        color: #919191;
        text-transform: uppercase;
        letter-spacing: 0.26px;
        margin-bottom: 0;
    }

    .statValue {
        display: flex;
        gap: 8px;
        align-items: center;
        color: #00838f;
    }

    .statNumber {
        font-family: Poppins;
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.4px;
        line-height: 25px;
    }

    .statUnit {
        font-family: Poppins;
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 0.36px;
        line-height: 21px;
    }

    .statDescription {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #0f253a;
        width: 370px;
    }

    .linkageItem {
        display: flex;
        gap: 5px;
        align-items: flex-start;
        font-size: 16px;
        line-height: 16px;
    }

    .statListItemNumber {
        font-family: Inter;
        font-weight: 500;
        color: #0f253a;
        // text-decoration: underline;
    }

    .statListItemText {
        font-family: Inter;
        font-weight: 500;
        color: #0f253a;
    }

    .statList {
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: flex-start;
    }

    @media (min-width: 1024px) {
        .statLabel {
            width: 235px;
        }
    }

    @media (max-width: 1023px) {
        
        .statsContent {
            padding: 0;
            max-width: 539px;
        }

        .statItem {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .statInfo {
            border-right: none;
            align-items: flex-start;
        }

        .statLabel {
            text-align: left;
        }

        .statValue {
            justify-content: flex-start;
        }

        .statDescription {
            width: 375px;
            margin-left: 0;
            margin-top: 10px;
            border-top: 0.75px solid #919191;
            padding-top: 8px;
        }

        .statList {
            width: 375px;
            margin-top: 10px;
            border-top: 0.75px solid #919191;
            padding-top: 8px;
            border-collapse: separate;
            border-spacing: 0 6px;
        }

        .statListContainer {
            display: table;
            margin: 0 auto;
        }

        .linkageItem {
            display: table-row;
        }

        .statListItemNumber {
            display: table-cell;
            padding-right: 8px;
            vertical-align: top;
            text-align: right;
        }

        .statListItemText {
            display: table-cell;
            vertical-align: top;
        }
    }

    @media (max-width: 767px) {

        .statsContent {
            max-width: 343px;
        }

        .statDescription {
            width: 270px;
        }

        .statDescriptionContainer {
            margin: 0 auto;
            width: 220px;
        }

        .statList {
            width: 270px;
        }

        .statListContainer {
            max-width: 226px;
            margin: 0 auto;
        }
    }
`;

const CPIResourceView = ({data, cpiStats, loadingCpiStats, cpiStatsError}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const sectionList = useRef([]);
    // sectionList.current = cpiResourceData.map((element, i) => {
    //     return sectionList.current[i] || createRef()
    // });
    const cpiContent = data.cpiContent;
    if (cpiContent) {
        sectionList.current = cpiContent.map((element, i) => {
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
        
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        window.addEventListener("resize", handleResize);
        
        return () => {
            document.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
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
        <CPIResourceContainer>
            <div className='resourceHeader'><ResourceHeaderBackground headerImg={data && data.CPI_Header_URL}><div className='resourceHeaderText'>CCDI Hub</div></ResourceHeaderBackground></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>CCDI Participant Index</div>
            </div>
            <CPIResourceBody id='FederationBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            cpiContent && cpiContent.map((cpiItem, topicid) => {
                                const topickey = `topic_${topicid}`;
                                if (cpiItem.topic) {
                                    return (
                                        <div name={cpiItem.id} className={selectedNavTitle === cpiItem.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{cpiItem.topic}</div>
                                    )
                                }
                                return (
                                    <div name={cpiItem.id} className={selectedNavTitle === cpiItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={topickey} onClick={handleClickEvent}>{cpiItem.subtopic}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                        {data.cpiIntroText && <div className='introContainer'>{ReactHtmlParser(data.cpiIntroText)}</div>}
                        <CPIStatsContainer>
                            <img className='blurBorder' src={isMobile ? blurBorderMobile : blurBorder} alt="blurBorder" />
                            <div className='statsHeader'>
                                <div className='statsTitle'>CPI Stats at a Glance</div>
                                <div className='statsSubtitle'>Summary of CPI v1.5</div>
                            </div>
                            {loadingCpiStats ? (
                                <div className='infoContainer'>Loading Statistics...</div>
                            ) : cpiStatsError || !cpiStats ? (
                                <div className='infoContainer'>Statistic Temporarily Unavailable</div>
                            ) : (
                                <div className='statsContent'>
                                    <div className='statRow'>
                                        <div className='statItem'>
                                            <div className='statIcon'>
                                                <img src={data.CPI_Unique_Participants_Icon_URL} alt="CPI_Unique_Participants_Icon" />
                                            </div>
                                            <div className='statInfo'>
                                                <div className='statLabel'>Total unique participants</div>
                                                <div className='statValue'>
                                                    <div className='statNumber'>{cpiStats.participant_statistics.unique_participant_count.toLocaleString()}</div>
                                                    <div className='statUnit'>Individuals</div>
                                                </div>
                                            </div>
                                            <div className='statDescription'>
                                                <div className='statDescriptionContainer'>
                                                    Deduplicated count of unique individuals across all domains
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='statRow'>
                                        <div className='statItem'>
                                            <div className='statIcon'>
                                                <img src={data.CPI_Total_Mapped_Participants_Ids_Icon_URL} alt="CPI_Total_Mapped_Participants_Ids_Icon" />
                                            </div>
                                            <div className='statInfo'>
                                                <div className='statLabel'>Total mapped participants IDs</div>
                                                <div className='statValue'>
                                                    <div className='statNumber'>{cpiStats.participant_statistics.mapped_participant_count.toLocaleString()}</div>
                                                    <div className='statUnit'>Mappings</div>
                                                </div>
                                            </div>
                                            <div className='statDescription'>
                                                <div className='statDescriptionContainer'>
                                                    Participant IDs may occur in multiple datasets and/or other domains
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='statRow'>
                                        <div className='statItem'>
                                            <div className='statIcon'>
                                                <img src={data.CPI_Cross_Dataset_Linkages_Icon_URL} alt="CPI_Cross_Dataset_Linkages_Icon" />
                                            </div>
                                            <div className='statInfo'>
                                                <div className='statLabel'>Cross-dataset linkages</div>
                                            </div>
                                            <div className='statList'>
                                                <div className='statListContainer'>
                                                    <div className='linkageItem'>
                                                        <span className='statListItemNumber'>{cpiStats.participant_statistics.unique_participants_by_dataset[0].participant_count.toLocaleString()}</span>
                                                        <span className='statListItemText'>Participants mapped across {cpiStats.participant_statistics.unique_participants_by_dataset[0].dataset_count.toLocaleString()} datasets</span>
                                                    </div>
                                                    <div className='linkageItem'>
                                                        <span className='statListItemNumber'>{cpiStats.participant_statistics.unique_participants_by_dataset[1].participant_count.toLocaleString()}</span>
                                                        <span className='statListItemText'>Participants mapped across {cpiStats.participant_statistics.unique_participants_by_dataset[1].dataset_count.toLocaleString()} datasets</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='statRow'>
                                        <div className='statItem'>
                                            <div className='statIcon'>
                                                <img src={data.CPI_Domain_Coverage_Icon_URL} alt="CPI_Domain_Coverage_Icon" />
                                            </div>
                                            <div className='statInfo'>
                                                <div className='statLabel'>Domain Coverage</div>
                                                <div className='statValue'>
                                                    <div className='statNumber'>{cpiStats.counts_by_domain.length}</div>
                                                    <div className='statUnit'>Total domains</div>
                                                </div>
                                            </div>
                                            <div className='statList'>
                                                <div className='statListContainer'>
                                                    <div className='linkageItem'>
                                                        <span className='statListItemNumber'>{cpiStats.counts_by_domain.filter(item => item.domain_category === "organizational_identifier").length.toLocaleString()}</span>
                                                        <span className='statListItemText'>Organizational Identifiers</span>
                                                    </div>
                                                    <div className='linkageItem'>
                                                        <span className='statListItemNumber'>{cpiStats.counts_by_domain.filter(item => item.domain_category === "dataset").length.toLocaleString()}</span>
                                                        <span className='statListItemText'>Datasets</span>
                                                    </div>
                                                    <div className='linkageItem'>
                                                        <span className='statListItemNumber'>{cpiStats.counts_by_domain.filter(item => item.domain_category === "study").length.toLocaleString()}</span>
                                                        <span className='statListItemText'>Studies</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <img className='blurBorder' src={isMobile ? blurBorderMobile : blurBorder} alt="blurBorder" />
                        </CPIStatsContainer>
                        {
                            cpiContent && cpiContent.map((cpiItem, mciid) => {
                                const cpikey = `cpi_${mciid}`;
                                return (
                                    <div key={cpikey}>
                                        <div id={cpiItem.id} className='mciTitle'>{cpiItem.topic && cpiItem.topic}</div>
                                        <div id={cpiItem.id} name={mciid} className='mciTitleMobile sectionCollapse' onClick={handleCollapseSection}>{cpiItem.topic && cpiItem.topic}</div>
                                        <div className="mciSection mobileCollapse" ref={sectionList.current[mciid]}>
                                            <div className='mciContentContainer'>
                                                {cpiItem.content && ReactHtmlParser(cpiItem.content)}
                                                
                                                {cpiItem.id && cpiItem.id.includes('CPI_Components') && 
                                                <div>
                                                    <img className='CPIImg' src={data.CPI_Img_URL} alt="Flow of data from submitters through CCDI Participant Index to CPI authorized applications."/>
                                                </div>
                                                }
                                            </div>
                                            {cpiItem.content && <div style={{height: '40px'}} />}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </CPIResourceBody>
        </CPIResourceContainer>
    )
}

export default CPIResourceView;
