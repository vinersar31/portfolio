import { projects } from "@/data/projects";
import { ExternalLink, Lock } from "lucide-react";

export default function Projects() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] py-12 md:py-24">
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
              className="group relative flex flex-col justify-between p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/50 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-5 mb-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 font-mono lowercase">
                      <span className="text-primary mr-2 opacity-50 group-hover:opacity-100 transition-opacity">/</span>
                      {project.title}
                    </h3>
                    {project.badge && (
                      <span className="shrink-0 text-xs font-mono text-primary-foreground bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-full lowercase shadow-sm">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base group-hover:text-foreground/80 transition-colors duration-300">
                    <span className="text-primary/50 font-mono font-bold mr-2 group-hover:text-primary transition-colors">&gt;</span>
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 font-mono lowercase ${
                      project.isPrivate
                        ? "bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-help"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
