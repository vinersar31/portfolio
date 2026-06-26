import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Navbar } from '@/components/navbar'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('Navbar', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePathname).mockReturnValue('/')
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    } as unknown as ReturnType<typeof useTheme>)
  })

  it('renders brand name correctly', () => {
    render(<Navbar />)
    expect(screen.getByText('vinersar')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    // Link names are like "/home", "/about", not "/ home"
    expect(screen.getAllByRole('link', { name: /home/i })).toHaveLength(1) // Desktop + Mobile
    expect(screen.getAllByRole('link', { name: /about/i })).toHaveLength(1)
    expect(screen.getAllByRole('link', { name: /projects/i })).toHaveLength(1)
    expect(screen.getAllByRole('link', { name: /cv/i })).toHaveLength(1)
  })

  it('highlights the active link based on pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/about')
    render(<Navbar />)

    // Check desktop link has the active class
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    expect(aboutLinks[0]).toHaveClass('text-foreground font-medium')

    // Non-active link should not have it
    const homeLinks = screen.getAllByRole('link', { name: /home/i })
    expect(homeLinks[0]).not.toHaveClass('text-foreground font-semibold')
  })

  it('toggles theme when button is clicked', () => {
    render(<Navbar />)

    const toggleButton = screen.getByLabelText('Toggle theme')
    fireEvent.click(toggleButton)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })
})
