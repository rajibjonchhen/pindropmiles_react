import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { SiteData } from "../types";

const DOC_PATH = ["site", "main"] as const;

export const isSiteData = (d: unknown): d is SiteData => {
  const x = d as SiteData;
  return !!x && !!x.brand && Array.isArray(x.socials) && Array.isArray(x.sections);
};

/** Read the public page content. Returns null when nothing is saved yet. */
export async function fetchSiteData(): Promise<SiteData | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, ...DOC_PATH));
  const value = snap.data();
  return isSiteData(value) ? value : null;
}

/** Save the public page content (needs an admin user, enforced by Firestore rules). */
export async function saveSiteData(data: SiteData): Promise<void> {
  if (!db) throw new Error("Firebase is not configured.");
  // Firestore rejects `undefined`, so strip it by round-tripping through JSON.
  const clean = JSON.parse(JSON.stringify(data)) as SiteData;
  await setDoc(doc(db, ...DOC_PATH), clean);
}
