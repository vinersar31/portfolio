import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CV from '@/app/cv/page';
import { cvData, generateCvMarkdown } from '@/data/cv';

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
    expect(link.getAttribute('href')).toMatch(/cv\.pdf$/);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('renders the professional trajectory section with career entries', () => {
    render(<CV />);
    expect(screen.getByRole('heading', { name: /professional trajectory/i })).toBeInTheDocument();
    expect(screen.getByText(/aumovio, sibiu/i)).toBeInTheDocument();
    expect(screen.getByText(/continental, sibiu/i)).toBeInTheDocument();
    expect(screen.getByText(/ausy technologies, sibiu/i)).toBeInTheDocument();
  });

  it('renders academic foundations with degree details', () => {
    render(<CV />);
    expect(screen.getByRole('heading', { name: /academic foundations/i })).toBeInTheDocument();
    expect(screen.getByText(/project management/i)).toBeInTheDocument();
    expect(screen.getByText(/computer science and computer engineering/i)).toBeInTheDocument();
  });

  it('renders quick-strip metrics ribbon and competency stack', () => {
    render(<CV />);
    expect(screen.getByText(/current role/i)).toBeInTheDocument();
    expect(screen.getByText(/senior swe @ aumovio/i)).toBeInTheDocument();
    expect(screen.getByText(/active at aumovio/i)).toBeInTheDocument();
    expect(screen.getByText(/competency stack/i)).toBeInTheDocument();
    expect(screen.getByText(/c\+\+20/i)).toBeInTheDocument();
    expect(screen.getByText(/most used languages/i)).toBeInTheDocument();
  });

  it('generateCvMarkdown compiles complete markdown from data', () => {
    const markdown = generateCvMarkdown(cvData);
    expect(markdown).toContain('# Vinersar Dan-Ioan');
    expect(markdown).toContain('Senior Software Engineer @ Aumovio');
    expect(markdown).toContain('### Senior Software Engineer — Continental, Sibiu');
    expect(markdown).toContain('### Master\'s Degree — Project Management');
    expect(markdown).toContain('## Competency Stack');
  });

  it('copies markdown to clipboard when Copy Markdown button is clicked', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CV />);
    const copyButton = screen.getByRole('button', { name: /copy markdown/i });
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledTimes(1);
    expect(writeTextMock.mock.calls[0][0]).toContain('# Vinersar Dan-Ioan');
    expect(await screen.findByText(/copied to clipboard!/i)).toBeInTheDocument();
  });
});
