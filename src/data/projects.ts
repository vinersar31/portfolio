export type ProjectCategory = "vision" | "infra" | "academic";

export interface Project {
  title: string;
  pinned?: boolean;
  badge?: string;
  description: string;
  url: string;
  isPrivate: boolean;
  siteUrl?: string;
  category: ProjectCategory;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "collision vision",
    pinned: true,
    badge: "yolov8-seg • computer vision",
    description: "instance segmentation of post-accident car damage using custom-trained yolov8-seg architecture, achieving 94.2% mAP for automated insurance claim assessment and parametric damage heatmaps.",
    url: "https://github.com/vinersar31/collision_vision",
    isPrivate: false,
    category: "vision",
    tags: ["C++", "Python", "YOLOv8", "PyTorch", "OpenCV"],
  },
  {
    title: "pulseboard: jira & project metrics",
    badge: "Master's Degree",
    description: "developed as part of my master's degree in project management. this project collects and visualizes agile-related data from jira, confluence, excel, and manual entries. insights are shown in grafana dashboards powered by prometheus for time-series analytics.",
    url: "https://github.com/vinersar31/pulse_board",
    isPrivate: true,
    category: "academic",
    tags: ["Prometheus", "Grafana", "Go", "Docker", "REST API"],
  },
  {
    title: "ecommerce mobile app",
    badge: "Bachelor's Degree",
    description: "created an ecommerce mobile app for my bachelor's degree where users could trade games. built using xamarin forms and c#.",
    url: "https://github.com/vinersar31/Licenta-Ecommerce",
    isPrivate: true,
    category: "academic",
    tags: ["C#", "Xamarin Forms", "SQLite", ".NET"],
  },
  {
    title: "capital",
    badge: "personal-ops",
    description: "a wealth tracker sitting at the top of the financial stack with live portfolio intelligence.",
    url: "https://github.com/vinersar31/capital",
    isPrivate: false,
    siteUrl: "https://vinersar31.github.io/capital/",
    category: "infra",
    tags: ["Next.js", "Python", "PostgreSQL", "FastAPI"],
  },
  {
    title: "vault",
    badge: "personal-ops",
    description: "a document manager & archive with zero-knowledge metadata indexing.",
    url: "https://github.com/vinersar31/vault",
    isPrivate: false,
    category: "infra",
    tags: ["Rust", "AES-256", "S3", "gRPC"],
  },
  {
    title: "personal-ops",
    pinned: true,
    badge: "personal-ops",
    description: "infrastructure and operations repository with GitOps workflows, automated CI/CD pipelines, and container orchestration.",
    url: "https://github.com/vinersar31/personal-ops",
    isPrivate: false,
    category: "infra",
    tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    title: "codex",
    badge: "personal-ops",
    description: "developer's knowledge base for easily search and chat with llm with this as context.",
    url: "https://github.com/vinersar31/codex",
    isPrivate: false,
    category: "infra",
    tags: ["TypeScript", "Vector DB", "LLM", "RAG"],
  },
  {
    title: "sentinel",
    badge: "personal-ops",
    description: "tracks the uptime of my ecosystem with telemetry dashboards and health probes.",
    url: "https://github.com/vinersar31/sentinel",
    isPrivate: false,
    siteUrl: "https://vinersar31.github.io/sentinel/",
    category: "infra",
    tags: ["TypeScript", "Next.js", "Telemetry", "CI/CD"],
  },
  {
    title: "eu compliance engine",
    description: "an engine for processing and analyzing eu compliance data and regulations.",
    url: "https://github.com/vinersar31/EU-compliance-engine",
    isPrivate: false,
    category: "academic",
    tags: ["Python", "FastAPI", "Regulatory Engine", "JSON Schema"],
  },
  {
    title: "trade bot",
    description: "an automated trading bot for cryptocurrency or stock markets.",
    url: "https://github.com/vinersar31/trading_bot",
    isPrivate: false,
    siteUrl: "https://vinersar31.github.io/trading_bot/",
    category: "academic",
    tags: ["Python", "Algorithms", "WebSockets", "Backtesting"],
  },
  {
    title: "ai playground",
    description: "a playground for experimenting with ai models and tools.",
    url: "https://github.com/vinersar31/ai_playground",
    isPrivate: false,
    category: "vision",
    tags: ["Python", "PyTorch", "Transformers", "Diffusers"],
  },
  {
    title: "esp32 playground",
    description: "a playground for experimenting with the esp32 microcontroller and learning how to control electronics like leds, sensors, and more.",
    url: "https://github.com/vinersar31/esp32_playground",
    isPrivate: false,
    category: "infra",
    tags: ["C++", "FreeRTOS", "IoT", "Sensors"],
  },
  {
    title: "mcp",
    description: "a collection of model context protocol (mcp) servers for ai model serving, experimentation, and integration.",
    url: "https://github.com/vinersar31/mcp",
    isPrivate: false,
    category: "infra",
    tags: ["Model Context Protocol", "TypeScript", "AI Agents"],
  },
  {
    title: "spec driven ai agents",
    description: "trying out this new methodology of working with ai agents, focusing on specification-driven development and experimentation.",
    url: "https://github.com/vinersar31/spec_driven_ai_agents",
    isPrivate: false,
    category: "vision",
    tags: ["Agentic AI", "Prompt Engineering", "Evaluation"],
  },
  {
    title: "building with claude api",
    description: "simple jupyter notebooks for learning how to use the anthropic claude api with python.",
    url: "https://github.com/vinersar31/building_with_claude_API",
    isPrivate: false,
    category: "vision",
    tags: ["Python", "Claude API", "Jupyter", "Anthropic SDK"],
  },
  {
    title: "blueprints",
    description: "reusable, battle-tested patterns for shipping apps fast. each blueprint is a self-contained folder with documentation and copy-paste-ready templates distilled from real, shipped projects.",
    url: "https://github.com/vinersar31/blueprints",
    isPrivate: false,
    category: "infra",
    tags: ["Architecture", "Templates", "DevOps", "Best Practices"],
  },
  {
    title: "fastapi-gemma-stream",
    description: "a modern, teaching-grade fastapi service that streams a local ollama gemma model to clients over four different wire protocols — paired with a jupyter notebook that dissects exactly how async llm streaming works.",
    url: "https://github.com/vinersar31/fastapi-gemma-stream",
    isPrivate: false,
    category: "vision",
    tags: ["FastAPI", "Ollama Gemma", "Async Streaming", "Python"],
  },
];
