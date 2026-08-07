import React, { createContext, useContext, useMemo } from 'react';
import { createEmptyLandingContent } from './parseLandingMarkdown';

const emptyLandingContent = createEmptyLandingContent();

const LandingContentContext = createContext(emptyLandingContent);

export function LandingContentProvider({ value, children }) {
  const content = useMemo(
    () => (value != null ? value : emptyLandingContent),
    [value],
  );

  return (
    <LandingContentContext.Provider value={content}>
      {children}
    </LandingContentContext.Provider>
  );
}

export function useLandingContent() {
  return useContext(LandingContentContext);
}

export default LandingContentContext;
