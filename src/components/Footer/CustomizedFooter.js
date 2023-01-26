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
  height: 260px;
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
  margin: 54px 87px 0 auto;
  display: flex;

  .footItem {
    width: 253px; 
  }

  .footItemTitle {
    font-family: Open Sans;
    color: #393C3C;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .footItemSubtitle {
    margin-bottom: 10px;
  }

  .footItemLink {
    font-family: Open Sans;
    color: #393C3C;
    font-weight: 600;
    font-size: 12px;
    text-decoration: none;
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
                        FooterData.link_sections.map((linkItem, itemidx) => {
                            return (
                                <div className='footItem'>
                                    <div className='footItemTitle'>{linkItem.title}</div>
                                    {
                                        linkItem.items.map((item) => {
                                            return (
                                                <div className='footItemSubtitle'>
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
        </FooterContainer>
    </FooterStyled>
  )
};

export default Footer;
