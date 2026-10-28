import { useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { isSiteData, saveSiteData } from "../lib/siteStore";
import { PLATFORMS } from "../lib/platforms";
import type { LinkItem, PlatformKey, Section, SectionType, SiteData, Social } from "../types";
import "../styles/admin.css";

interface Props {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onPreview: () => void;
  userEmail: string;
}

const PLATFORM_OPTIONS = (Object.keys(PLATFORMS) as PlatformKey[])
  .filter((k) => k !== "web")
  .map((k) => ({ value: k, label: PLATFORMS[k].n }));

const LAYOUT_OPTIONS: { value: SectionType; label: string }[] = [
  { value: "links", label: "Link list" },
  { value: "videos", label: "Video cards" },
  { value: "text", label: "Text block" },
];

const emptyItem = (): LinkItem => ({ label: "", url: "", note: "" });

export default function AdminPage({ data, onChange, onPreview, userEmail }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await saveSiteData(data);
      setStatus({ kind: "ok", text: "Saved. Your live page now shows these changes." });
    } catch (err) {
      const code = (err as { code?: string }).code;
      setStatus({
        kind: "err",
        text:
          code === "permission-denied"
            ? "This account is not allowed to save. Check the admin UID in your Firestore rules."
            : "Could not save. Check your connection and try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- immutable update helpers ---------- */
  const setBrand = (patch: Partial<SiteData["brand"]>) =>
    onChange({ ...data, brand: { ...data.brand, ...patch } });

  const setSocials = (socials: Social[]) => onChange({ ...data, socials });
  const patchSocial = (i: number, patch: Partial<Social>) =>
    setSocials(data.socials.map((s, n) => (n === i ? { ...s, ...patch } : s)));

  const setSections = (sections: Section[]) => onChange({ ...data, sections });
  const patchSection = (i: number, patch: Partial<Section>) =>
    setSections(data.sections.map((s, n) => (n === i ? { ...s, ...patch } : s)));
  const patchItem = (si: number, ii: number, patch: Partial<LinkItem>) =>
    patchSection(si, {
      items: data.sections[si].items.map((it, n) => (n === ii ? { ...it, ...patch } : it)),
    });

  /* ---------- file actions ---------- */
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "site-backup.json";
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const load = async (file: File) => {
    try {
      const json = JSON.parse(await file.text());
      if (!isSiteData(json)) throw new Error();
      onChange(json);
    } catch {
      alert("That file is not valid JSON.");
    }
  };

  return (
    <div className="admin">
      <div className="topbar">
        <h1>Edit your links</h1>
        <div className="who">
          <span className="note">{userEmail}</span>
          <button type="button" onClick={() => auth && signOut(auth)}>
            Sign out
          </button>
        </div>
      </div>
      <p className="note">
        Change anything below, then choose Save changes to publish. Visitors see the saved version only, so
        use Preview page to check your edits first.
      </p>

      <div className="card">
        <h2>Brand</h2>
        <div className="row">
          <input
            value={data.brand.name}
            placeholder="Brand name"
            aria-label="Brand name"
            onChange={(e) => setBrand({ name: e.target.value })}
          />
          <input
            value={data.brand.tagline}
            placeholder="Tagline"
            aria-label="Tagline"
            onChange={(e) => setBrand({ tagline: e.target.value })}
          />
        </div>
        <div className="row">
          <input
            value={data.brand.logo}
            placeholder="Header logo file (e.g. logo-full.png)"
            aria-label="Header logo file (e.g. logo-full.png)"
            onChange={(e) => setBrand({ logo: e.target.value })}
          />
        </div>
      </div>

      <div className="card">
        <h2>Social profiles</h2>
        {data.socials.map((s, i) => (
          <div className="row" key={i}>
            <select
              aria-label="Platform"
              value={s.platform}
              onChange={(e) => patchSocial(i, { platform: e.target.value })}
            >
              {PLATFORM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <input
              value={s.url}
              placeholder="Profile link"
              aria-label="Profile link"
              onChange={(e) => patchSocial(i, { url: e.target.value })}
            />
            <button
              type="button"
              className="del"
              onClick={() => setSocials(data.socials.filter((_, n) => n !== i))}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setSocials([...data.socials, { platform: "facebook", url: "" }])}>
          Add profile
        </button>
      </div>

      {data.sections.map((s, si) => (
        <div className="card" key={si}>
          <div className="row">
            <input
              value={s.title}
              placeholder="Section title"
              aria-label="Section title"
              onChange={(e) => patchSection(si, { title: e.target.value })}
            />
            <select
              aria-label="Layout"
              value={s.type || "links"}
              onChange={(e) => patchSection(si, { type: e.target.value as SectionType })}
            >
              {LAYOUT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="del"
              onClick={() => setSections(data.sections.filter((_, n) => n !== si))}
            >
              Remove
            </button>
          </div>

          {s.type === "text" ? (
            <textarea
              rows={4}
              aria-label="Text"
              placeholder="Write a short paragraph"
              value={s.text || ""}
              onChange={(e) => patchSection(si, { text: e.target.value })}
            />
          ) : (
            <>
              {s.items.map((it, ii) => (
                <div className="row" key={ii}>
                  <input
                    value={it.label}
                    placeholder="Title"
                    aria-label="Title"
                    onChange={(e) => patchItem(si, ii, { label: e.target.value })}
                  />
                  <input
                    value={it.url}
                    placeholder="Link (YouTube, TikTok, any URL)"
                    aria-label="Link (YouTube, TikTok, any URL)"
                    onChange={(e) => patchItem(si, ii, { url: e.target.value })}
                  />
                  <input
                    value={it.note}
                    placeholder="Short note (optional)"
                    aria-label="Short note (optional)"
                    onChange={(e) => patchItem(si, ii, { note: e.target.value })}
                  />
                  <button
                    type="button"
                    className="del"
                    onClick={() => patchSection(si, { items: s.items.filter((_, n) => n !== ii) })}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => patchSection(si, { items: [...s.items, emptyItem()] })}>
                Add link
              </button>
            </>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setSections([...data.sections, { title: "New section", type: "links", items: [emptyItem()] }])
        }
      >
        Add section
      </button>

      <div className="bar">
        <button type="button" className="pri" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button type="button" onClick={onPreview}>
          Preview page
        </button>
        <button type="button" onClick={download}>
          Download backup
        </button>
        <button type="button" onClick={() => fileRef.current?.click()}>
          Load backup…
        </button>
        {status && (
          <span className={status.kind === "ok" ? "status ok" : "status err"} role="status">
            {status.text}
          </span>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) load(f);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
