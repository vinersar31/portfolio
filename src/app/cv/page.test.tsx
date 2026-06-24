import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CV from './page';

describe('CV Page', () => {
  it('renders the CV page header', () => {
    render(<CV />);
    const heading = screen.getByRole('heading', { name: /\/ curriculum vitae/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<CV />);
    const text = screen.getByText(/here you'll find a snapshot of my professional background/i);
    expect(text).toBeInTheDocument();
  });

  it('renders the download link with correct attributes', () => {
    render(<CV />);
    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/cv.pdf');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
