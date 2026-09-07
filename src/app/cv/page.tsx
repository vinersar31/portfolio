"use client";

import { useState, useCallback } from "react";
import { cvData, generateCvMarkdown } from "@/data/cv";
import {
  Download,
  Copy,
  Check,
  Code2,
  CheckCircle2,
  Layers,
  Users,
  Wrench,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function CV() {
  const [copied, setCopied] = useState(false);

  const cvPath =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
      ? `${process.env.NEXT_PUBLIC_BASE_PATH}/cv.pdf`
      : "/portfolio/cv.pdf";

  const handleCopyMarkdown = useCallback(async () => {
    try {
      const markdown = generateCvMarkdown(cvData);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown to clipboard:", err);
    }
  }, []);

  return (
    <section className="py-8 md:py-16 max-w-5xl mx-auto space-y-10 font-light animate-fade-in-up">
      {/* Hero / Introduction Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono lowercase flex items-center gap-2">
            <span className="text-primary select-none">/</span> curriculum vitae
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
            here you&apos;ll find a snapshot of my professional background in software development.
            download the full CV below for details on my experience, education, and skills.
          </p>

          <div className="text-xs md:text-sm font-mono text-muted-foreground/80 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{cvData.personal.location}</span>
            <span>•</span>
            <span>{cvData.personal.phone}</span>
            <span>•</span>
            <a
              href={`mailto:${cvData.personal.email}`}
              className="text-primary hover:underline"
            >
              {cvData.personal.email}
            </a>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Copy Markdown Button */}
          <button
            onClick={handleCopyMarkdown}
            className="group relative px-4 py-2.5 rounded-lg bg-card hover:bg-secondary border border-border transition-all flex items-center gap-2 text-foreground font-mono text-xs cursor-pointer shadow-xs"
            title="Copy CV formatted as Markdown to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            )}
            <span>{copied ? "Copied Markdown!" : "Copy Markdown"}</span>

            {/* Toast Tooltip */}
            <span
              className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-emerald-500 text-white font-mono text-[10px] font-semibold transition-all duration-200 pointer-events-none shadow-md ${
                copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              Copied to clipboard!
            </span>
          </button>

          {/* Download PDF Button */}
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-semibold hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>download cv (pdf)</span>
          </a>
        </div>
      </div>

      {/* Quick-Strip Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-card border border-border shadow-xs">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            CURRENT ROLE
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold text-foreground">
            Senior SWE @ Aumovio
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            LOCATION
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold text-foreground">
            Sibiu, Romania
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            DOMAIN
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold text-foreground">
            ADAS &amp; Simulation
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            STATUS
          </span>
          <span className="font-mono text-xs sm:text-sm font-semibold text-emerald-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active at Aumovio
          </span>
        </div>
      </div>

      {/* Main Content Layout: Stream & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Stream: Timeline (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Professional Experience Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono font-bold text-lg">//</span>
                <h2 className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
                  Professional Trajectory
                </h2>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                2019 — PRESENT
              </span>
            </div>

            {/* Experience Cards */}
            <div className="flex flex-col gap-4">
              {cvData.experience.map((exp) => (
                <article
                  key={`${exp.company}-${exp.startDate}`}
                  className="group p-6 rounded-xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg md:text-xl font-bold font-mono text-foreground">
                          {exp.title}
                        </h3>
                        {exp.active && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <span className="font-mono text-xs text-primary font-medium">
                        {exp.company}, {exp.location}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-muted-foreground uppercase sm:text-right">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs md:text-sm"
                        >
                          <span className="text-primary font-mono shrink-0 mt-0.5">
                            {idx === 0 && <Code2 className="w-4 h-4 inline" />}
                            {idx === 1 && <CheckCircle2 className="w-4 h-4 inline" />}
                            {idx === 2 && <Layers className="w-4 h-4 inline" />}
                            {idx === 3 && <Users className="w-4 h-4 inline" />}
                            {idx >= 4 && <Wrench className="w-4 h-4 inline" />}
                          </span>
                          <span className="text-muted-foreground leading-relaxed">
                            {bullet.title && (
                              <strong className="text-foreground font-medium mr-1.5">
                                {bullet.title}:
                              </strong>
                            )}
                            {bullet.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Academic Foundations Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono font-bold text-lg">//</span>
                <h2 className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
                  Academic Foundations
                </h2>
              </div>
              <span className="font-mono text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                DEGREES &amp; RESEARCH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cvData.education.map((edu) => (
                <article
                  key={edu.degree}
                  className="p-6 rounded-xl bg-card border border-border shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[10px] uppercase font-semibold">
                        {edu.degree}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase">
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold font-mono text-foreground mb-1">
                      {edu.field}
                    </h3>
                    <p className="text-muted-foreground text-xs font-mono mb-4">
                      {edu.institution}
                    </p>

                    <div className="p-3 rounded-lg bg-secondary/50 border border-border/40 mb-4">
                      <span className="font-mono text-[10px] text-primary block mb-1 font-semibold uppercase">
                        {edu.specializationLabel}
                      </span>
                      <p className="font-mono text-xs text-foreground/90 leading-relaxed">
                        {edu.specializationText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>{edu.institution}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Competency Stack Card */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono font-bold">#</span>
                <h3 className="text-base font-bold font-mono text-foreground">
                  Competency Stack
                </h3>
              </div>
            </div>

            {cvData.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-2">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block font-semibold">
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-secondary text-foreground font-mono text-xs hover:border-primary/40 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Language Breakdown Visualizer */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                MOST USED LANGUAGES
              </span>
            </div>

            {/* Proportional Multi-Segment Progress Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-secondary p-0.5 gap-0.5">
              {cvData.languageStats.map((stat, idx) => (
                <div
                  key={stat.name}
                  className={`h-full ${idx === 0 ? "rounded-l-full" : ""} ${
                    idx === cvData.languageStats.length - 1 ? "rounded-r-full" : ""
                  }`}
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color,
                  }}
                  title={`${stat.name} ${stat.percentage}%`}
                />
              ))}
            </div>

            {/* Legend Chips */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono pt-1">
              {cvData.languageStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-muted-foreground">{stat.name}</span>
                  <span className="text-foreground/60 text-[10px]">
                    {stat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
