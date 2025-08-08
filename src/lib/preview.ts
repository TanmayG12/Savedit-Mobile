export const detectPlatform = (
  url: string,
): 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'reddit' | 'web' => {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return 'instagram';
  if (u.includes('tiktok.com')) return 'tiktok';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('reddit.com')) return 'reddit';
  return 'web';
};

export const domainFrom = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

export const isImageUrl = (url: string) =>
  /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(url);

export const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '');
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const parts = u.pathname.split('/');
    const i = parts.indexOf('shorts');
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return null;
  } catch {
    return null;
  }
};

export const fallbackFavicon = (domain: string) =>
  domain ? `https://www.google.com/s2/favicons?sz=256&domain=${encodeURIComponent(domain)}` : null;

export const youtubeThumb = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
};
