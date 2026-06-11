import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Terminal } from '../../components/Terminal'
import { useRouter } from 'next/navigation'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('Terminal', () => {
  const mockPush = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any)

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('initially renders in auto mode', () => {
    render(<Terminal />)
    expect(screen.queryByText(/Interactive mode activated/i)).not.toBeInTheDocument()
  })

  it('switches to interactive mode when clicked', () => {
    render(<Terminal />)

    // Click on the main terminal div (which has the onClick handler)
    const container = screen.getByText(/Welcome to vinersarOS/i).parentElement?.parentElement?.parentElement

    act(() => {
      if (container) fireEvent.click(container)
    })

    // Let's use getByText with a matcher function that handles elements with child spans correctly
    expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && content.includes('Interactive mode activated');
    })).toBeInTheDocument()
  })
})
