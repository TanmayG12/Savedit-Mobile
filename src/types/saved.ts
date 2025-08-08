export type Platform =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitter'
  | 'reddit'
  | 'web';

export type SavedItem = {
  id: string;
  url: string;
  title: string;
  platform: Platform;
  tags: string[];
  notes?: string;
  addedAt: number;
  domain: string;
  image?: string | null;
};
