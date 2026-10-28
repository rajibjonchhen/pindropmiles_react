import { detect, safe } from "../lib/platforms";
import type { LinkItem } from "../types";
import Badge from "./Badge";

export default function LinkRow({ item }: { item: LinkItem }) {
  return (
    <a className="link" href={safe(item.url)} target="_blank" rel="noopener noreferrer">
      <Badge platform={detect(item.url)} />
      <span>
        <b>{item.label}</b>
        {item.note && <small>{item.note}</small>}
      </span>
      <span className="go" aria-hidden="true">↗</span>
    </a>
  );
}
