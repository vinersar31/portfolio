"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const navItems = [
  { name: "home", href: "/" },
  { name: "projects", href: "/projects" },
  { name: "cv", href: "/cv" },
  { name: "about", href: "/about" },
]

function NavLink({ href, name, pathname, className = "" }: { href: string; name: string; pathname: string; className?: string }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        ${className}
        transition-all duration-300 ease-in-out
        relative flex items-center px-3 py-1.5 rounded-full
        ${isActive
          ? "text-foreground font-medium bg-foreground/5 dark:bg-foreground/10"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
        }
      `.trim()}
    >
      {/* Subtle indicator dot for active state */}
      {isActive && (
        <span className="absolute left-1 h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5 hidden md:block animate-fade-in-up" style={{ animationDuration: '0.3s' }}></span>
      )}
      <span className={`md:ml-2 font-mono text-sm`}>
        {name}
      </span>
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    let ticking = false
    let rafId: number
    let currentScrolled = false

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20
          if (currentScrolled !== isScrolled) {
            setScrolled(isScrolled)
            currentScrolled = isScrolled
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full pt-4 pb-2 px-4 transition-all duration-300 flex justify-center">
      <div
        className={`
          flex h-14 items-center justify-between w-full max-w-3xl px-4 md:px-6 rounded-full transition-all duration-500
          ${scrolled
            ? "bg-background/70 backdrop-blur-lg border border-border shadow-lg shadow-black/5 dark:shadow-white/5"
            : "bg-transparent border border-transparent"
          }
        `}
      >
        <div className="flex gap-6 md:gap-8 items-center">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-foreground text-background mr-3 transition-transform group-hover:scale-105 group-hover:rotate-3">
              <span className="font-mono font-bold text-lg leading-none mt-0.5">v</span>
            </div>
            <span className="hidden sm:inline-block font-sans font-semibold text-lg tracking-tight">
              vinersar<span className="text-red-500 font-mono ml-1 animate-pulse">_</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="flex gap-1">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} name={item.name} pathname={pathname} />
            ))}
          </div>

          <div className="h-6 w-px bg-border mx-2"></div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/5 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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
