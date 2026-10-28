import type { SiteData } from "../types";

/** Default content. Replaced at runtime by /data.json if one is uploaded. */
export const DEFAULT_DATA: SiteData = {
  brand: {
    name: "Pindrop Miles",
    tagline: "Every mile, a new discovery",
    logo: "/assets/logo.svg",
  },
  socials: [
    { platform: "facebook", url: "https://facebook.com/" },
    { platform: "youtube", url: "https://youtube.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "tiktok", url: "https://tiktok.com/" },
    { platform: "x", url: "https://x.com/" },
    { platform: "threads", url: "https://threads.net/" },
    { platform: "linkedin", url: "https://linkedin.com/" },
    { platform: "pinterest", url: "https://pinterest.com/" },
  ],
  sections: [
    {
      title: "Popular videos",
      type: "videos",
      items: [
        { label: "Popular video 1", url: "https://youtube.com/", note: "Paste a YouTube link for an automatic thumbnail" },
        { label: "Popular video 2", url: "https://youtube.com/", note: "" },
        { label: "Popular video 3", url: "https://tiktok.com/", note: "" },
        { label: "Popular video 4", url: "https://instagram.com/", note: "" },
        { label: "Popular video 5", url: "https://youtube.com/", note: "" },
      ],
    },
    {
      title: "Latest",
      type: "links",
      items: [{ label: "Newest video title goes here", url: "https://youtube.com/", note: "Added this week" }],
    },
    {
      title: "Trending",
      type: "links",
      items: [{ label: "Trending post title goes here", url: "https://instagram.com/", note: "" }],
    },
    {
      title: "Most liked",
      type: "links",
      items: [{ label: "Most liked video title goes here", url: "https://tiktok.com/", note: "" }],
    },
    {
      title: "Travel guides",
      type: "links",
      items: [
        { label: "Lisbon in 3 days: our route", url: "https://example.com/lisbon-guide", note: "Blog or PDF guide" },
        { label: "Where to eat in Lisbon", url: "https://example.com/lisbon-food", note: "" },
        { label: "Our saved places map", url: "https://maps.google.com/", note: "Google Maps list" },
      ],
    },
    {
      title: "Playlists and series",
      type: "links",
      items: [
        { label: "Lisbon food series", url: "https://youtube.com/", note: "YouTube playlist" },
        { label: "Hidden corners of Portugal", url: "https://youtube.com/", note: "" },
      ],
    },
    {
      title: "About us",
      type: "text",
      text: "We are Pindrop Miles. We explore Lisbon and beyond, one mile at a time, and share the food, hidden corners and honest tips we find along the way.",
      items: [],
    },
    {
      title: "Work with us",
      type: "links",
      items: [{ label: "Brand and tourism collaborations", url: "mailto:hello@example.com", note: "hello@example.com" }],
    },
    {
      title: "Join and support",
      type: "links",
      items: [
        { label: "Get new guides by email", url: "https://example.com/newsletter", note: "Newsletter" },
        { label: "Support our trips", url: "https://example.com/support", note: "Buy us a coffee" },
      ],
    },
  ],
};
