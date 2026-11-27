"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cvData, generateCvMarkdown } from "@/data/cv";
import aumovioLogo from "@/../public/images/companies/aumovio.svg";
import continentalLogo from "@/../public/images/companies/continental.svg";
import ausyLogo from "@/../public/images/companies/ausy.png";

const companyLogos: Record<string, typeof aumovioLogo> = {
  Aumovio: aumovioLogo,
  Continental: continentalLogo,
  "Ausy Technologies": ausyLogo,
};
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

  const [cvPath, setCvPath] = useState(
    process.env.NEXT_PUBLIC_BASE_PATH
      ? `${process.env.NEXT_PUBLIC_BASE_PATH}/cv.pdf`
      : "/cv.pdf"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSubpath = window.location.pathname.startsWith("/portfolio");
      setCvPath(isSubpath ? "/portfolio/cv.pdf" : "/cv.pdf");
    }
  }, []);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      const isSubpath = window.location.pathname.startsWith("/portfolio");
      const targetPath = isSubpath ? "/portfolio/cv.pdf" : "/cv.pdf";
      e.currentTarget.href = targetPath;
    }
  };

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
    <section className="py-8 md:py-16 max-w-6xl mx-auto space-y-12 font-light animate-fade-in-up">
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
            onClick={handleDownloadClick}
            download="Vinersar_Dan_Ioan_CV.pdf"
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-xs">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-medium">
            CURRENT ROLE
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-foreground">
            Senior SWE @ Aumovio
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-medium">
            LOCATION
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-foreground">
            Sibiu, Romania
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider font-medium">
            DOMAIN
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-foreground">
            ADAS &amp; Simulation
          </span>
        </div>
      </div>

      {/* Technology & Competency Stack and Most Used Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Technology & Competency Stack Card (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between space-y-6 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono font-bold text-lg">#</span>
              <h3 className="text-lg font-bold font-mono text-foreground">
                Technology &amp; Competency Stack
              </h3>
            </div>
          </div>

          <div className="space-y-5 flex-1">
            {cvData.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block font-semibold">
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-foreground font-mono text-xs hover:border-primary/40 transition-colors border border-border/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Language Breakdown Visualizer (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between space-y-6 hover:border-primary/30 transition-all">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2 font-semibold">
              <BarChart3 className="w-4 h-4 text-primary" />
              MOST USED LANGUAGES
            </span>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {/* Proportional Multi-Segment Progress Bar */}
            <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-secondary p-0.5 gap-0.5 shadow-inner">
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono pt-2">
              {cvData.languageStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-muted-foreground truncate">{stat.name}</span>
                  <span className="text-foreground/70 font-semibold ml-auto">
                    {stat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Trajectory Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono font-bold text-lg">//</span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
              Professional Trajectory
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            2019 — PRESENT
          </span>
        </div>

        {/* Connected Professional Trajectory Stream */}
        <div className="relative pl-6 sm:pl-8 ml-2 sm:ml-3">
          {/* Continuous Vertical Trajectory Spine */}
          <div className="absolute left-[7px] sm:left-[11px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary via-border to-border/30 pointer-events-none" />

          <div className="flex flex-col gap-8">
            {cvData.experience.map((exp, expIdx) => (
              <div key={`${exp.company}-${exp.startDate}`} className="relative group">
                {/* Milestone Node on Spine */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-[34px] w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center -translate-x-[1px] bg-background z-10 ${
                    expIdx === 0
                      ? "border-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      : "border-muted-foreground/40 group-hover:border-primary group-hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      expIdx === 0
                        ? "bg-primary animate-pulse"
                        : "bg-muted-foreground/40 group-hover:bg-primary"
                    }`}
                  />
                </div>

                {/* Horizontal Connector Arm from Spine to Card */}
                <div className="absolute -left-4 sm:-left-6 top-[41px] w-4 sm:w-6 h-[2px] bg-border/60 group-hover:bg-primary/40 transition-colors pointer-events-none" />

                {/* Experience Card */}
                <article className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-200 space-y-6">
                  {/* Card Header Strip: Symmetrically Balances Logo + Company on Left, Period on Right */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      {companyLogos[exp.company] && (
                        <div className="h-10 w-28 sm:w-32 rounded-lg bg-white px-2.5 py-1.5 flex items-center justify-center shrink-0 border border-border/80 shadow-xs">
                          <Image
                            src={companyLogos[exp.company]}
                            alt={`${exp.company} logo`}
                            width={110}
                            height={26}
                            className="h-full w-auto max-w-full object-contain"
                          />
                        </div>
                      )}
                      <span className="font-mono text-sm text-primary font-medium">
                        {exp.company}, {exp.location}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-md bg-secondary text-muted-foreground uppercase text-xs tracking-wider font-mono shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Job Title - Unconstrained 1-Line Width */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-foreground tracking-tight">
                      {exp.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
                    {exp.description}
                  </p>

                  {/* Bullet Highlights in 2-Column Responsive Grid on Desktop */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {exp.bullets.map((bullet, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-secondary/35 border border-border/40 flex items-start gap-3 text-xs sm:text-sm hover:border-primary/30 transition-colors"
                        >
                          <span className="text-primary font-mono shrink-0 mt-0.5 p-1 rounded-md bg-primary/10">
                            {idx === 0 && <Code2 className="w-3.5 h-3.5" />}
                            {idx === 1 && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {idx === 2 && <Layers className="w-3.5 h-3.5" />}
                            {idx === 3 && <Users className="w-3.5 h-3.5" />}
                            {idx >= 4 && <Wrench className="w-3.5 h-3.5" />}
                          </span>
                          <span className="text-muted-foreground leading-relaxed">
                            {bullet.title && (
                              <strong className="text-foreground font-medium mr-1.5 block mb-0.5">
                                {bullet.title}
                              </strong>
                            )}
                            {bullet.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground font-mono text-xs border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Foundations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono font-bold text-lg">//</span>
            <h2 className="text-xl md:text-2xl font-bold font-mono text-foreground tracking-tight">
              Academic Foundations
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            DEGREES &amp; RESEARCH
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cvData.education.map((edu) => (
            <article
              key={edu.degree}
              className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all duration-200 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs uppercase font-semibold">
                    {edu.degree}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground pt-1">
                  {edu.field}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-muted-foreground pt-5 border-t border-border/40 mt-4">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <span>{edu.institution}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
