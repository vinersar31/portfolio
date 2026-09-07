"use client";

import { useState } from "react";
import { projects, Project, ProjectCategory } from "@/data/projects";
import { ExternalLink, Lock, Pin, Sparkles, Clock, Globe } from "lucide-react";

const CATEGORIES: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vision", label: "Autonomous & Vision" },
  { id: "infra", label: "Infrastructure" },
  { id: "academic", label: "Academic & Apps" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const collisionVision = projects.find((p) => p.title === "collision vision");

  // Filter projects based on active category
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Projects displayed in the grid below (omit Collision Vision from grid when shown as flagship)
  const showFlagship = activeCategory === "all" || activeCategory === "vision";
  const gridProjects = filteredProjects
    .filter((p) => (showFlagship ? p.title !== "collision vision" : true))
    .sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });

  return (
    <section className="py-8 md:py-16 max-w-5xl mx-auto space-y-10 font-light animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono lowercase flex items-center gap-2">
          <span className="text-primary select-none">/</span> projects
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl font-light">
          A curated selection of engineering systems, computer vision models, and personal infrastructure.
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? projects.length
              : projects.filter((p) => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-foreground text-background shadow-xs font-semibold"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? "bg-background/20 text-background font-bold"
                    : "bg-background/80 text-primary font-medium"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Flagship Section: Collision Vision on Top */}
      {showFlagship && collisionVision && (
        <article className="group relative bg-card border border-border rounded-xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl overflow-hidden">
          {/* Ambient Backlight Accent */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-500" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Spec & Description Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono font-bold text-xl">/</span>
                  <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {collisionVision.title}
                  </h2>
                  <Pin className="w-4 h-4 text-primary rotate-45 inline-block" />
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary text-primary font-mono text-[11px] uppercase tracking-wider font-medium">
                  {collisionVision.badge || "yolov8-seg • computer vision"}
                </span>
              </div>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {collisionVision.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {collisionVision.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary text-foreground font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={collisionVision.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>view repository</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Visual Telemetry Radar Component */}
            <div className="lg:col-span-5 w-full flex flex-col gap-3">
              <div className="relative w-full rounded-xl bg-background/90 border border-border p-5 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between pb-3 text-muted-foreground">
                  <span className="font-mono text-xs text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Inference Stream: Model Evaluator
                  </span>
                  <span className="font-mono text-xs text-emerald-500 font-semibold">
                    94.2% mAP50
                  </span>
                </div>

                {/* Precision Segmented SVG Preview */}
                <div className="relative h-44 w-full flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden border border-border/50">
                  <svg
                    className="relative z-10 w-full h-full p-2"
                    fill="none"
                    viewBox="0 0 340 140"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Vehicle Frame Contour */}
                    <path
                      className="stroke-muted-foreground/50"
                      d="M40 100 L70 50 L140 45 L220 45 L280 65 L310 100 Z"
                      strokeDasharray="3 3"
                      strokeWidth="1.5"
                    />
                    {/* Segmentation Polygons (Damage Zones) */}
                    <polygon
                      fill="rgba(239, 68, 68, 0.25)"
                      points="140,55 190,52 205,85 155,95"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                    />
                    <polygon
                      fill="rgba(16, 185, 129, 0.2)"
                      points="75,65 115,55 125,95 80,95"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    {/* Detection Crosshairs */}
                    <circle cx="172" cy="74" fill="#ef4444" r="3" />
                    <line stroke="#ef4444" strokeWidth="1" x1="162" x2="182" y1="74" y2="74" />
                    <line stroke="#ef4444" strokeWidth="1" x1="172" x2="172" y1="64" y2="84" />
                    <text
                      className="font-mono text-[9px] fill-primary"
                      x="186"
                      y="70"
                    >
                      ZONE_DEFORM_A [0.96]
                    </text>
                  </svg>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-center">
                  <div className="p-2 rounded bg-secondary/50 border border-border/40">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase">FPS (CUDA)</div>
                    <div className="font-mono text-sm font-bold text-foreground">62.4</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/50 border border-border/40">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase">LATENCY</div>
                    <div className="font-mono text-sm font-bold text-emerald-500">14.2ms</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/50 border border-border/40">
                    <div className="font-mono text-[10px] text-muted-foreground uppercase">PARAMETERS</div>
                    <div className="font-mono text-sm font-bold text-foreground">3.2M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Secondary Featured Card Placeholder: In development LLM/NLP makemore project */}
      {showFlagship && (
        <article className="group relative bg-card/40 border border-dashed border-border/80 rounded-xl p-6 lg:p-7 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono font-bold text-lg">/</span>
                  <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
                    makemore: llm &amp; nlp from scratch
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary text-amber-500 font-mono text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  in development
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Character-level autoregressive language model suite built from scratch in PyTorch — inspired by Andrej Karpathy&apos;s makemore series. Implements bigram, MLP, RNN, and Transformer architectures with loss visualization and custom token sampling.
              </p>

              <div className="flex flex-wrap gap-2">
                {["PyTorch", "Python", "Transformers", "NLP", "Autoregressive"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground font-mono text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs font-mono text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Upcoming release • Repository in progress</span>
              </div>
            </div>

            {/* Neural Architecture Telemetry Box */}
            <div className="lg:col-span-4 w-full">
              <div className="rounded-xl bg-background/80 border border-border p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-muted-foreground pb-1">
                  <span className="font-mono text-[11px] text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Loss Convergence
                  </span>
                  <span className="font-mono text-[10px] text-emerald-500">2.14 &rarr; 1.58</span>
                </div>
                <div className="w-full bg-secondary/60 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-primary/80 h-full w-[70%]"></div>
                  <div className="bg-emerald-500/80 h-full w-[30%]"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-muted-foreground">
                  <div className="p-1.5 rounded bg-secondary/40">
                    <div>VOCAB_SIZE</div>
                    <div className="text-foreground font-bold">27 chars</div>
                  </div>
                  <div className="p-1.5 rounded bg-secondary/40">
                    <div>DEVICE</div>
                    <div className="text-foreground font-bold">CUDA / MPS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Grid of Remaining Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {gridProjects.map((project) => (
          <article
            key={project.url}
            className="group relative flex flex-col justify-between p-6 bg-card border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:border-primary/40 overflow-hidden"
          >
            {/* Subtle glow accent on hover */}
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />

            <div className="space-y-4 mb-6 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors font-mono lowercase">
                  <span className="text-primary mr-1">/</span> {project.title}
                  {project.pinned && (
                    <Pin className="w-4 h-4 ml-2 inline-block text-primary rotate-45" />
                  )}
                </h3>
                {project.badge && (
                  <span className="shrink-0 text-[10px] md:text-xs font-medium px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full lowercase font-mono">
                    {project.badge}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2 relative z-10">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md transition-colors font-mono lowercase ${
                  project.isPrivate
                    ? "bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-help"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                title={
                  project.isPrivate
                    ? "Private Repository (only accessible with permission)"
                    : "View Repository"
                }
              >
                {project.isPrivate ? (
                  <>
                    <Lock className="w-3.5 h-3.5" /> view repository
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" /> view repository
                  </>
                )}
              </a>

              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-mono lowercase"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>live site</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
