import React from 'react';
import styled from 'styled-components';
import headerData from '../../../bento/globalHeaderData';

const LogoArea = styled.div`
    display: flex;

    .logoContainer {
      margin-top: 32px;
    }

    .imgContainer {
        width: 230px;
        height: 37.5px;
        background-image: url(${headerData.globalHeaderLogoSmall});
        background-size: contain;
    }
`;


const Logo = () => {
  return (
    <LogoArea>
        <a className='logoContainer' href={headerData.globalHeaderLogoLink}>
            <div className='imgContainer' />
        </a>
    </LogoArea>
  );
};

export default Logo;