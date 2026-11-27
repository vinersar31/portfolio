import { SOCIAL_LINKS } from "@/data/home"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-auto">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 border-t border-border px-4 py-8 font-mono text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          <span className="text-primary">©</span> {currentYear} dan-ioan vinersar
        </span>
        <span className="flex flex-wrap gap-x-2">
          {SOCIAL_LINKS.filter((l) => l.external).map((link, i) => (
            <span key={link.label}>
              {i > 0 && <span className="mr-2 text-border" aria-hidden="true">/</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </span>
      </div>
    </footer>
  )
}
