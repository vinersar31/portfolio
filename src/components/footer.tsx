import * as React from "react"
import { Github, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-auto py-8">
      <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center justify-center gap-6">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>

        <div className="flex gap-6">
          <a
            href="https://github.com/vinersar31"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center h-10 w-10 rounded-full bg-secondary/50 border border-transparent hover:border-border hover:bg-secondary transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/dan-ioan-v-6b1220218/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center h-10 w-10 rounded-full bg-secondary/50 border border-transparent hover:border-border hover:bg-secondary transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-[#0A66C2] dark:group-hover:text-[#3888FF] transition-colors" />
          </a>
        </div>

        <div className="text-muted-foreground text-sm font-mono flex items-center">
          <span className="text-primary mr-2 opacity-80">©</span>
          <span className="tracking-tight">{currentYear} vinersar dan-ioan</span>
        </div>
      </div>
    </footer>
  )
}
