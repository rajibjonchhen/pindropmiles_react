import type { CSSProperties } from "react";
import { ICONS, PLATFORMS } from "../lib/platforms";
import type { PlatformKey } from "../types";

interface Props {
  platform: PlatformKey;
  accent?: string;
}

export default function Badge({ platform, accent }: Props) {
  const style = { background: PLATFORMS[platform].c, ...(accent ? { "--c": accent } : {}) } as CSSProperties;
  return (
    <span className="badge" style={style} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="56%" height="56%" fill="#fff">
        {ICONS[platform]}
      </svg>
    </span>
  );
}
