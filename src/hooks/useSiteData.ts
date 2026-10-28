import { useEffect, useState } from "react";
import { DEFAULT_DATA } from "../data/defaultData";
import { fetchSiteData } from "../lib/siteStore";
import type { SiteData } from "../types";

/**
 * Holds the site content. Loads it from Firestore; if nothing is saved yet
 * (or Firebase is not configured) the default content is used.
 */
export function useSiteData() {
  const [data, setData] = useState<SiteData>(() => structuredClone(DEFAULT_DATA));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchSiteData()
      .then((remote) => {
        if (!cancelled && remote) setData(remote);
      })
      .catch((err) => console.error("Could not load site data:", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, setData, loading };
}
