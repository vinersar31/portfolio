import * as React from "react"

export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    let ticking = false
    let rafId: number
    let currentScrolled = false

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > threshold
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

    // Check initial state
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [threshold])

  return scrolled
}
