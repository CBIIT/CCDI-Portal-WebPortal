import React, { useState, useEffect } from "react";
import ReleaseNotesPageView from "./releaseNotePageView";
import { fetchReleaseNotesData } from "./parseReleaseNotesMarkdown";

const ReleaseNotePageController = () => {
  const [releaseNotesList, setReleaseNotesList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { releaseNotesList: list } = await fetchReleaseNotesData();
      setReleaseNotesList(list);
    };
    fetchData();
  }, []);

  if (releaseNotesList && releaseNotesList.length > 0) {
    return <ReleaseNotesPageView releaseNotesList={releaseNotesList} />;
  }
  return <div />;
};
export default ReleaseNotePageController;
