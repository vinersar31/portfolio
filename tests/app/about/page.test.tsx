import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '@/app/about/page';

describe('About Page', () => {
  it('renders the main greeting header', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: /\/ hi there 👋/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the skills & tech section', () => {
    render(<About />);
    const skillsHeading = screen.getByRole('heading', { name: /\/ skills & tech/i });
    expect(skillsHeading).toBeInTheDocument();

    expect(screen.getByText(/c\+\+, python, rust/i)).toBeInTheDocument();
    expect(screen.getByText(/ai, llms, rag/i)).toBeInTheDocument();
    expect(screen.getByText(/react, next\.js/i)).toBeInTheDocument();
    expect(screen.getByText(/docker, kubernetes, aws/i)).toBeInTheDocument();
  });

  it('renders the things i enjoy section', () => {
    render(<About />);
    const enjoyHeading = screen.getByRole('heading', { name: /\/ things i enjoy/i });
    expect(enjoyHeading).toBeInTheDocument();

    expect(screen.getByText(/building useful tools/i)).toBeInTheDocument();
    expect(screen.getByText(/gaming & unwinding with friends/i)).toBeInTheDocument();
    expect(screen.getByText(/exploring finance, stocks & economics/i)).toBeInTheDocument();
  });
});
