import React, { createContext, useContext, useMemo } from 'react';
import {
  introData as defaultIntroData,
  titleData as defaultTitleData,
  statsNote as defaultStatsNote,
  resourcesAppliationsListData as defaultResourcesApplications,
  resourcesCloudListData as defaultResourcesCloud,
  carouselList as defaultCarouselList,
} from '../../bento/landingPageData';

const LandingContentContext = createContext({
  introData: defaultIntroData,
  titleData: defaultTitleData,
  statsNote: defaultStatsNote,
  resourcesAppliationsListData: defaultResourcesApplications,
  resourcesCloudListData: defaultResourcesCloud,
  carouselList: defaultCarouselList,
});

export function LandingContentProvider({ value, children }) {
  const merged = useMemo(() => ({
    introData: (value && value.introData) || defaultIntroData,
    titleData: (value && value.titleData) || defaultTitleData,
    statsNote: value && value.statsNote != null ? value.statsNote : defaultStatsNote,
    resourcesAppliationsListData:
      (value && value.resourcesAppliationsListData) || defaultResourcesApplications,
    resourcesCloudListData:
      (value && value.resourcesCloudListData) || defaultResourcesCloud,
    carouselList: (value && value.carouselList) || defaultCarouselList,
  }), [value]);

  return (
    <LandingContentContext.Provider value={merged}>
      {children}
    </LandingContentContext.Provider>
  );
}

export function useLandingContent() {
  return useContext(LandingContentContext);
}

export default LandingContentContext;
