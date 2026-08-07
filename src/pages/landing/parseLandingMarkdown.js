import matter from 'gray-matter';
import resolveContentTokens from '../../utils/resolveContentTokens';

/**
 * Empty landing shell (no JS copy fallback). Asset maps may still be passed into
 * mergeLandingContent so remote rows can attach local webpack images by id/content.
 */
export function createEmptyLandingContent(assetDefaults = {}) {
  const introPic = assetDefaults.introData && assetDefaults.introData.landingIntroPic;
  return {
    introData: {
      landingIntroPic: introPic,
      introTitle1: '',
      introTitle2: '',
      introTitle3: '',
      introButtonTitle: '',
    },
    titleData: {
      latestUpdatesTitle: '',
      resourceTitle: '',
      applicationsTitle: '',
      cloudResourcesTitle: '',
      aboutTitle: '',
    },
    statsData: [],
    statsNote: '',
    resourcesAppliationsListData: [],
    resourcesCloudListData: [],
    carouselList: [],
  };
}

/**
 * Parse landingData.md — YAML front matter only (markdown body ignored).
 * Returns null when required structure is missing.
 */
export default function parseLandingMarkdown(rawMarkdown) {
  if (rawMarkdown == null || String(rawMarkdown).trim() === '') {
    return null;
  }

  let data;
  try {
    const source = String(rawMarkdown).replace(/^\uFEFF/, '');
    ({ data } = matter(source));
  } catch (_error) {
    return null;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  const resolved = resolveContentTokens(data);

  const hasAnyContent = Boolean(
    resolved.heroTitle
    || resolved.heroSubtitle
    || resolved.introTitle3
    || resolved.latestUpdatesTitle
    || resolved.resourceTitle
    || (Array.isArray(resolved.stats) && resolved.stats.length)
    || (Array.isArray(resolved.resourcesApplications) && resolved.resourcesApplications.length)
    || (Array.isArray(resolved.carousel) && resolved.carousel.length),
  );

  if (!hasAnyContent) {
    return null;
  }

  return {
    heroTitle: resolved.heroTitle != null ? String(resolved.heroTitle) : undefined,
    heroSubtitle: resolved.heroSubtitle != null ? String(resolved.heroSubtitle) : undefined,
    introTitle3: resolved.introTitle3 != null ? String(resolved.introTitle3) : undefined,
    introButtonTitle: resolved.introButtonTitle != null ? String(resolved.introButtonTitle) : undefined,
    latestUpdatesTitle: resolved.latestUpdatesTitle != null
      ? String(resolved.latestUpdatesTitle) : undefined,
    resourceTitle: resolved.resourceTitle != null ? String(resolved.resourceTitle) : undefined,
    applicationsTitle: resolved.applicationsTitle != null
      ? String(resolved.applicationsTitle) : undefined,
    cloudResourcesTitle: resolved.cloudResourcesTitle != null
      ? String(resolved.cloudResourcesTitle) : undefined,
    statsNote: resolved.statsNote != null ? String(resolved.statsNote) : undefined,
    stats: Array.isArray(resolved.stats) ? resolved.stats : undefined,
    resourcesApplications: Array.isArray(resolved.resourcesApplications)
      ? resolved.resourcesApplications : undefined,
    resourcesCloud: Array.isArray(resolved.resourcesCloud)
      ? resolved.resourcesCloud : undefined,
    carousel: Array.isArray(resolved.carousel) ? resolved.carousel : undefined,
  };
}

/**
 * Build landing props from remote YAML only. Missing sections stay empty.
 * Local assetDefaults are used only to attach webpack images by id/content when
 * the remote row omits img/mobile URLs.
 */
export function mergeLandingContent(parsed, assetDefaults = {}) {
  if (!parsed) {
    return createEmptyLandingContent(assetDefaults);
  }

  const empty = createEmptyLandingContent(assetDefaults);

  const introData = {
    ...empty.introData,
    ...(parsed.heroTitle != null ? { introTitle1: parsed.heroTitle } : {}),
    ...(parsed.heroSubtitle != null ? { introTitle2: parsed.heroSubtitle } : {}),
    ...(parsed.introTitle3 != null ? { introTitle3: parsed.introTitle3 } : {}),
    ...(parsed.introButtonTitle != null ? { introButtonTitle: parsed.introButtonTitle } : {}),
  };

  const titleData = {
    ...empty.titleData,
    ...(parsed.latestUpdatesTitle != null
      ? { latestUpdatesTitle: parsed.latestUpdatesTitle } : {}),
    ...(parsed.resourceTitle != null ? { resourceTitle: parsed.resourceTitle } : {}),
    ...(parsed.applicationsTitle != null
      ? { applicationsTitle: parsed.applicationsTitle } : {}),
    ...(parsed.cloudResourcesTitle != null
      ? { cloudResourcesTitle: parsed.cloudResourcesTitle } : {}),
  };

  const assetLists = {
    statsData: assetDefaults.statsData || [],
    resourcesAppliationsListData: assetDefaults.resourcesAppliationsListData || [],
    resourcesCloudListData: assetDefaults.resourcesCloudListData || [],
    carouselList: assetDefaults.carouselList || [],
  };

  return {
    introData,
    titleData,
    statsData: mergeStats(parsed.stats, assetLists.statsData),
    statsNote: parsed.statsNote != null ? parsed.statsNote : '',
    resourcesAppliationsListData: mergeResourceList(
      parsed.resourcesApplications,
      assetLists.resourcesAppliationsListData,
    ),
    resourcesCloudListData: mergeResourceList(
      parsed.resourcesCloud,
      assetLists.resourcesCloudListData,
    ),
    carouselList: mergeCarouselList(parsed.carousel, assetLists.carouselList),
  };
}

function mergeStats(remote, localAssets) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return [];
  }
  return remote.map((item, idx) => {
    const asset = localAssets[idx] || {};
    return {
      num: item.num != null ? item.num : (asset.num != null ? asset.num : ''),
      title: item.title != null ? String(item.title) : '',
      detail: item.detail != null ? String(item.detail) : '',
      link: item.link != null ? String(item.link) : '',
    };
  });
}

function mergeResourceList(remote, localAssets) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return [];
  }
  return remote.map((item) => {
    const localMatch = Array.isArray(localAssets)
      ? localAssets.find((entry) => entry.id && item.id && entry.id === item.id)
      : null;
    return {
      id: item.id != null ? String(item.id) : (localMatch && localMatch.id),
      title: item.title != null ? String(item.title) : '',
      ...(item.subtitle != null
        ? { subtitle: String(item.subtitle) }
        : {}),
      content: item.content != null ? String(item.content) : '',
      link: item.link != null ? String(item.link) : '',
      img: item.img || (localMatch && localMatch.img),
      ...(item.noLink != null
        ? { noLink: Boolean(item.noLink) }
        : {}),
    };
  });
}

function mergeCarouselList(remote, localAssets) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return [];
  }
  return remote.map((item, idx) => {
    const byContent = Array.isArray(localAssets)
      ? localAssets.find((entry) => entry.content && item.content
        && entry.content === item.content)
      : null;
    const byIndex = Array.isArray(localAssets) ? localAssets[idx] : null;
    const localMatch = byContent || byIndex;
    return {
      content: item.content != null ? String(item.content) : '',
      link: item.link != null ? String(item.link) : '',
      img: item.img || (localMatch && localMatch.img),
      mobile: item.mobile || (localMatch && localMatch.mobile),
    };
  });
}
