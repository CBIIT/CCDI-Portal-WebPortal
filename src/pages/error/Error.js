import React from 'react';
import styled from 'styled-components';
import errIcon from '../../assets/error/404_Icon.svg';
import { errorData } from '../../bento/pageNotFoundData';
import { NavLink } from 'react-router-dom';

const ErrorContainer = styled.div`
    background: #24415CE5;

    .textContainer {
      margin: 0 auto;
      padding-top: 100px;
      text-align: center;
    }

    .errIconContainer {
      margin-bottom: 25px;
    }

    .titleFirst {
      font-family: poppins;
      font-weight: 500;
      font-size: 30px;
      line-height: 65px;
      color: #CCCED1;
    }

    .titleSecond {
      font-family: Poppins;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: 0.02em;
      text-align: center;
      color: #FFFFFF;
      margin-bottom: 15px;
    }

    .returnButtonContainer {
      padding-bottom: 150px;
    }

    .returnButton {
      padding: 12px 30px;
      width: 176px;
      height: 57px;
      font-family: poppins;
      font-weight: 600;
      font-size: 16px;
      line-height: 57px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #4D889E;
      border-radius: 5px;
      text-align: center;
      text-decoration: none;
    }

    @media (min-width: 1440px) {
      .textContainer {
        width: 1440px;
      }
    }
    @media (max-width: 767px) {
      .titleSecond {
        width: 200px;
        margin: 0 auto;
        line-height: 20px;
        margin-bottom: 15px;
      }

      .errImg {
        width: 204px;
        height: 204px;
      }
    }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <div className='textContainer'>
        <div className='errIconContainer'><img className='errImg' src={errIcon} alt='404 Error Icon' /></div>
        <div className='titleFirst'>{errorData.titleFirst}</div>
        <div className='titleSecond'>
          <div>{errorData.titleSecond}</div>
          <div>peer review</div>
        </div>
        <div className='returnButtonContainer'>
           <NavLink className='returnButton' to='/'>{errorData.buttonTitle}</NavLink>
        </div>
      </div>
    </ErrorContainer>
  )
};

export default Error;
