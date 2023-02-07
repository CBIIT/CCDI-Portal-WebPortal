import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
    height: 600px;
    text-align: center;

    .searchResult {
        margin-top: 50px;
        font-size: 65px;
    }
`;

const searchComponent = () => {
  return (
    <ErrorContainer>
        <div className='searchResult'>searchView</div>
    </ErrorContainer>
  )
};

export default searchComponent;
