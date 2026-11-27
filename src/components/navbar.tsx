"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useScroll } from "@/hooks/use-scroll"

const navItems = [
  { name: "home", href: "/" },
  { name: "projects", href: "/projects" },
  { name: "cv", href: "/cv" },
  { name: "about", href: "/about" },
]

function NavLink({ href, name, pathname }: { href: string; name: string; pathname: string }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`font-mono text-sm px-1.5 py-1 transition-colors ${
        isActive
          ? "text-foreground font-medium underline decoration-primary decoration-2 underline-offset-[6px]"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {name}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const scrolled = useScroll()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-mono text-[15px] font-medium tracking-tight" aria-label="dan-ioan vinersar">
          <span className="text-primary">/</span>dan
          <span className="sr-only"> vinersar</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} name={item.name} pathname={pathname} />
          ))}

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
