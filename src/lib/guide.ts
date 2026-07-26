import { getCollection, type CollectionEntry } from "astro:content";
import { GUIDE_SECTIONS } from "@/types";
import {
  BookOpen,
  Rocket,
  LayoutGrid,
  PlusCircle,
  Handshake,
  CalendarClock,
  Target,
  PartyPopper,
  Receipt,
  LineChart,
  Bell,
  DatabaseBackup,
  ShieldCheck,
  Palette,
  Tags,
} from "lucide-react";

export type GuidePage = CollectionEntry<"guide">;

/** Frontmatter `icon` values resolve here; unknown names fall back to BookOpen. */
const icons = {
  BookOpen,
  Rocket,
  LayoutGrid,
  PlusCircle,
  Handshake,
  CalendarClock,
  Target,
  PartyPopper,
  Receipt,
  LineChart,
  Bell,
  DatabaseBackup,
  ShieldCheck,
  Palette,
  Tags,
};

export function guideIcon(name: string) {
  return icons[name as keyof typeof icons] ?? BookOpen;
}

/** Every published guide page, in reading order. */
export async function getGuidePages(): Promise<GuidePage[]> {
  const pages = await getCollection("guide", ({ data }) => !data.draft);
  return pages.sort((a, b) => a.data.order - b.data.order);
}

export function groupBySection(pages: GuidePage[]) {
  return GUIDE_SECTIONS.map((section) => ({
    section,
    pages: pages.filter((p) => p.data.section === section),
  })).filter((g) => g.pages.length > 0);
}

export const navLabel = (page: GuidePage) => page.data.navLabel ?? page.data.title;

export const guideHref = (page: GuidePage) => `/guide/${page.id}`;
