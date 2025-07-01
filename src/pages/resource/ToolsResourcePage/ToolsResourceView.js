import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import headerImg from '../../../assets/about/Data_Usage_Policies_Header.png';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';
import closeIcon from '../../../assets/icons/Close_Icon.svg';
import arrowDownIcon from '../../../assets/icons/Arrow_Down.svg';

const ToolsContainer = styled.div`
    width: 100%;

    .headerContainer {
        width: 1142px;
        height: 140px;
        margin: 0 auto;
        background-image: url(${headerImg});
        background-repeat: no-repeat;
        background-color: #87D7DCCC; 
        border-radius: 0px 0px 20px 20px;
        font-family: 'Poppins';
        font-weight: 600;
        font-size: 35px;
        line-height: 38px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (min-width: 1420px) {
            margin: 0 auto;
        }

        @media (max-width: 1186px) {
            height: 140px;
            width: auto;
            margin: 0 16px;
        }
    }

    .headerText {
        line-height: 38px;
        width: 320px;
        /* Remove padding-top and margin to allow flex centering */
        padding-top: 0;
        margin: 0;
        
        @media (max-width: 767px) {
            padding-top: 0;
            width: 270px;
        }
    }
`;

const ToolsBody = styled.div`
    @media (min-width: 1420px) {
        width: 1420px;
    }

    margin: 0 auto;
    display: flex;
    padding: 55px 135px 0 135px; 

    p {
        font-weight: 500;
    }

    li {
        font-weight: 500;
    }

    .navSection {
        width: 25%;
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
        color: #477C90;
    }

    .navTopicItem:hover {
        cursor: pointer;
        font-family: Inter;
        font-weight: 600;
        color: #477C90;
    }

    .subtitle {
        margin-left: 20px;
    }

    .contentSection {
        display: flex;
        width: 75%;
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
        color: #007A85;

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
    
    li {
         margin-bottom: 20px;
    }

    .mciContentContainer {
        font-family: Inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;

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

    .calloutBox {
        color: #05555C;
        margin: 40px 40px;
        padding: 20px 30px;
        font-family: Poppins;
        font-size: 18px;
        font-style: italic;
        font-weight: 500;
        line-height: 26px;
        letter-spacing: -0.002em;
        text-align: left;
        border-radius: 15px;
        border: 3px solid #C8E0E4;
        background: #F2F9FA;

        .link {
            color: #05555C;
            font-weight: 500;
        }

        a {
            color: #05555C;
            font-weight: 500;
        }
    }

     @media (max-width: 1400px) {
        padding: 55px calc(50% - 550px) 0 calc(50% - 550px); 
    }

    @media (max-width: 1186px) {
        padding: 55px 32px 0 32px; 
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

const ToolsResourceView = ({data}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const toolsContent = data.toolsContent;
    const sectionList = useRef([]);
    sectionList.current = toolsContent.map((element, i) => {
        return sectionList.current[i] || createRef()
    });
    const handleScroll = () => {
        const bodyElement = document.getElementById('ToolsBody');
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
        <ToolsContainer>
             <div className='headerContainer'><div className='headerText'>Tools</div></div>
            <ToolsBody id='ToolsBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            toolsContent && toolsContent.map((toolsItem, topicid) => {
                                const topickey = `topic_${topicid}`;
                                if (toolsItem.topic) {
                                    return (
                                        <div name={toolsItem.id} className={selectedNavTitle === toolsItem.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{toolsItem.topic}</div>
                                    )
                                }
                                return (
                                    <div name={toolsItem.id} className={selectedNavTitle === toolsItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={topickey} onClick={handleClickEvent}>{toolsItem.subtopic}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                    {data.toolsIntroText && <div className='introContainer'>{ReactHtmlParser(data.toolsIntroText)}</div>}
                        {
                            toolsContent && toolsContent.map((toolsItem, toolid) => {
                                const toolkey = `federation_${toolid}`;
                                return (
                                    <div key={toolkey}>
                                        <div id={toolsItem.id} className='mciTitle'>{toolsItem.topic && toolsItem.topic}</div>
                                        {/* <div id={toolsItem.id} className='mciSubtitle'>{toolsItem.subtopic && toolsItem.subtopic}</div> */}
                                        <div id={toolsItem.id} name={toolid} className='mciTitleMobile sectionCollapse' onClick={handleCollapseSection}>{toolsItem.topic && toolsItem.topic}</div>
                                        <div className="mciSection mobileCollapse" ref={sectionList.current[toolid]}>
                                            <div className='mciContentContainer'>
                                                {toolsItem.content && ReactHtmlParser(toolsItem.content)}
                                            </div>
                                            {toolsItem.content && <div style={{height: '40px'}} />}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </ToolsBody>
        </ToolsContainer>
    )
}

export default ToolsResourceView;
