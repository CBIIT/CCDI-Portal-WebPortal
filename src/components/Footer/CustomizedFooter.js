import React from 'react';
import styled from 'styled-components';
import FooterData from '../../bento/globalFooterData';

const FooterStyled = styled.footer`
  background-color: #CCCED1;
  border-top: 1px solid #6C727B;
  bottom: 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;

const FooterUpperContainer = styled.div`
  display: flex;
`;

const FooterLogo = styled.div`
  padding: 30px 0 0 66px;

  .logoText {
    text-decoration: none;
  }

  .logoUpperText {
    font-family: Inter;
    font-weight: 700;
    font-size: 19px;
    color: #393C3C;
  }

  .logoLowerText {
    font-family: Inter;
    font-weight: 700;
    font-size: 12px;
    color: #393C3C;
  }
`;

const FooterLinksContainer = styled.div`
  margin: 54px 87px 23px auto;
  display: flex;

  .footItem {
    width: 253px; 
  }

  .footItemTitle {
    font-family: Open Sans;
    color: #393C3C;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 7px;
  }

  .footItemSubtitle {
    margin-bottom: 7px;
  }

  .footItemLink {
    font-family: Open Sans;
    color: #393C3C;
    font-weight: 600;
    font-size: 12px;
    text-decoration: none;
  }
`;

const GlobalFooterContainer = styled.div`
  padding-bottom: 64px;
  height: 10px;
  display: flex;
  justify-content: center;
  font-size: 9px;
  font-family: Open Sans;
  font-weight: 600;
  color: #393C3C;

  .globalFooterItemLink{
    color: #393C3C;
    text-decoration: none;
  }

  .footerSplit {
    margin: 0 15px;
  }
`;

const Footer = () => {
  return (
    <FooterStyled role="contentinfo">
        <FooterContainer>
            <FooterUpperContainer>
                <FooterLogo>
                  <a className='logoText' href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                    <div className='logoUpperText'>National Cancer Institute</div>
                    <div className='logoLowerText'>at the National Institutes of Health</div>
                  </a>
                </FooterLogo>
                <FooterLinksContainer>
                    {
                        FooterData.link_sections.map((linkItem, linkidx) => {
                            const linkkey =  `link_${linkidx}`;
                            return (
                                <div className='footItem' key={linkkey}>
                                    <div className='footItemTitle'>{linkItem.title}</div>
                                    {
                                        linkItem.items.map((item, itemidx) => {
                                            const itemkey =  `item_${itemidx}`;
                                            return (
                                                <div className='footItemSubtitle' key={itemkey}>
                                                    {
                                                        item.link.includes('http') ? 
                                                        <a className='footItemLink' href={item.link} target="_blank" rel="noopener noreferrer">{item.text}</a>
                                                        :
                                                        <a className='footItemLink' href={item.link}>{item.text}</a>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </FooterLinksContainer>
            </FooterUpperContainer>
            <GlobalFooterContainer>
                {
                    FooterData.global_footer_links.map((linkItem, idx) => {
                        const linkitemkey = `linkitem_${idx}`;
                        return (
                            <div className='globalFooterItem' key={linkitemkey}>
                                <a className='globalFooterItemLink' href={linkItem.link} target="_blank" rel="noopener noreferrer">{linkItem.text}</a>
                                { idx !== FooterData.global_footer_links.length - 1 ? <span className='footerSplit'>|</span> : null}
                            </div>
                        )
                    })
                }
            </GlobalFooterContainer>
        </FooterContainer>
    </FooterStyled>
  )
};

export default Footer;
