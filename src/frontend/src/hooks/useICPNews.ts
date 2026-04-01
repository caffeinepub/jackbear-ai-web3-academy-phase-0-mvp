import { useEffect, useState } from "react";

export interface ICPNewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

interface UseICPNewsResult {
  items: ICPNewsItem[];
  loading: boolean;
  error: string | null;
}

const SOURCES: { url: string; label: string }[] = [
  {
    url: "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/dfinity",
    label: "DFINITY",
  },
  // ICP Blog feed (internetcomputer.org/blog/feed.xml) returns 422 via rss2json — disabled
  // Re-enable when a valid feed URL is confirmed
];

async function fetchSource(source: { url: string; label: string }): Promise<
  ICPNewsItem[]
> {
  const res = await fetch(source.url);
  if (!res.ok) throw new Error(`Non-OK response from ${source.label}`);
  const data = await res.json();
  const raw: { title: string; link: string; pubDate: string }[] =
    data?.items ?? [];
  return raw.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    source: source.label,
  }));
}

function mergeAndSort(arrays: ICPNewsItem[][]): ICPNewsItem[] {
  const seen = new Set<string>();
  const merged: ICPNewsItem[] = [];
  for (const arr of arrays) {
    for (const item of arr) {
      const key = item.link.trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }
  }
  return merged.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );
}

export function useICPNews(): UseICPNewsResult {
  const [items, setItems] = useState<ICPNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.allSettled(SOURCES.map(fetchSource)).then((results) => {
      if (cancelled) return;

      const successful: ICPNewsItem[][] = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          successful.push(result.value);
        }
      }

      if (successful.length === 0) {
        setError("Unable to load ICP news");
        setLoading(false);
        return;
      }

      const merged = mergeAndSort(successful).slice(0, 50);
      setItems(merged);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
