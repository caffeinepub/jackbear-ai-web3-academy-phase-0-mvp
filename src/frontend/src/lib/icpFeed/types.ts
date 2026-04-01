export type FeedSource =
  | "dfinity-medium"
  | "internetcomputer-news"
  | "youtube-rd";

export type FeedSourcePreset = "all" | FeedSource;

export interface FeedItem {
  id: string;
  source: FeedSource;
  title: string;
  excerpt: string;
  publishedAt: Date;
  externalUrl: string;
}
