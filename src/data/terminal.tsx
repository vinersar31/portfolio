import React from "react";

// Define the "file system" content
export const files: Record<string, React.ReactNode> = {
  "about.txt": (
    <div className="space-y-2">
      <p>
        i&apos;m a software developer with a strong background in{" "}
        <strong className="text-foreground">C++</strong> and{" "}
        <strong className="text-foreground">ADAS systems</strong>.
      </p>
      <p>focused on building reliable and performance-critical applications.</p>
      <p>
        deeply passionate about{" "}
        <strong className="text-foreground">artificial intelligence</strong>,{" "}
        <strong className="text-foreground">machine learning</strong>, and{" "}
        <strong className="text-foreground">embedded systems</strong>.
      </p>
    </div>
  ),
  "projects.txt": (
    <div className="space-y-2">
      <p>
        i have worked on several personal and academic projects. to see them
        all, please visit the projects page.
      </p>
      <p>
        type <span className="text-primary font-bold">cd projects</span> to view
        them or check out my github{" "}
        <span className="text-primary font-bold">cat links.txt</span>.
      </p>
    </div>
  ),
  "cv.txt": (
    <div className="space-y-2">
      <p>
        to see a snapshot of my professional background in software development,
        including my experience, education, and skills.
      </p>
      <p>
        type <span className="text-primary font-bold">cd cv</span> to view and
        download my curriculum vitae.
      </p>
    </div>
  ),
  "links.txt": (
    <div className="space-y-2">
      <p>
        github:{" "}
        <a
          href="https://github.com/vinersar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          github.com/vinersar
        </a>
      </p>
      <p>
        linkedin:{" "}
        <a
          href="https://linkedin.com/in/vinersar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          linkedin.com/in/vinersar
        </a>
      </p>
      <p>
        email:{" "}
        <a
          href="mailto:vinersar31@example.com"
          className="text-blue-400 hover:underline"
        >
          vinersar31@example.com
        </a>
      </p>
    </div>
  ),
};

export const commandsHelp = (
  <div className="space-y-1">
    <p className="mb-2">Available commands:</p>
    <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-1">
      <span className="text-primary font-bold">ls</span>
      <span>list available files</span>
      <span className="text-primary font-bold">cat</span>
      <span>
        read a file (e.g., <span className="text-primary">cat about.txt</span>)
      </span>
      <span className="text-primary font-bold">help</span>
      <span>show this help message</span>
      <span className="text-primary font-bold">clear</span>
      <span>clear the terminal screen</span>
      <span className="text-primary font-bold">whoami</span>
      <span>display current user</span>
    </div>
  </div>
);
