export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  currentRole: string;
  domain: string;
  status: string;
  summary: string;
}

export interface BulletPoint {
  title?: string;
  text: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  period: string;
  description: string;
  bullets?: BulletPoint[];
  tags: string[];
  active?: boolean;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  specializationLabel: string;
  specializationText: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface CvData {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  languageStats: LanguageStat[];
}

export const cvData: CvData = {
  personal: {
    name: "Vinersar Dan-Ioan",
    location: "Sibiu, Romania (SB 550316)",
    phone: "(+40) 756705851",
    email: "danvinersar98@gmail.com",
    currentRole: "Senior Software Engineer @ Aumovio",
    domain: "ADAS & Simulation",
    status: "Active at Aumovio",
    summary:
      "here you'll find a snapshot of my professional background in software development. Senior Software Engineer at Aumovio specializing in ADAS simulation frameworks, modern C++ (C++17), embedded C, TDD, and real-time architectures.",
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Aumovio",
      location: "Sibiu",
      startDate: "2025-09",
      endDate: null,
      period: "SEPTEMBER 2025 — PRESENT",
      active: true,
      description:
        "Developing a real-time data acquisition framework deployed on an ARM development board (Radxa Zero 3W), engineered to maintain strict real-time constraints for in-car automotive usage and deterministic systems architecture.",
      tags: ["C++", "ARM (Radxa Zero 3W)", "Real-Time / In-Car", "Data Acquisition"],
    },
    {
      title: "Senior Software Engineer",
      company: "Continental",
      location: "Sibiu",
      startDate: "2022-09",
      endDate: "2025-09",
      period: "SEPTEMBER 2022 — SEPTEMBER 2025",
      description:
        "Developed simulation framework for Advanced Driver Assistance Systems (ADAS). Joined a team developing a new framework, using C++ (backend) and JavaScript (frontend).",
      bullets: [
        {
          title: "Modern C++ (C++17)",
          text: "Demonstrated proficiency in modern C++ (C++17 standard), leveraging its capabilities to ensure simplicity, safety, and performance in the project.",
        },
        {
          title: "Test Driven Development (TDD)",
          text: "Spearheaded TDD approach within development workflow, ensuring robustness and reliability of codebase.",
        },
        {
          title: "Design Patterns & Scalability",
          text: "Implemented and enforced various Design Patterns to enhance maintainability and scalability of software solutions.",
        },
        {
          title: "Agile Collaboration",
          text: "Collaborated with cross-functional teams using Agile methodologies, fostering continuous improvement and adaptability.",
        },
        {
          title: "Tooling Ecosystem",
          text: "Utilized Visual Studio, VS Code, CMake, Google Test, GitHub, Jira, AI tools, WSL and others.",
        },
      ],
      tags: [
        "C++17",
        "ADAS Simulation",
        "JavaScript",
        "CMake",
        "Google Test",
        "TDD",
        "WSL",
      ],
    },
    {
      title: "Junior Software Engineer",
      company: "Ausy Technologies",
      location: "Sibiu",
      startDate: "2020-12",
      endDate: "2021-06",
      period: "DECEMBER 2020 — JUNE 2021",
      description:
        "Developed Bluetooth detection application with ESP32 series Espressif board. Used C, Eclipse IDE, and Espressif extension. Managed version control via GitLab on Debian OS.",
      tags: ["Embedded C", "ESP32", "Bluetooth", "GitLab", "Debian OS"],
    },
  ],
  education: [
    {
      degree: "Master's Degree",
      field: "Project Management",
      institution: "Faculty of Engineering, Sibiu",
      period: "OCTOBER 2023 — JULY 2025",
      specializationLabel: "SPECIALIZATION",
      specializationText:
        "Advanced project lifecycle planning, agile engineering workflows, and resource optimization.",
    },
    {
      degree: "Bachelor's Degree",
      field: "Computer Science and Computer Engineering",
      institution: "Faculty of Engineering, Sibiu",
      period: "OCTOBER 2017 — JULY 2021",
      specializationLabel: "CORE CURRICULUM",
      specializationText:
        "Embedded systems, computer architecture, algorithms, operating systems, and real-time programming.",
    },
  ],
  skills: [
    {
      category: "LANGUAGES & DIALECTS",
      items: ["C++20", "Python 3.12", "Rust", "C#", "SQL", "Bash / Zsh"],
    },
    {
      category: "AUTONOMOUS & SYSTEMS",
      items: ["ROS2", "OpenCV", "PCL (Point Cloud)", "PyTorch", "CUDA Toolkit", "Eigen3"],
    },
    {
      category: "INFRA & TELEMETRY",
      items: ["Docker", "Kubernetes", "Prometheus", "Grafana", "Linux Kernel / eBPF", "CI/CD Pipelines"],
    },
  ],
  languageStats: [
    { name: "C++", percentage: 32, color: "#ff5167" },
    { name: "Jupyter Notebook", percentage: 22, color: "#f97316" },
    { name: "HTML", percentage: 11, color: "#ea580c" },
    { name: "TypeScript", percentage: 11, color: "#3b82f6" },
    { name: "JavaScript", percentage: 10, color: "#facc15" },
    { name: "Python", percentage: 7, color: "#38bdf8" },
    { name: "CSS", percentage: 4, color: "#a855f7" },
    { name: "CMake", percentage: 3, color: "#ef4444" },
  ],
};

/**
 * Generates a clean, portable GitHub-flavored Markdown version of the CV.
 * Useful for clipboard copying, text export, LLM context, or README inclusion.
 */
export function generateCvMarkdown(data: CvData = cvData): string {
  const { personal, experience, education, skills } = data;

  const lines: string[] = [
    `# ${personal.name}`,
    `**${personal.currentRole}** | ${personal.location}`,
    `Email: [${personal.email}](mailto:${personal.email}) | Phone: ${personal.phone}`,
    `Domain: ${personal.domain} | Status: ${personal.status}`,
    "",
    "## Summary",
    personal.summary,
    "",
    "## Professional Experience",
  ];

  experience.forEach((exp) => {
    lines.push("");
    lines.push(`### ${exp.title} — ${exp.company}, ${exp.location}`);
    lines.push(`*${exp.period}*`);
    lines.push("");
    lines.push(exp.description);

    if (exp.bullets && exp.bullets.length > 0) {
      exp.bullets.forEach((b) => {
        if (b.title) {
          lines.push(`- **${b.title}:** ${b.text}`);
        } else {
          lines.push(`- ${b.text}`);
        }
      });
    }

    lines.push(`- **Technologies:** ${exp.tags.join(", ")}`);
  });

  lines.push("");
  lines.push("## Academic Foundations");

  education.forEach((edu) => {
    lines.push("");
    lines.push(`### ${edu.degree} — ${edu.field}`);
    lines.push(`*${edu.institution} | ${edu.period}*`);
    lines.push(`- **${edu.specializationLabel}:** ${edu.specializationText}`);
  });

  lines.push("");
  lines.push("## Competency Stack");

  skills.forEach((cat) => {
    lines.push(`- **${cat.category}:** ${cat.items.join(", ")}`);
  });

  lines.push("");
  lines.push("---");
  lines.push(`*Generated from Portfolio Single Source of Truth • ${new Date().getFullYear()}*`);

  return lines.join("\n");
}
