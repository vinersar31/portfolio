"use client";

import { useState } from "react";
import { projects, ProjectCategory } from "@/data/projects";
import { Lock, Pin, Sparkles, Clock } from "lucide-react";

const CATEGORIES: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "all" },
  { id: "vision", label: "autonomous & vision" },
  { id: "infra", label: "infrastructure" },
  { id: "academic", label: "academic & apps" },
];

const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORIES.map((cat) => [
    cat.id,
    cat.id === "all"
      ? projects.length
      : projects.filter((p) => p.category === cat.id).length,
  ])
) as Record<string, number>;

const COLLISION_VISION_PROJECT = projects.find((p) => p.title === "collision vision");

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const collisionVision = COLLISION_VISION_PROJECT;

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
    <section className="mx-auto max-w-3xl space-y-10 pt-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-[clamp(1.75rem,5vw,2.6rem)] font-semibold tracking-[-0.025em]">
          <span className="text-primary font-mono select-none">/</span> projects
        </h1>
        <p className="text-[17px] leading-relaxed text-muted-foreground max-w-2xl">
          a selection of engineering systems, computer vision models, and personal infrastructure.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-3 font-mono text-sm">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = CATEGORY_COUNTS[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={isActive}
              className={`cursor-pointer transition-colors ${
                isActive
                  ? "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label} <span className={isActive ? "text-primary" : ""}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Flagship Section: Collision Vision on Top */}
      {showFlagship && collisionVision && (
        <article className="group relative bg-accent/60 rounded-[var(--radius)] p-6 lg:p-8">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Spec & Description Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono font-bold text-xl">/</span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                    {collisionVision.title}
                  </h2>
                  <Pin className="w-4 h-4 text-primary rotate-45 inline-block" />
                </div>
                <span className="font-mono text-xs text-primary">
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
                    className="font-mono text-xs text-muted-foreground"
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
                  className="font-mono text-sm link-underline text-foreground"
                >
                  view repository <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Visual Telemetry Radar Component */}
            <div className="lg:col-span-5 w-full flex flex-col gap-3">
              <div className="relative w-full rounded-[var(--radius)] bg-background border border-border p-5 overflow-hidden">
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
                    <div className="font-mono text-[10px] text-muted-foreground">FPS (CUDA)</div>
                    <div className="font-mono text-sm font-bold text-foreground">62.4</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/50 border border-border/40">
                    <div className="font-mono text-[10px] text-muted-foreground">LATENCY</div>
                    <div className="font-mono text-sm font-bold text-emerald-500">14.2ms</div>
                  </div>
                  <div className="p-2 rounded bg-secondary/50 border border-border/40">
                    <div className="font-mono text-[10px] text-muted-foreground">PARAMETERS</div>
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
        <article className="relative border border-dashed border-border rounded-[var(--radius)] p-6 lg:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono font-bold text-lg">/</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    makemore: llm &amp; nlp from scratch
                  </h3>
                </div>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
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
                    className="font-mono text-xs text-muted-foreground"
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
              <div className="rounded-[var(--radius)] bg-background border border-border p-4 flex flex-col gap-2.5">
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

      {/* List of remaining projects */}
      <ul className="border-t border-border">
        {gridProjects.map((project) => (
          <li key={project.url} className="border-b border-border py-5">
            <article className="grid gap-2 sm:grid-cols-[1fr_auto] sm:gap-x-6">
              <div className="min-w-0 space-y-2">
                <h3 className="text-lg font-medium leading-snug">
                  <span className="text-primary font-mono mr-1">/</span> {project.title}
                  {project.pinned && (
                    <Pin className="w-3.5 h-3.5 ml-2 inline-block text-primary rotate-45" aria-label="pinned" />
                  )}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <p className="font-mono text-xs text-muted-foreground">{project.tags.join(" · ")}</p>
                )}
              </div>

              <div className="flex flex-wrap items-start gap-x-4 gap-y-1 font-mono text-sm sm:flex-col sm:items-end sm:text-right">
                {project.badge && <span className="text-xs text-primary">{project.badge}</span>}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={project.isPrivate ? "inline-flex items-center gap-1.5 text-muted-foreground cursor-help" : "link-underline text-foreground"}
                  title={
                    project.isPrivate
                      ? "private repository (only accessible with permission)"
                      : "view repository"
                  }
                >
                  {project.isPrivate && <Lock className="w-3.5 h-3.5" aria-hidden="true" />}
                  view repository{!project.isPrivate && <span aria-hidden="true"> ↗</span>}
                </a>
                {project.siteUrl && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-foreground"
                  >
                    live site <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
