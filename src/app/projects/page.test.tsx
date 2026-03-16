import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from './page';

describe('Projects Page', () => {
  it('renders the projects page header', () => {
    render(<Projects />);
    const heading = screen.getByRole('heading', { name: /\/ projects 🚀/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all projects with valid github URLs', async () => {
    render(<Projects />);

    // Find all links (view repository buttons)
    const links = screen.getAllByRole('link', { name: /view repository/i });

    // Ensure all links start with https://github.com/vinersar31/
    for (const link of links) {
      const href = link.getAttribute('href');
      expect(href).toMatch(/^https:\/\/github\.com\/vinersar31\/.+/);
    }
  });

  it('has the correct updated url for trade bot', () => {
    render(<Projects />);

    // Test specifically for trading_bot URL
    const links = screen.getAllByRole('link', { name: /view repository/i });
    const tradingBotLink = links.find(l => l.getAttribute('href') === 'https://github.com/vinersar31/trading_bot');
    expect(tradingBotLink).toBeDefined();
  });

  it('has the correct updated url for mcp', () => {
    render(<Projects />);

    // Test specifically for mcp URL
    const links = screen.getAllByRole('link', { name: /view repository/i });
    const mcpLink = links.find(l => l.getAttribute('href') === 'https://github.com/vinersar31/mcp');
    expect(mcpLink).toBeDefined();
  });
});
