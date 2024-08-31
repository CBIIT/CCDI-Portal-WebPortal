const studyDownloadLinks = {
  "phs000720": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs000720_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs001437": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs001437_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002371": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002371_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002430": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002430_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002431": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002431_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002504": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002504_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002517": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002517_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002518": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002518_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002529": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002529_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002599": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002599_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002620": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002620_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002677": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002677_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs002790": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs002790_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs003111": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs003111_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs003164": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs003164_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs003432": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs003432_CCDI_Study_Manifest_v1.9.1.xlsx",
  "phs003519": "https://d2rl9o21y27jbb.cloudfront.net/metadata_files/phs003519_CCDI_Study_Manifest_v1.9.1.xlsx",
};

export {
  studyDownloadLinks
};

export async function openDoubleLink(url, fileName) {
    let urlContent = await fetch(url);
    if (urlContent.ok) {
      let data = await urlContent.blob();
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(data);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
}