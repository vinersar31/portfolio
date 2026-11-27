export interface SocialLink {
  label: string;
  href: string;
  /** external links open in a new tab; internal ones use the router */
  external: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "github", href: "https://github.com/vinersar31", external: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/dan-ioan-v-6b1220218/", external: true },
  { label: "email", href: "mailto:danvinersar98@gmail.com", external: false },
  { label: "cv", href: "/cv", external: false },
];

export const INTRO = {
  greeting: "hi, i'm dan-ioan vinersar",
  location: "sibiu, romania",
  headlineStart: "i write c++ that helps",
  headlineHighlight: "autonomous trucks",
  headlineEnd: "learn to drive, then go home and build things with ai.",
  bio: [
    "senior software engineer at aumovio. by day i build simulation pipelines for adas and l4 autonomous trucking, plus a real-time data framework running on arm.",
    "by night: computer vision, llm tooling, and a homelab that runs more services than it should.",
  ],
};

/** what i'm doing right now. keep this short and update it every few months. */
export const NOW: string[] = [
  "building sil replay for the aurora partnership",
  "training yolov8-seg models",
  "keeping personal-ops alive",
];

/** project titles (from src/data/projects.ts) shown under "selected work" on the home page */
export const SELECTED_WORK: { title: string; summary: string }[] = [
  { title: "collision vision", summary: "car-damage segmentation with yolov8-seg, 94.2% map" },
  { title: "personal-ops", summary: "gitops and ci/cd behind capital, vault, sentinel and codex" },
  { title: "capital", summary: "a wealth tracker with live portfolio data" },
];
