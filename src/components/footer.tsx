import * as React from "react"
import { Github, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-mono mt-auto py-6 text-sm">
      <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-foreground/60 flex items-center">
          <span className="text-red-500 mr-2">©</span>
          <span>{currentYear} vinersar dan-ioan</span>
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/vinersar31"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>github</span>
          </a>
          <a
            href="https://www.linkedin.com/in/dan-ioan-v-6b1220218/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>linkedin</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
