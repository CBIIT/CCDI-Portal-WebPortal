import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import headerImg from '../../../assets/about/Data_Usage_Policies_Header.jpg';
// import { dataUsagePoliciesContent, introText } from '../../../bento/dataUsagePoliciesData';
import exportIconBlue from '../../../assets/icons/Export_Icon.svg';

const DataUsagePoliciesContainer = styled.div`
    width: 100%;

    .policiesHeaderContainer {
        width: 1142px;
        height: 140px;
        margin: 0 134px;
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
        padding: 34px 400px;

        @media (min-width: 1420px) {
            margin: 0 auto;
        }
    }
`;

const DataUsagePoliciesBody = styled.div`
    width: 1420px;
    margin: 0 auto;
    display: flex;
    padding: 55px 135px 0 135px; 
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
        }
    }
`;

const DataUsagePoliciesView = ({data}) => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');
    const [stickyNavStyle, setStickyNavStyle] = useState('navList');
    const dataUsagePoliciesContent = data.dataUsagePoliciesContent;
    const handleScroll = () => {
        const bodyElement = document.getElementById('DataUsagePoliciesBody');
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
        <DataUsagePoliciesContainer>
             <div className='policiesHeaderContainer'>CCDI Data Usage Policies & Terms</div>
            <DataUsagePoliciesBody id='DataUsagePoliciesBody'>
                <div className='navSection'>
                    <div className={stickyNavStyle} id='leftNav'>
                        <div className='navTitle'>TOPICS</div>
                        {
                            dataUsagePoliciesContent && dataUsagePoliciesContent.map((policiesItem, topicid) => {
                                const topickey = `topic_${topicid}`;
                                if (policiesItem.topic) {
                                    return (
                                        <div name={policiesItem.id} className={selectedNavTitle === policiesItem.id ? 'navTopicItem selected' : 'navTopicItem'} key={topickey} onClick={handleClickEvent}>{policiesItem.topic}</div>
                                    )
                                }
                                return (
                                    <div name={policiesItem.id} className={selectedNavTitle === policiesItem.id ? 'navTopicItem selected subtitle' : 'navTopicItem subtitle'} key={topickey} onClick={handleClickEvent}>{policiesItem.subtopic}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='contentSection'>
                    <div className='contentList'>
                    {data.dataUsagePoliciesIntroText && <div className='introContainer'>{ReactHtmlParser(data.dataUsagePoliciesIntroText)}</div>}
                        {
                            dataUsagePoliciesContent && dataUsagePoliciesContent.map((policiesItem, mciid) => {
                                const mcikey = `federation_${mciid}`;
                                return (
                                    <div key={mcikey}>
                                        <div id={policiesItem.id} className='mciTitle'>{policiesItem.topic && policiesItem.topic}</div>
                                        <div id={policiesItem.id} className='mciSubtitle'>{policiesItem.subtopic && policiesItem.subtopic}</div>
                                        <div className='mciContentContainer'>
                                            {policiesItem.content && ReactHtmlParser(policiesItem.content)}
                                        </div>
                                        {policiesItem.content && <div style={{height: '40px'}} />}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </DataUsagePoliciesBody>
        </DataUsagePoliciesContainer>
    )
}

export default DataUsagePoliciesView;
