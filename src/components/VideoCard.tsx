import { useState } from "react";
import { detect, safe, ytId } from "../lib/platforms";
import type { LinkItem } from "../types";
import Badge from "./Badge";

export default function VideoCard({ item }: { item: LinkItem }) {
  const id = ytId(item.url);
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <a className="vid" href={safe(item.url)} target="_blank" rel="noopener noreferrer">
      <div className="thumb">
        {id && !thumbFailed && (
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            onError={() => setThumbFailed(true)}
          />
        )}
        <Badge platform={detect(item.url)} />
        <span className="play" aria-hidden="true">▶</span>
      </div>
      <b>{item.label}</b>
      {item.note && <small>{item.note}</small>}
    </a>
  );
}
