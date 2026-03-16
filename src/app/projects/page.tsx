import { ExternalLink, Lock } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "EU Compliance Engine",
      description: "An engine for processing and analyzing EU compliance data and regulations.",
      url: "https://github.com/vinersar31/EU-compliance-engine",
      isPrivate: false,
    },
    {
      title: "Trade Bot",
      description: "An automated trading bot for cryptocurrency or stock markets.",
      url: "https://github.com/vinersar31/trade_bot",
      isPrivate: true,
    },
    {
      title: "AI Playground",
      description: "A playground for experimenting with AI models and tools.",
      url: "https://github.com/vinersar31/ai_playground",
      isPrivate: false,
    },
    {
      title: "ESP32 Playground",
      description: "A playground for experimenting with the ESP32 microcontroller and learning how to control electronics like LEDs, sensors, and more.",
      url: "https://github.com/vinersar31/esp32_playground",
      isPrivate: false,
    },
    {
      title: "Ecommerce Mobile App",
      badge: "Bachelor's Degree",
      description: "Created an ecommerce mobile app for my bachelor's degree where users could trade games. Built using Xamarin Forms and C#.",
      url: "https://github.com/vinersar31/Licenta-Ecommerce",
      isPrivate: true,
    },
    {
      title: "PulseBoard: Jira & Project Metrics",
      badge: "Master's Degree",
      description: "Developed as part of my master's degree in Project Management. This project collects and visualizes Agile-related data from Jira, Confluence, Excel, and manual entries. Insights are shown in Grafana dashboards powered by Prometheus for time-series analytics.",
      url: "https://github.com/vinersar31/pulse_board",
      isPrivate: true,
    },
    {
      title: "MCP Servers",
      description: "A collection of Model Context Protocol (MCP) servers for AI model serving, experimentation, and integration.",
      url: "https://github.com/vinersar31/mcp_servers",
      isPrivate: false,
    },
    {
      title: "Spec Driven AI Agents",
      description: "Trying out this new methodology of working with AI Agents, focusing on specification-driven development and experimentation.",
      url: "https://github.com/vinersar31/spec_driven_ai_agents",
      isPrivate: false,
    },
    {
      title: "Istaris",
      description: "AI-powered digital employees that work 24/7 to automate your entire workflow.",
      url: "https://github.com/vinersar31/istaris",
      isPrivate: false,
    },
  ];

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
                  <span className="text-red-500">/</span> {project.title.toLowerCase()}
                </h3>
                {project.badge && (
                  <span className="shrink-0 text-[10px] md:text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full lowercase font-mono">
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {project.description.toLowerCase()}
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
