import React from 'react';
import styled from 'styled-components';
import { useLandingContent } from '../LandingContentContext';

const IntegrationBannerBar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  padding: 0;
  background: linear-gradient(180deg, #009485 0%, #07645C 100%);
  border-radius: 0;

  .integrationBannerInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    padding: 16px 73px;
    box-sizing: border-box;
  }

  .integrationBannerMessage {
    display: flex;
    align-items: stretch;
    gap: 16px;
    min-width: 0;
  }

  .integrationBannerDivider {
    flex-shrink: 0;
    width: 1px;
    background-color: #ffffff;
  }

  .integrationBannerText {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .integrationBannerTitle {
    margin: 0;
    color: #ffffff;
    font-family: Poppins, sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }

  .integrationBannerDetail {
    margin: 0;
    color: #ffffff;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  .integrationBannerAction {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 18px;
    background: #ffffff;
    color: #009485;
    border-radius: 5px;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.02em;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .integrationBannerAction:hover {
    background: #f4f4f4;
  }

  @media (max-width: 767px) {
    .integrationBannerInner {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px 20px;
    }

    .integrationBannerTitle {
      font-size: 20px;
      line-height: 22px;
    }

    .integrationBannerDetail {
      font-size: 14px;
      line-height: 18px;
    }

    .integrationBannerDivider {
      display: none;
    }
  }
`;

const IntegrationBanner = () => {
  const { integrationBanner } = useLandingContent();
  if (!integrationBanner || !integrationBanner.isVisible || !integrationBanner.title) {
    return null;
  }

  const link = integrationBanner.link;
  const external = Boolean(link && (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('//')));

  return (
    <IntegrationBannerBar aria-label="CCDI Explore Dashboard">
      <div className="integrationBannerInner">
        <div className="integrationBannerMessage">
          <div className="integrationBannerDivider" />
          <div className="integrationBannerText">
            <p className="integrationBannerTitle">{integrationBanner.title}</p>
            {integrationBanner.detail ? (
              <p className="integrationBannerDetail">{integrationBanner.detail}</p>
            ) : null}
          </div>
        </div>
        {integrationBanner.buttonLabel && link ? (
          <a
            className="integrationBannerAction"
            href={link}
            target={external ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            {integrationBanner.buttonLabel}
          </a>
        ) : null}
      </div>
    </IntegrationBannerBar>
  );
};

export default IntegrationBanner;
