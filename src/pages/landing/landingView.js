import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANDING_PAGE_DATA_QUERY } from '../../bento/landingPageData';

const LandingViewContainer = styled.div`
    width: 1440px;
    margin: 0 auto;
`;

const LandingView = () => {
  const { loading, error, data } = useQuery(GET_LANDING_PAGE_DATA_QUERY);

  useEffect(() => {
    console.log(data);
  },[data]);

  return (
    <LandingViewContainer>
      <div style={{marginTop: "140px", height: "250px", fontSize: "100px"}}>Hello World!</div>
    </LandingViewContainer>
  )
};

export default LandingView;
