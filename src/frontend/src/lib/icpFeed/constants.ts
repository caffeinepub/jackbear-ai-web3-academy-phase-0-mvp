import type { FeedSource, FeedSourcePreset } from "./types";

export const FEED_SOURCE_LABELS: Record<FeedSource, string> = {
  "dfinity-medium": "DFINITY Medium",
  "internetcomputer-news": "InternetComputer.org News",
  "youtube-rd": "YouTube Global R&D",
};

export const FEED_SOURCE_DESCRIPTIONS: Record<FeedSource, string> = {
  "dfinity-medium": "Official engineering and foundation posts",
  "internetcomputer-news": "Press releases and ecosystem highlights",
  "youtube-rd": "Live technical briefings from core engineers",
};

export const FEED_PRESET_LABELS: Record<FeedSourcePreset, string> = {
  all: "All",
  "internetcomputer-news": "Latest News",
  "dfinity-medium": "Medium",
  "youtube-rd": "YouTube",
};

export const PRESET_TO_SOURCE: Record<
  Exclude<FeedSourcePreset, "all">,
  FeedSource
> = {
  "internetcomputer-news": "internetcomputer-news",
  "dfinity-medium": "dfinity-medium",
  "youtube-rd": "youtube-rd",
};
