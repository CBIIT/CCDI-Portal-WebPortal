import React from 'react';
import styled from 'styled-components';
import headerData from '../../../bento/globalHeaderData';

const LogoArea = styled.div`
    display: flex;

    img {
      width: 455px;
      height: 56px;
    }

    .logoContainer {
      margin-top: 20px;
    }

    .imgContainer {
        width: 319px;
        height: 52px;
        background-image: url(${headerData.globalHeaderLogoSmall});
        background-size: contain;
    }
`;


const Logo = () => {
  return (
    <LogoArea>
        <a className='logoContainer' href={headerData.globalHeaderLogoLink}>
            <div className='imgContainer' />
            {/* <img src={headerData.globalHeaderLogo} alt={headerData.globalHeaderLogoAltText} /> */}
        </a>
    </LogoArea>
  );
};

export default Logo;