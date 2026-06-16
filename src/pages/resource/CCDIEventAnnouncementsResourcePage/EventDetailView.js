import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactHtmlParser from 'html-react-parser';
import { EVENT_ROUTE_BASE, buildDisclaimerHtml } from './eventsUtils';
import communityForumImg from './assets/ccdimarchcommunityforum-PIC.png';
import pediatricStandardsImg from './assets/developingpediatricdatastandards-PIC.png';

const EVENT_IMAGES = {
  'ccdimarchcommunityforum-PIC.png': communityForumImg,
  'developingpediatricdatastandards-PIC.png': pediatricStandardsImg,
};

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
    margin: 0 0 25px;
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

  .bodyWithImage::after {
    content: '';
    display: table;
    clear: both;
  }

  .eventImageFigure {
    float: left;
    width: 300px;
    margin: 0 64px 16px 0;
  }

  .eventImage {
    width: 300px;
    height: 300px;
    object-fit: cover;
    display: block;
    border: 2px solid #848484;
    border-radius: 12px 12px 0 0;
  }

  .eventImageFigure:not(:has(figcaption)) .eventImage {
    border-radius: 12px;
  }

  .eventImageCaption {
    background: #4C4C4C;
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 13px;
    line-height: 15px;
    color: #FFFFFF;
    padding: 8px 10px;
    border-radius: 0 0 12px 12px;
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
      margin: 0 0 16px 23em;
      padding-left: 1em;
      list-style-type: disc;
      list-style-position: outside;
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
    clear: both;
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
`;

const EventDetailView = ({ event }) => {
  const eventImageSrc = event.image ? EVENT_IMAGES[event.image] : null;

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

        <div className="bodyWithImage" data-testid="event-body-with-image">
          {eventImageSrc && (
            <figure className="eventImageFigure" data-testid="event-image-figure">
              <img className="eventImage" src={eventImageSrc} alt={event.title} />
            </figure>
          )}

          <div className="bodyContent" data-testid="event-body-content">
            {event.body ? ReactHtmlParser(event.body) : null}
          </div>
        </div>

        {event.disclaimer && (
          <div className="disclaimer">
            {ReactHtmlParser(buildDisclaimerHtml(event.title))}
          </div>
        )}
      </Body>
    </EventDetailContainer>
  );
};

export default EventDetailView;
