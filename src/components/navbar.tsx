"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const navItems = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "projects", href: "/projects" },
  { name: "cv", href: "/cv" },
]


function NavLink({ href, name, pathname, className = "" }: { href: string; name: string; pathname: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`${className} transition-colors hover:text-foreground/80 flex items-center ${
        pathname === href ? "text-foreground font-semibold" : "text-foreground/60"
      }`.trim()}
    >
      <span className="text-red-500 mr-1">/</span>
      {name}
    </Link>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-mono">
      <div className="container mx-auto max-w-4xl px-4 flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-lg">vinersar <span className="text-red-500">/</span></span>
          </Link>
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} name={item.name} pathname={pathname} />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="md:hidden flex gap-4 mr-2">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} name={item.name} pathname={pathname} className="text-sm" />
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
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
