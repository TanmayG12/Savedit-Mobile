const OG_ENDPOINT = process.env.EXPO_PUBLIC_OG_ENDPOINT;

export type OgResult = {
  ok?: boolean;
  title?: string;
  description?: string;
  image?: string | null;
  siteName?: string;
  icon?: string | null;
  url?: string;
};

export async function fetchOg(url: string): Promise<OgResult | null> {
  if (!OG_ENDPOINT) return null;
  try {
    const resp = await fetch(`${OG_ENDPOINT}?url=${encodeURIComponent(url)}`);
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}
