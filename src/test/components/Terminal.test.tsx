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
    } as unknown as ReturnType<typeof useRouter>)

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
  it('prevents prototype pollution crash on cat toString', () => {
    render(<Terminal />)

    // Switch to interactive mode
    const container = screen.getByText(/Welcome to vinersarOS/i).parentElement?.parentElement?.parentElement
    act(() => {
      if (container) fireEvent.click(container)
    })

    // Find the input element and type the command
    const input = screen.getByRole('textbox')
    act(() => {
      fireEvent.change(input, { target: { value: 'cat toString' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    })

    // The command should successfully run and output the "No such file" error rather than crashing React
    expect(screen.getByText('cat: toString: No such file or directory')).toBeInTheDocument()
  })

  it('ignores empty commands', () => {
    render(<Terminal />)

    const container = screen.getByText(/Welcome to vinersarOS/i).parentElement?.parentElement?.parentElement
    act(() => {
      if (container) fireEvent.click(container)
    })

    const input = screen.getByRole('textbox')
    act(() => {
      fireEvent.change(input, { target: { value: '   ' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    })

    // Check that we didn't add any new history item by checking if "command not found" is not displayed
    // A command with no characters shouldn't be matched or cause errors
    expect(screen.queryByText(/: command not found/)).not.toBeInTheDocument()
  })

  it('displays command not found for unknown commands', () => {
    render(<Terminal />)

    const container = screen.getByText(/Welcome to vinersarOS/i).parentElement?.parentElement?.parentElement
    act(() => {
      if (container) fireEvent.click(container)
    })

    const input = screen.getByRole('textbox')
    act(() => {
      fireEvent.change(input, { target: { value: 'unknowncommand' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    })

    expect(screen.getByText('unknowncommand: command not found')).toBeInTheDocument()
  })
})
