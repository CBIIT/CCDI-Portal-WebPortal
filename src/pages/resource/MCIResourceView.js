import React, { useState } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { MCIContent } from '../../bento/mciData';
import headerImg from '../../assets/resources/resource_header.svg';
import exportIcon from '../../assets/resources/Explore_Icon.svg';
import exportIconBlue from '../../assets/icons/Export_Icon.svg';

const MCIResourceContainer = styled.div`
    width: 100%;

    .resourceBreadcrumbContainer {
        width: 1420px;
        margin: 0 auto;
    }

    .resourceBreadcrumb {
        margin-left: 32px;
        line-height: 27px;
        color: #5666BD;
    }

    .resourceHeader {
        width: 100%;
        height: 214px;
        background-image: url(${headerImg});
        background-size: cover;
    }

    .resourceHeaderText {
        width: 1420px;
        margin: 0 auto;
        height: 214px;
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
    padding: 55px 32px; 
    .navSection {
        display: flex;
        width: 20%;
        color: #4D889E;
    }

    .navTitle {
        font-family: Poppins;
        font-weight: 600;
        font-size: 17px;
        letter-spacing: 0.02em;
        margin-bottom: 20px;
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
`;

const MCIResourceView = () => {
    const [selectedNavTitle, setSelectedNavTitle] = useState('');

    const handleClickEvent = (event) => {
        const id = event.target.getAttribute('name');
        setSelectedNavTitle(id);
        const element = document.getElementById(id);
        window.scrollTo({ 
            top: element.offsetTop, 
            behavior: "smooth" 
        });
    }

    return (
        <MCIResourceContainer>
            <div className='resourceBreadcrumbContainer'>
                <div className='resourceBreadcrumb'>Explore Applications / Molecular Characterization Initative</div>
            </div>
            <div className='resourceHeader'><div className='resourceHeaderText'>CCDI Hub</div></div>
            <div className='resourceTitleContainer'>
                <div className='resourceTitle'>
                    Molecular Characterization Initiative
                    <div className='goToSiteButton'>
                        <a className='goToSiteText' href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization" target="_blank" rel="noopener noreferrer">Go to site</a>
                    </div>
                </div>
            </div>
            <MCIResourceBody>
                <div className='navSection'>
                    <div className='navList'>
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
                                        { mciItem.topic !== 'Introduction' && <div id={mciItem.id} className='mciTitle'>{mciItem.topic}</div>}
                                        <div id={ mciItem.topic === 'Introduction' && mciItem.id } className='mciContentContainer'>{ReactHtmlParser(mciItem.content)}</div>
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
