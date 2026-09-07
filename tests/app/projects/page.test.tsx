import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from '@/app/projects/page';

describe('Projects Page', () => {
  it('renders the projects page header without rocket emoji', () => {
    render(<Projects />);
    const heading = screen.getByRole('heading', { name: /\/ projects/i });
    expect(heading).toBeInTheDocument();
    expect(screen.queryByText('🚀')).not.toBeInTheDocument();
    expect(screen.queryByText(/gitops cluster/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/99\.98% uptime/i)).not.toBeInTheDocument();
  });

  it('renders all projects with valid github URLs', async () => {
    render(<Projects />);

    // Find all links (view repository buttons)
    const links = screen.getAllByRole('link', { name: /view repository/i });

    // Ensure all links start with https://github.com/vinersar31/
    const githubUrlRegex = /^https:\/\/github\.com\/vinersar31\/.+/;
    for (const link of links) {
      const href = link.getAttribute('href');
      expect(href).toMatch(githubUrlRegex);
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

  it('has the correct updated url for building_with_claude_API', () => {
    render(<Projects />);

    // Test specifically for building_with_claude_API URL
    const links = screen.getAllByRole('link', { name: /view repository/i });
    const claudeApiLink = links.find(l => l.getAttribute('href') === 'https://github.com/vinersar31/building_with_claude_API');
    expect(claudeApiLink).toBeDefined();
  });

  it('renders collision vision flagship card on top with telemetry specs', () => {
    render(<Projects />);

    // Flagship title
    const flagshipHeading = screen.getByRole('heading', { name: /collision vision/i });
    expect(flagshipHeading).toBeInTheDocument();

    // Telemetry and evaluation specs
    expect(screen.getByText(/inference stream: model evaluator/i)).toBeInTheDocument();
    expect(screen.getByText(/94\.2% mAP50/i)).toBeInTheDocument();
    expect(screen.getByText('62.4')).toBeInTheDocument();
    expect(screen.getByText('14.2ms')).toBeInTheDocument();
    expect(screen.getByText('3.2M')).toBeInTheDocument();
  });

  it('renders secondary featured placeholder for makemore LLM/NLP project', () => {
    render(<Projects />);

    expect(screen.getByRole('heading', { name: /makemore: llm & nlp from scratch/i })).toBeInTheDocument();
    expect(screen.getByText(/in development/i)).toBeInTheDocument();
    expect(screen.getByText(/loss convergence/i)).toBeInTheDocument();
  });

  it('filters projects interactively when category pills are clicked', () => {
    render(<Projects />);

    // Click Infrastructure category button
    const infraBtn = screen.getByRole('button', { name: /infrastructure/i });
    fireEvent.click(infraBtn);

    // Infrastructure projects should be present
    expect(screen.getByRole('heading', { name: /\/ personal-ops/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /\/ sentinel/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /\/ vault/i })).toBeInTheDocument();

    // Vision flagship and academic projects should not be displayed
    expect(screen.queryByRole('heading', { name: /collision vision/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /\/ pulseboard: jira & project metrics/i })).not.toBeInTheDocument();

    // Click Academic & Apps category button
    const academicBtn = screen.getByRole('button', { name: /academic & apps/i });
    fireEvent.click(academicBtn);

    // Academic projects should be present
    expect(screen.getByRole('heading', { name: /\/ pulseboard: jira & project metrics/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /\/ ecommerce mobile app/i })).toBeInTheDocument();

    // Infra projects should not be displayed
    expect(screen.queryByRole('heading', { name: /\/ personal-ops/i })).not.toBeInTheDocument();

    // Click All button to restore all
    const allBtn = screen.getByRole('button', { name: /^all/i });
    fireEvent.click(allBtn);

    expect(screen.getByRole('heading', { name: /collision vision/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /\/ personal-ops/i })).toBeInTheDocument();
  });

  it('omits terminal sandbox and terminal prompt from projects page', () => {
    render(<Projects />);

    expect(screen.queryByText(/terminal playground/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/cat collision-vision\.spec/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vinersar@system/i)).not.toBeInTheDocument();
  });
});
