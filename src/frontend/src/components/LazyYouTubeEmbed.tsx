import { Play } from "lucide-react";
import { useState } from "react";

interface LazyYouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnailQuality?: "maxresdefault" | "hqdefault" | "mqdefault" | "sddefault";
  className?: string;
}

export default function LazyYouTubeEmbed({
  videoId,
  title,
  thumbnailQuality = "maxresdefault",
  className = "",
}: LazyYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  if (isPlaying) {
    return (
      <div className={`relative aspect-video ${className}`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      className={`relative aspect-video group/lazy ${className}`}
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black/40 group-hover/lazy:bg-black/30 transition-colors flex items-center justify-center rounded-xl">
        <div className="w-20 h-20 rounded-full bg-primary/90 group-hover/lazy:bg-primary group-hover/lazy:scale-110 flex items-center justify-center shadow-glow-lg transition-all">
          <Play
            className="h-10 w-10 text-primary-foreground ml-1"
            fill="currentColor"
          />
        </div>
      </div>
    </button>
  );
}
