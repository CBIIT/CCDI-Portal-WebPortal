import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FooterData from '../../bento/globalFooterData';

const FooterStyled = styled.footer`
  background-color: #1B496E;
  border-top: 1px solid #6C727B;
  bottom: 0;
  width: 100%;
  z-index: 10;
  position: relative;
`;

const GlobalFooterStyled = styled.footer`
  background-color: #14315C;
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
  margin: 54px auto 0 330px;

  .signUpTitle {
    font-family: poppins;
    font-weight: 700;
    font-size: 22.88px;
    line-height: 34px;
    color: #FFFFFF;
    margin-bottom: 28px;
  }

  .enterTitle {
    font-family: Open Sans;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    margin-bottom: 10px;
  }

  .signUpInputBox {
    width: 479px;
    height: 47px;
    font-size: 25px;
    padding-left: 8px;
  }

  .signUpInputBox:focus {
    outline: 0.25rem solid #2491ff;
  }

  .signUpButton {
    background: #FACE00;
    border-radius: 8px;
    border: 0;
    padding: 9px 16px;
    font-family: Open Sans;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #14315C;
    margin-top: 18px;
  }

  .signUpButton:hover {
    cursor: pointer;
  }

  .errorEmail {
    background: #e41154;
    padding: 10px 5px 5px 5px;

    .signUpInputBox {
      outline: 0.25rem solid #2491ff;
      outline-offset: 5px;
    }
  }

  .ErrorBorder {
    position: relative;
    border-left: 0.25rem solid #e41154;
    padding-left: 1rem;
    left: -20px;
  }
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

  .footItemLink:hover {
    text-decoration: underline;
  }
`;

const GlobalFooterContainer = styled.div`
  padding: 20px 62px 26px 61px;
  display: flex;
  background: #14315C;
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

  .contactListItemLink:hover {
    text-decoration: underline;
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

  .globalFooterItemLink:hover {
    text-decoration: underline;
  }
`;

const FooterMobile = () => {
  const [errorClass,setErrorClass] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const emailForm = useRef();

  function validateEmail (email) {
    var reg = /^[A-Za-z0-9]+([_.-][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
    return reg.test(email);
  }

  const handleClick = () => {
    if (!validateEmail(emailContent)) {
      setErrorClass("errorEmail");
    } else {
      setErrorClass("");
      emailForm.current.submit();
    }
  }

  const handleChange = (e) => {
    setEmailContent(e.target.value);
  }

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
            <FooterEmailSignupContainer ref={emailForm} action="https://public.govdelivery.com/accounts/USNIHNCI/subscribers/qualify" ariaLabel="Footer subscribe" method="post" target="_blank" id="signup" noValidate>
              <input type="hidden" name="topic_id" id="topic_id" value="USNIHNCI_223" />
              <div className='signUpTitle'>
                Sign up for email updates
              </div>
              <div className={errorClass !== "" ? 'ErrorBorder' : null}>
                <div className='enterTitle'>
                  <label for="email"> Enter your email address</label>
                </div>
                <div className={errorClass}>
                  {errorClass !== "" ? <div className='enterTitle'>Enter a valid email address</div> : null}
                  <input id="email" type="email" name="email" className='signUpInputBox' value={emailContent} onChange={e => handleChange(e)} />
                </div>
              </div>
              <button type="button" className='signUpButton' onClick={handleClick}>
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
                      <a href={followItem.link} target="_blank" rel="noopener noreferrer"><img className='followItemImg' src={followItem.img} alt={followItem.description} /></a>
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

export default FooterMobile;
