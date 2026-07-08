import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '@/components/theme-provider'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children, attribute, defaultTheme, enableSystem, ...props }: Record<string, unknown> & { children: React.ReactNode }) => (
    <div
      data-testid="next-themes-provider"
      data-attribute={attribute}
      data-default-theme={defaultTheme}
      data-enable-system={enableSystem}
      {...props}
    >
      {children}
    </div>
  ),
}))

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child-element')).toBeInTheDocument()
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('passes props to NextThemesProvider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Child</div>
      </ThemeProvider>
    )

    const provider = screen.getByTestId('next-themes-provider')
    expect(provider).toHaveAttribute('data-attribute', 'class')
    expect(provider).toHaveAttribute('data-default-theme', 'dark')
  })
})
