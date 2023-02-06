import React from 'react';
import styled from 'styled-components';
import errImg from '../../assets/error/PageNotFound.png';
import { errorData } from '../../bento/pageNotFoundData';

const ErrorContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    display: flex;

    .picContainer {
      margin: 88px 99px 103px 0;
      width: 676px;
      height: 545px;
      background-image: url(${errImg});
    }

    .textContainer {
      margin-top: 203px;
      text-align: center;
    }

    .titleFirst {
      font-family: poppins;
      font-weight: 700;
      font-size: 65px;
      color: #05555C;
      margin-bottom: 28px;
    }

    .titleSecond {
      font-family: poppins;
      font-weight: 500;
      font-size: 35px;
      color: #05555C;
    }

    .returnButtonContainer {
      text-decoration: none;
    }

    .returnButton {
      margin: 50px auto 0 auto;
      width: 176px;
      height: 40px;
      font-family: poppins;
      font-weight: 600;
      font-size: 16px;
      line-height: 40px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #4BBFC6;
      border-radius: 5px;
      text-align: center;
    }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <div className='picContainer'></div>
      <div className='textContainer'>
        <div className='titleFirst'>{errorData.titleFirst}</div>
        <div className='titleSecond'>
          <div>{errorData.titleSecond1}</div>
          <div>{errorData.titleSecond2}</div>
        </div>
        <a className='returnButtonContainer' href='/'>
           <div className='returnButton'>{errorData.buttonTitle}</div>
        </a>
      </div>
    </ErrorContainer>
  )
};

export default Error;
