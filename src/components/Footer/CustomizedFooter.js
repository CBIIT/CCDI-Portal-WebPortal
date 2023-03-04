import React from 'react';
import styled from 'styled-components';
import FooterData from '../../bento/globalFooterData';

const FooterStyled = styled.footer`
  background-color: #6D8586;
  border-top: 1px solid #6C727B;
  bottom: 0;
  width: 100%;
`;

const GlobalFooterStyled = styled.footer`
  background-color: #115154;
  border-top: 1px solid #6C727B;
  bottom: 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
`;

const FooterLogo = styled.div`
  .logoText {
    text-decoration: none;
  }

  .logoUpperText {
    font-family: poppins;
    font-weight: 700;
    font-size: 24.96px;
    line-height: 37px;
    color: #FFFFFF;
  }

  .logoLowerText {
    font-family: poppins;
    font-weight: 400;
    font-size: 18.72px;
    color: #FFFFFF;
  }
`;

const FooterEmailSignupContainer = styled.form`
  margin: 54px 62px 0 auto;
`;

const FooterLinksContainer = styled.div`
  margin: 54px 0 98px 62px;
  display: flex;

  .footItem {
    width: 253px; 
  }

  .footItemTitle {
    font-family: Open Sans;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 10px;
  }

  .footItemSubtitle {
    margin-bottom: 10px;
    max-width: 180px;
  }

  .footItemLink {
    font-family: Open Sans;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    text-decoration: none;
  }
`;

const GlobalFooterContainer = styled.div`
  padding: 20px 62px 26px 61px;
  display: flex;
  background: #115154;
  width: 1440px;
  margin: 0 auto;

  .followUsTitle {
    margin: 24px 0 18px 0;
    font-family: poppins;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    color: #FFFFFF;
  }

  .followUsList {
    display: flex;
  }

  .followItem {
    margin-right: 14.64px;
  }

  .followItemImg {
    width: 29.29px;
    height: 29.29px;
  }

  .contactUs {
    margin-left: auto;
  }

  .contactUsTitle {
    font-family: poppins;
    font-style: normal;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    text-align: right;
    color: #FFFFFF;
  }

  .contactList {
    display: flex;
    margin: 6px 0 35px 0;
  }

  .contactListItem {
    margin-left: 35px;
  }

  .contactListItemLink{
    color: #FFFFFF;
    text-decoration: none;
    font-family: Open Sans;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  }

  .globalFooterItem {
    text-align: right;
  }

  .globalFooterItemLink{
    color: #FFFFFF;
    text-decoration: none;
    font-family: Open Sans;
    font-weight: 400;
    font-size: 14.24px;
    line-height: 18px;
  }
`;

const Footer = () => {
  return (
    <>
      <FooterStyled role="contentinfo">
          <FooterContainer>
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
            <FooterEmailSignupContainer action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify" ariaLabel="Footer subscribe" method="post" target="_blank" id="signup">
              <input type="hidden" name="topic_id" id="topic_id" value="USNIHNCI_223" />
              <div>
                Sign up for email updates
              </div>
              <div>
                Enter your email address
              </div>
              <div>
                <input id="email" name="email" type="email" />
              </div>
              <button type="submit">
                Sign up
              </button>
            </FooterEmailSignupContainer>
          </FooterContainer>
      </FooterStyled>
      <GlobalFooterStyled>
        <GlobalFooterContainer>
          <div className='lowerFooterLeftContainer'>
            <FooterLogo>
              <a className='logoText' href="https://www.cancer.gov" target="_blank" rel="noopener noreferrer">
                <div className='logoUpperText'>National Cancer Institute</div>
                <div className='logoLowerText'>at the National Institutes of Health</div>
              </a>
            </FooterLogo>
            <div className='followUsTitle'>Follow us</div>
            <div className='followUsList'>
              {
                FooterData.followUs_links.map((followItem, followidx) => {
                  const followkey = `follow_${followidx}`;
                  return (
                    <div className='followItem' key={followkey}>
                      <a href={followItem.link} target="_blank" rel="noopener noreferrer"><img className='followItemImg' src={followItem.img} alt="facebookIcon" /></a>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='contactUs'>
            <div className='contactUsTitle'>Contact Us</div>
            <div className='contactList'>
              {
                FooterData.contact_links.map((contactItem, contactidx) => {
                  const contactkey = `contact_${contactidx}`;
                  return (
                    <div className='contactListItem' key={contactkey}>
                      {
                        contactItem.link.includes('http') ? 
                        <a className='contactListItemLink' href={contactItem.link} target="_blank" rel="noopener noreferrer">{contactItem.text}</a>
                        :
                        <a className='contactListItemLink' href={contactItem.link}>{contactItem.text}</a>
                      }
                    </div>
                  )
                })
              }
            </div>
            {
              FooterData.global_footer_links.map((linkItem, idx) => {
                  const linkitemkey = `linkitem_${idx}`;
                  return (
                      <div className='globalFooterItem' key={linkitemkey}>
                          <a className='globalFooterItemLink' href={linkItem.link} target="_blank" rel="noopener noreferrer">{linkItem.text}</a>
                      </div>
                  )
              })
            }
          </div>
        </GlobalFooterContainer>
      </GlobalFooterStyled>
    </>
  )
};

export default Footer;
