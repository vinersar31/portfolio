import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './page'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

describe('Home Page', () => {
  it('renders the hello heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('hello')
  })

  it('renders the bio text', () => {
    render(<Home />)
    expect(screen.getByText(/software developer/i)).toBeInTheDocument()
    expect(screen.getByText(/artificial intelligence/i)).toBeInTheDocument()
  })

  it('renders the profile image', () => {
    render(<Home />)
    const image = screen.getByAltText('My photo')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/me.jpg')
  })
})
