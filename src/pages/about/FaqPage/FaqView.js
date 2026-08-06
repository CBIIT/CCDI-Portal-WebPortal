import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import faqHeaderImg from '../../../assets/about/faq-header.svg';
import faqChevronIcon from '../../../assets/icons/Faq_Accordion_Chevron.svg';
import FaqMarkdown from './FaqMarkdown';

const ALL_CATEGORIES_ID = 'all';

const FaqContainer = styled.div`
  width: 100%;

  .faqHeaderContainer {
    width: 1142px;
    height: 140px;
    margin: 0 auto;
    background-image: url(${(props) => props.headerImg || faqHeaderImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #0B7F8B;
    border-radius: 0 0 20px 20px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1186px) {
      width: auto;
      margin: 0 16px;
    }
  }

  .faqHeaderText {
    margin: 0;
    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 35px;
    line-height: 38px;
    letter-spacing: 0;
    text-align: center;
    text-transform: none;
  }
`;

const FaqBody = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 40px 80px 80px 80px;
  max-width: 1420px;
  gap: 0;

  @media (max-width: 1024px) {
    padding: 24px 16px 60px 16px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 16px 16px 60px 16px;
  }

  .navSection {
    width: 280px;
    flex-shrink: 0;
    background: #FFFFFF;
    color: #05555C;
    padding: 0 0 40px 0;
    align-self: flex-start;

    @media (max-width: 767px) {
      display: none;
    }
  }

  .navTitle {
    font-family: Poppins, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0;
    text-transform: none;
    color: #4D889E;
    margin: 0 0 24px 0;
    padding: 0 20px;
  }

  .navTopicItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 20px;
    border-top: 1px solid #D9D9D9;
    color: #05555C;
    font-family: Poppins, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 22px;
    line-height: 24px;
    letter-spacing: -0.002em;
    cursor: pointer;
    background: transparent;
  }

  .navTopicItem:last-child {
    border-bottom: 1px solid #D9D9D9;
  }

  .navTopicItem:hover {
    color: #00838F;
    font-weight: 600;
  }

  .navTopicItem.selected {
    background: #EBF7F8;
    color: #4D7C8A;
    font-weight: 700;
  }

  .navCount {
    flex-shrink: 0;
    min-width: 24px;
    padding: 2px 6px;
    background: #DBDBDB;
    color: #333333;
    font-family: Open Sans, sans-serif;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    border-radius: 0;
  }

  .mobileFilter {
    display: none;
    position: relative;
    margin-bottom: 20px;

    @media (max-width: 767px) {
      display: block;
    }
  }

  .mobileFilterTrigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    padding: 14px 20px 14px 16px;
    border: 2px solid #08838D;
    border-radius: 5px;
    background: #FFFFFF;
    color: #0A5E63;
    -webkit-text-fill-color: #0A5E63;
    font-family: Open Sans, sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 120%;
    text-align: left;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .mobileFilterTriggerLabel {
    color: #0A5E63;
    -webkit-text-fill-color: #0A5E63;
  }

  .mobileFilter.open .mobileFilterTrigger {
    border-radius: 5px 5px 0 0;
    border-bottom-color: transparent;
  }

  .mobileFilterChevron {
    flex-shrink: 0;
    width: 15px;
    height: 9px;
    margin-right: 4px;
    background-image: url(${faqChevronIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 15px 9px;
    transition: transform 0.15s ease;
  }

  .mobileFilterChevron.up {
    transform: rotate(180deg);
  }

  .mobileFilterMenu {
    position: absolute;
    top: calc(100% - 2px);
    left: 0;
    right: 0;
    z-index: 10;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 2px solid #08838D;
    border-top: none;
    border-radius: 0 0 5px 5px;
    background: #FFFFFF;
    overflow: hidden;
  }

  .mobileFilterOption {
    display: block;
    width: 100%;
    padding: 14px 16px;
    border: none;
    background: #FFFFFF;
    color: #0A5E63;
    -webkit-text-fill-color: #0A5E63;
    font-family: Poppins, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 0;
    text-transform: capitalize;
    text-align: left;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .mobileFilterMenu li:nth-child(odd) .mobileFilterOption {
    background: #F4F5F5;
  }

  .mobileFilterMenu li:nth-child(even) .mobileFilterOption {
    background: #FFFFFF;
  }

  .contentSection {
    flex: 1;
    min-width: 0;
    /* Offset past "Filter by Category" so title aligns with first category row */
    padding: 50px 0 0 48px;
    background: #FFFFFF;

    @media (max-width: 767px) {
      padding: 0;
    }
  }

  .categoryTitle {
    font-family: Poppins, sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0;
    color: #536D70;
    margin: 0;
    padding: 14px 0;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;

    @media (max-width: 767px) {
      font-size: 28px;
      line-height: 32px;
      text-align: center;
      border-top: none;
    }
  }

  .faqList {
    border-top: none;
  }

  .faqItem {
    border-bottom: 1px solid #D9D9D9;
  }

  .faqQuestionRow {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: 20px 0;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;
    color: #05555C;
  }

  .faqQuestionRow.expanded {
    font-weight: 600;
  }

  .faqQuestionText {
    flex: 1;
  }

  .faqChevron {
    flex-shrink: 0;
    width: 15px;
    height: 9px;
    margin-top: 6px;
    background-image: url(${faqChevronIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 15px 9px;
    transition: transform 0.15s ease;
  }

  .faqChevron.up {
    transform: rotate(180deg);
  }

  .faqAnswer {
    margin: 0;
    padding: 20px 24px;
    background: #E8F5F3;
    border-radius: 4px;
    font-family: Open Sans, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: #333333;

    p {
      margin: 0 0 12px 0;
    }

    p:last-child {
      margin-bottom: 0;
    }

    a {
      color: #455299;
      font-weight: 600;
      text-decoration: underline;
      text-underline-position: under;
    }
  }

  .emptyState {
    font-family: Open Sans, sans-serif;
    font-size: 16px;
    color: #666666;
    padding: 24px 0;
  }
`;

const FaqView = ({ data }) => {
  const { title, headerImage, categories = [], faqs = [] } = data || {};
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expandedIds, setExpandedIds] = useState({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSelectionMade, setMobileSelectionMade] = useState(false);
  const mobileFilterRef = useRef(null);

  const countsByCategory = useMemo(() => {
    const counts = {};
    categories.forEach((cat) => {
      counts[cat.id] = 0;
    });
    faqs.forEach((faq) => {
      if (counts[faq.category] != null) {
        counts[faq.category] += 1;
      }
    });
    return counts;
  }, [categories, faqs]);

  const totalCount = faqs.length;

  const indexItems = useMemo(() => ([
    { id: ALL_CATEGORIES_ID, name: 'All Categories', count: totalCount },
    ...categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: countsByCategory[cat.id] || 0,
    })),
  ]), [categories, countsByCategory, totalCount]);

  const activeCategoryId = selectedCategoryId || ALL_CATEGORIES_ID;

  const activeTitle = useMemo(() => {
    if (!selectedCategoryId) {
      return 'All Categories';
    }
    const match = categories.find((cat) => cat.id === selectedCategoryId);
    return match ? match.name : 'All Categories';
  }, [selectedCategoryId, categories]);

  const visibleFaqs = useMemo(() => {
    if (!selectedCategoryId) {
      return faqs;
    }
    return faqs.filter((faq) => faq.category === selectedCategoryId);
  }, [faqs, selectedCategoryId]);

  useEffect(() => {
    if (!mobileFilterOpen) {
      return undefined;
    }
    const handlePointerDown = (event) => {
      if (mobileFilterRef.current && !mobileFilterRef.current.contains(event.target)) {
        setMobileFilterOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileFilterOpen]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === ALL_CATEGORIES_ID) {
      setSelectedCategoryId(null);
      return;
    }
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleMobileOptionSelect = (categoryId) => {
    if (categoryId === ALL_CATEGORIES_ID) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
    setMobileSelectionMade(true);
    setMobileFilterOpen(false);
  };

  const getMobileOptionLabel = (item) => {
    if (item.id === ALL_CATEGORIES_ID) {
      return 'All';
    }
    return `${item.name} - ${item.count}`;
  };

  const mobileTriggerLabel = (() => {
    if (!mobileSelectionMade) {
      return 'Select A Category';
    }
    if (!selectedCategoryId) {
      return 'All';
    }
    return activeTitle;
  })();

  const toggleFaq = (faqId) => {
    setExpandedIds((prev) => ({
      ...prev,
      [faqId]: !prev[faqId],
    }));
  };

  return (
    <FaqContainer headerImg={headerImage}>
      <div className="faqHeaderContainer">
        <h1 className="faqHeaderText">{title || 'CCDI FAQs'}</h1>
      </div>
      <FaqBody>
        <nav className="navSection" aria-label="Filter by category">
          <div className="navTitle">Filter by Category</div>
          {indexItems.map((item) => {
            const isSelected = item.id === ALL_CATEGORIES_ID
              ? !selectedCategoryId
              : selectedCategoryId === item.id;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className={`navTopicItem${isSelected ? ' selected' : ''}`}
                onClick={() => handleCategoryClick(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick(item.id);
                  }
                }}
                data-testid={`faq-category-${item.id}`}
              >
                <span>{item.name}</span>
                <span className="navCount" data-testid={`faq-count-${item.id}`}>{item.count}</span>
              </div>
            );
          })}
        </nav>

        <div className="contentSection">
          <div
            className={`mobileFilter${mobileFilterOpen ? ' open' : ''}`}
            ref={mobileFilterRef}
          >
            <button
              type="button"
              className="mobileFilterTrigger"
              onClick={() => setMobileFilterOpen((open) => !open)}
              aria-expanded={mobileFilterOpen}
              aria-haspopup="listbox"
              aria-label="Filter by category"
              data-testid="faq-mobile-filter"
            >
              <span className="mobileFilterTriggerLabel">{mobileTriggerLabel}</span>
              <span
                className={`mobileFilterChevron ${mobileFilterOpen ? 'up' : 'down'}`}
                aria-hidden="true"
              />
            </button>
            {mobileFilterOpen && (
              <ul className="mobileFilterMenu" role="listbox" aria-label="Filter by category">
                {indexItems.map((item) => (
                  <li key={item.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      className="mobileFilterOption"
                      aria-selected={item.id === activeCategoryId}
                      onClick={() => handleMobileOptionSelect(item.id)}
                      data-testid={`faq-mobile-option-${item.id}`}
                    >
                      {getMobileOptionLabel(item)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h2 className="categoryTitle" data-testid="faq-category-title">{activeTitle}</h2>

          {visibleFaqs.length === 0 ? (
            <div className="emptyState">No FAQs available for this category.</div>
          ) : (
            <div className="faqList" data-testid="faq-list">
              {visibleFaqs.map((faq) => {
                const expanded = Boolean(expandedIds[faq.id]);
                return (
                  <div className="faqItem" key={faq.id} data-testid={`faq-item-${faq.id}`}>
                    <button
                      type="button"
                      className={`faqQuestionRow${expanded ? ' expanded' : ''}`}
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={expanded}
                      data-testid={`faq-toggle-${faq.id}`}
                    >
                      <span className="faqQuestionText">{faq.question}</span>
                      <span
                        className={`faqChevron ${expanded ? 'up' : 'down'}`}
                        aria-hidden="true"
                      />
                    </button>
                    {expanded && (
                      <div className="faqAnswer" data-testid={`faq-answer-${faq.id}`}>
                        <FaqMarkdown>{faq.answer}</FaqMarkdown>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FaqBody>
    </FaqContainer>
  );
};

export default FaqView;
