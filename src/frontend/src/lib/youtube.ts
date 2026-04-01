/**
 * YouTube utility functions for extracting IDs, building URLs, and generating thumbnails
 */

/**
 * Extract video ID from various YouTube URL formats
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract playlist ID from YouTube playlist URL
 */
export function extractPlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([^&]+)/);
  return match ? match[1] : null;
}

/**
 * Build YouTube thumbnail URL from video ID
 * Uses maxresdefault for highest quality, falls back to hqdefault
 */
export function getYouTubeThumbnailUrl(
  videoId: string,
  quality:
    | "maxresdefault"
    | "hqdefault"
    | "mqdefault"
    | "sddefault" = "maxresdefault",
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Build YouTube watch URL from video ID
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Build YouTube embed URL from video ID
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  const autoplayParam = autoplay ? "?autoplay=1" : "";
  return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
}

/**
 * Build YouTube playlist embed URL from playlist ID
 */
export function getYouTubePlaylistEmbedUrl(playlistId: string): string {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
}

/**
 * Build YouTube playlist watch URL from playlist ID
 */
export function getYouTubePlaylistUrl(playlistId: string): string {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}
