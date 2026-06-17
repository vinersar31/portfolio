import { projects } from "@/data/projects";
import { ExternalLink, Lock } from "lucide-react";

export default function Projects() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 md:py-24 pt-24">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float pointer-events-none" />

      <section className="max-w-5xl mx-auto space-y-12 font-light px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono lowercase animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-primary">/</span> projects <span className="text-2xl">🚀</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.url}
              className="group relative flex flex-col justify-between bg-card border border-border rounded-xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto flex-1 text-center pr-8">
                  <span className="text-xs font-mono text-muted-foreground lowercase">
                    {project.title.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}.sh
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors font-mono lowercase">
                      <span className="text-primary">/</span> {project.title}
                    </h3>
                    {project.badge && (
                      <span className="shrink-0 text-xs font-mono text-foreground bg-foreground/5 px-2 py-1 rounded-md lowercase">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    <span className="text-primary font-mono font-bold mr-2">&gt;</span>
                    {project.description}
                  </p>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium w-fit px-4 py-2 rounded-md transition-all font-mono lowercase ${
                    project.isPrivate
                      ? "bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-help"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
                  }`}
                  title={project.isPrivate ? "Private Repository (only accessible with permission)" : "View Repository"}
                >
                  {project.isPrivate ? (
                    <>
                      <Lock className="w-4 h-4" /> view repository
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" /> view repository
                    </>
                  )}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
