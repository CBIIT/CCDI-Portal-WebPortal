import matter from 'gray-matter';
import resolveContentTokens from '../../utils/resolveContentTokens';

/**
 * Parse landingData.md — YAML front matter only (markdown body ignored).
 * Returns null when required structure is missing so callers keep JS fallbacks.
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
 * Merge remote landing YAML over local JS defaults.
 * Remote image URLs win when present; otherwise keep webpack-imported local assets by id/content.
 */
export function mergeLandingContent(parsed, defaults) {
  if (!parsed) {
    return defaults;
  }

  const introData = {
    ...defaults.introData,
    ...(parsed.heroTitle != null ? { introTitle1: parsed.heroTitle } : {}),
    ...(parsed.heroSubtitle != null ? { introTitle2: parsed.heroSubtitle } : {}),
    ...(parsed.introTitle3 != null ? { introTitle3: parsed.introTitle3 } : {}),
    ...(parsed.introButtonTitle != null ? { introButtonTitle: parsed.introButtonTitle } : {}),
  };

  const titleData = {
    ...defaults.titleData,
    ...(parsed.latestUpdatesTitle != null
      ? { latestUpdatesTitle: parsed.latestUpdatesTitle } : {}),
    ...(parsed.resourceTitle != null ? { resourceTitle: parsed.resourceTitle } : {}),
    ...(parsed.applicationsTitle != null
      ? { applicationsTitle: parsed.applicationsTitle } : {}),
    ...(parsed.cloudResourcesTitle != null
      ? { cloudResourcesTitle: parsed.cloudResourcesTitle } : {}),
  };

  const statsData = mergeStats(parsed.stats, defaults.statsData);
  const statsNote = parsed.statsNote != null ? parsed.statsNote : defaults.statsNote;
  const resourcesAppliationsListData = mergeResourceList(
    parsed.resourcesApplications,
    defaults.resourcesAppliationsListData,
  );
  const resourcesCloudListData = mergeResourceList(
    parsed.resourcesCloud,
    defaults.resourcesCloudListData,
  );
  const carouselList = mergeCarouselList(parsed.carousel, defaults.carouselList);

  return {
    introData,
    titleData,
    statsData,
    statsNote,
    resourcesAppliationsListData,
    resourcesCloudListData,
    carouselList,
  };
}

function mergeStats(remote, local) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return local;
  }
  return remote.map((item, idx) => {
    const fallback = local[idx] || {};
    return {
      num: item.num != null ? item.num : (fallback.num != null ? fallback.num : ''),
      title: item.title != null ? String(item.title) : (fallback.title || ''),
      detail: item.detail != null ? String(item.detail) : (fallback.detail || ''),
      link: item.link != null ? String(item.link) : (fallback.link || ''),
    };
  });
}

function mergeResourceList(remote, local) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return local;
  }
  return remote.map((item) => {
    const localMatch = Array.isArray(local)
      ? local.find((entry) => entry.id && item.id && entry.id === item.id)
      : null;
    return {
      id: item.id != null ? String(item.id) : (localMatch && localMatch.id),
      title: item.title != null ? String(item.title) : (localMatch && localMatch.title) || '',
      ...(item.subtitle != null || (localMatch && localMatch.subtitle)
        ? { subtitle: item.subtitle != null ? String(item.subtitle) : localMatch.subtitle }
        : {}),
      content: item.content != null
        ? String(item.content)
        : (localMatch && localMatch.content) || '',
      link: item.link != null ? String(item.link) : (localMatch && localMatch.link) || '',
      img: item.img || (localMatch && localMatch.img),
      ...(item.noLink != null || (localMatch && localMatch.noLink)
        ? { noLink: item.noLink != null ? Boolean(item.noLink) : localMatch.noLink }
        : {}),
    };
  });
}

function mergeCarouselList(remote, local) {
  if (!Array.isArray(remote) || remote.length === 0) {
    return local;
  }
  return remote.map((item, idx) => {
    const byContent = Array.isArray(local)
      ? local.find((entry) => entry.content && item.content
        && entry.content === item.content)
      : null;
    const byIndex = Array.isArray(local) ? local[idx] : null;
    const localMatch = byContent || byIndex;
    return {
      content: item.content != null
        ? String(item.content)
        : (localMatch && localMatch.content) || '',
      link: item.link != null ? String(item.link) : (localMatch && localMatch.link) || '',
      img: item.img || (localMatch && localMatch.img),
      mobile: item.mobile || (localMatch && localMatch.mobile),
    };
  });
}
