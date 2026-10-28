import { useEffect, useState } from "react";

/** Header logo image, falling back to the brand name as text. */
export default function Logo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return <div className="fallback" aria-hidden="true">{name}</div>;
  }
  return <img src={src} alt="" onError={() => setFailed(true)} />;
}
