import { projects } from "@/data/projects";
import { ExternalLink, Lock } from "lucide-react";

export default function Projects() {


  return (
    <section className="py-12 md:py-24 max-w-5xl mx-auto space-y-12 font-light">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-mono lowercase">
        <span className="text-red-500">/</span> projects <span className="text-2xl">🚀</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.url}
            className="group relative flex flex-col justify-between p-6 bg-card border border-border rounded-xl transition-all hover:shadow-lg dark:hover:border-red-500/50"
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight group-hover:text-red-500 transition-colors font-mono lowercase">
                  <span className="text-red-500">/</span> {project.title}
                </h3>
                {project.badge && (
                  <span className="shrink-0 text-[10px] md:text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full lowercase font-mono">
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium w-fit px-4 py-2 rounded-md transition-colors font-mono lowercase ${
                project.isPrivate
                  ? "bg-destructive/10 text-destructive hover:bg-destructive/20 cursor-help"
                  : "bg-red-500 text-white hover:bg-red-600"
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
          </article>
        ))}
      </div>
    </section>
  );
}
