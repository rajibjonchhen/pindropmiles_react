export type PlatformKey =
  | "facebook"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "x"
  | "threads"
  | "linkedin"
  | "pinterest"
  | "mail"
  | "web";

export type SectionType = "links" | "videos" | "text";

export interface LinkItem {
  label: string;
  url: string;
  note: string;
}

export interface Social {
  platform: string;
  url: string;
}

export interface Section {
  title: string;
  type: SectionType;
  items: LinkItem[];
  text?: string;
}

export interface Brand {
  name: string;
  tagline: string;
  logo: string;
}

export interface SiteData {
  brand: Brand;
  socials: Social[];
  sections: Section[];
}
