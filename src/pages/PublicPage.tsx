import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Badge from "../components/Badge";
import LinkRow from "../components/LinkRow";
import Logo from "../components/Logo";
import VideoCard from "../components/VideoCard";
import { ACCENTS, PLATFORMS, isPlatformKey, safe } from "../lib/platforms";
import type { LinkItem, Section, SiteData } from "../types";
import "../styles/public.css";

export default function PublicPage({ data }: { data: SiteData }) {
  const { brand, socials, sections } = data;
  const [footLogoFailed, setFootLogoFailed] = useState(false);

  useEffect(() => {
    document.title = `${brand.name} — ${brand.tagline}`;
  }, [brand.name, brand.tagline]);

  // Accent colours cycle through the visible sections only, as in the original.
  let accentIndex = 0;
  const visible: { s: Section; items: LinkItem[]; accent: string }[] = [];
  for (const s of sections) {
    if (s.type === "text") {
      if (s.text) visible.push({ s, items: [], accent: ACCENTS[accentIndex++ % 3] });
      continue;
    }
    const items = s.items.filter((i) => i.url && i.label);
    if (items.length) visible.push({ s, items, accent: ACCENTS[accentIndex++ % 3] });
  }

  return (
    <div className="public">
      <main className="wrap">
        <div className="hero">
          <div>
            <Logo src={brand.logo} name={brand.name} />
          </div>
          <h1 className="sr">{brand.name}</h1>
          <p className="sr">{brand.tagline}</p>
        </div>

        <nav className="socials" aria-label="Social media profiles">
          {socials
            .filter((s) => s.url)
            .map((s, n) => {
              const key = isPlatformKey(s.platform) ? s.platform : "web";
              return (
                <a
                  key={n}
                  className="soc"
                  href={safe(s.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={PLATFORMS[key].n}
                >
                  <Badge platform={key} accent={ACCENTS[n % 3]} />
                  {PLATFORMS[key].n}
                </a>
              );
            })}
        </nav>

        <div>
          {visible.map(({ s, items, accent }, i) => (
            <section key={i} style={{ "--c": accent } as CSSProperties}>
              <h2>{s.title}</h2>
              {s.type === "text" ? (
                <p className="about">{s.text}</p>
              ) : s.type === "videos" ? (
                <div className="vgrid">
                  {items.map((it, k) => (
                    <VideoCard key={k} item={it} />
                  ))}
                </div>
              ) : (
                <div className="list">
                  {items.map((it, k) => (
                    <LinkRow key={k} item={it} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer>
        {!footLogoFailed && <img src="logo.png" alt="" onError={() => setFootLogoFailed(true)} />}
        <p>© {new Date().getFullYear()} {brand.name}</p>
      </footer>
    </div>
  );
}
