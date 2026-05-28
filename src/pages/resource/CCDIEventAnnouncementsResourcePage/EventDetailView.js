import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { EVENT_ROUTE_BASE, buildDisclaimerHtml } from './eventsUtils';

const EventDetailContainer = styled.div`
  width: 100%;
`;

const BreadcrumbBar = styled.nav`
  border-top: 1px dashed #B6D7DE;
  border-bottom: 1px dashed #B6D7DE;
  padding: 12px 24px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #4D889E;

  .breadcrumbInner {
    font-family: Public Sans;
    font-weight: 400;
    font-size: 16px;
    color: #00529C;
    text-align: left;
  }

  a {
    color: #4D889E;
    text-decoration: underline;
    text-underline-position: under;
  }

  .separator {
    margin: 0 8px;
    color: #4D889E;
  }

  .current {
    color: #4A4A4A;
    font-weight: 500;
  }
`;

const Body = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  font-family: Inter, sans-serif;
  color: #333;

  .eventDate {
    color: #4A4A4A;
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .eventTitle {
    color: #007A85;
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
  }

  .tags {
    display: flex;
    gap: 10px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }

  .tag {
    border: 1px solid #4D889E;
    border-radius: 22px;
    color: #4D889E;
    padding: 4px 16px;
    font-family: Inter, sans-serif;
    font-size: 13px;
    font-weight: 500;
    background: transparent;
  }

  .bodyContent {
    font-size: 16px;
    line-height: 24px;
    color: #333;
    font-weight: 400;
    font-family: Inter;

    p {
      margin: 0 0 16px;
    }

    ul {
      margin: 0 0 16px;
      padding-left: 24px;
    }

    li {
      margin-bottom: 6px;
    }

    h2 {
      color: #05555C;
      font-family: 'Poppins', sans-serif;
      font-size: 19px;
      font-weight: 600;
      margin: 24px 0 12px;
    }

    a {
      color: #455299;
      font-weight: 600;
      text-decoration: underline;
      text-underline-position: under;
    }
  }

  .disclaimer {
    margin-top: 36px;
    background: #A2E0D2;
    border-radius: 6px;
    padding: 18px 22px;
    font-size: 14px;
    line-height: 20px;
    color: #333;
    font-weight: 400;

    a {
      color: #455299;
      font-weight: 600;
      text-decoration: underline;
    }
  }

  .postNav {
    margin-top: 48px;
    border-top: 1px solid #E0E0E0;
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    gap: 24px;

    .postNavLink {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #4D889E;
      max-width: 360px;
    }

    .postNavLink--older {
      align-items: flex-start;
      text-align: left;
    }

    .postNavLink--newer {
      align-items: flex-end;
      text-align: right;
      margin-left: auto;
    }

    .postNavLabel {
      font-family: Inter, sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #4D889E;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }

    .postNavArrow {
      font-size: 16px;
      line-height: 1;
      color: #4D889E;
    }

    .postNavTitle {
      color: #4A4A4A;
      font-family: Inter, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }

    .postNavLink:hover .postNavTitle {
      text-decoration: underline;
    }
  }

  @media (max-width: 767px) {
    .postNav {
      flex-direction: column;
      gap: 18px;

      .postNavLink--newer {
        align-items: flex-start;
        text-align: left;
        margin-left: 0;
      }
    }
  }
`;

const EventDetailView = ({ event, older, newer }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [event.slug]);

  return (
    <EventDetailContainer>
      <BreadcrumbBar aria-label="Breadcrumb">
        <div className="breadcrumbInner">
          <Link to={EVENT_ROUTE_BASE}>Events Announcements</Link>
          <span className="separator">&gt;</span>
          <span className="current">{event.title}</span>
        </div>
      </BreadcrumbBar>
      <Body>
        <div className="eventDate">{event.displayDate}</div>
        <h1 className="eventTitle">{event.title}</h1>
        <div className="tags">
          <span className="tag">{event.tag}</span>
        </div>

        <div className="bodyContent">
          {event.body ? ReactHtmlParser(event.body) : null}
        </div>

        {event.disclaimer && (
          <div className="disclaimer">
            {ReactHtmlParser(buildDisclaimerHtml(event.title))}
          </div>
        )}

        <div className="postNav">
          {older ? (
            <Link
              className="postNavLink postNavLink--older"
              to={`${EVENT_ROUTE_BASE}/${older.slug}`}
            >
              <span className="postNavLabel">
                <span className="postNavArrow">&#9664;</span>
                Older Post
              </span>
              <span className="postNavTitle">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              className="postNavLink postNavLink--newer"
              to={`${EVENT_ROUTE_BASE}/${newer.slug}`}
            >
              <span className="postNavLabel">
                Newer Post
                <span className="postNavArrow">&#9654;</span>
              </span>
              <span className="postNavTitle">{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </Body>
    </EventDetailContainer>
  );
};

export default EventDetailView;
