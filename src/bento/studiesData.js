const studyDownloadLinks = {
  "phs002790": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/92192aee-a4e7-11ee-b42e-1ed67ff2713c",
  "phs002529": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/92192aee-a4e7-11ee-b42e-1ed67ff2713c",
  "phs002431": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/2d835abd-7ac7-491e-aa87-00f021240b17",
  "phs002430": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002504": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002599": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs000720": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002371": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002677": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs003111": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002517": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002518": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs001437": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
  "phs002620": "https://nci-crdc.datacommons.io/user/data/download/dg.4DFC/ff2f8ab7-92a0-4d0a-bfd1-edf95db91590",
};

export {
  studyDownloadLinks
};

export async function openDoubleLink(url, setError) {
  try {
    let urlContent = await fetch(url);
    if (urlContent.ok) {
      let finalContent = await urlContent.json();
      if (typeof finalContent == "object") {
        if (finalContent.url) {
          window.location.href = finalContent.url
        } else {
          setError("The server response does not contain a valid download link");
        }
      } else {
        setError("Received an invalid response from the server. Please try again later")
      }
    } else {
      setError("Network error. Please check your internet connection and try again");
    }
  } catch (e) {
    setError("Failed to fetch the download URL. Please try again");
  }
}