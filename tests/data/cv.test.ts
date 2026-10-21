import { describe, it, expect } from 'vitest';
import { generateCvMarkdown, cvData, CvData } from '@/data/cv';

describe('generateCvMarkdown', () => {
  it('uses default cvData when no argument is provided', () => {
    const result = generateCvMarkdown();

    expect(result).toContain(`# ${cvData.personal.name}`);
    expect(result).toContain(`**${cvData.personal.currentRole}** | ${cvData.personal.location}`);
    expect(result).toContain(`Email: [${cvData.personal.email}](mailto:${cvData.personal.email}) | Phone: ${cvData.personal.phone}`);
    expect(result).toContain(`Domain: ${cvData.personal.domain} | Status: ${cvData.personal.status}`);
    expect(result).toContain('## Summary');
    expect(result).toContain(cvData.personal.summary);
    expect(result).toContain('## Professional Experience');
    expect(result).toContain('## Academic Foundations');
    expect(result).toContain('## Competency Stack');
    expect(result).toContain(`*Generated from Portfolio Single Source of Truth • ${new Date().getFullYear()}*`);
  });

  it('formats custom data accurately into Markdown structure', () => {
    const customCvData: CvData = {
      personal: {
        name: 'Jane Doe',
        location: 'Berlin, Germany',
        phone: '+49 123 456789',
        email: 'jane.doe@example.com',
        currentRole: 'Principal Architect',
        domain: 'Cloud Infrastructure',
        status: 'Available',
        summary: 'Experienced cloud architect specializing in distributed systems.',
      },
      experience: [
        {
          title: 'Staff Engineer',
          company: 'Tech Corp',
          location: 'Berlin',
          startDate: '2022-01',
          endDate: null,
          period: 'JANUARY 2022 — PRESENT',
          description: 'Leading platform engineering initiative.',
          bullets: [
            {
              title: 'Kubernetes Migration',
              text: 'Migrated legacy monolith to Kubernetes clusters.',
            },
            {
              text: 'Reduced latency by 40% through async event processing.',
            },
          ],
          tags: ['Kubernetes', 'Go', 'Kafka'],
        },
      ],
      education: [
        {
          degree: 'Master of Science',
          field: 'Computer Science',
          institution: 'Technical University of Berlin',
          period: '2019 — 2021',
          specializationLabel: 'Major',
          specializationText: 'Distributed Systems',
        },
      ],
      skills: [
        {
          category: 'LANGUAGES & RUNTIMES',
          items: ['Go', 'TypeScript', 'Rust'],
        },
      ],
      languageStats: [],
    };

    const result = generateCvMarkdown(customCvData);

    const expectedMarkdown = [
      '# Jane Doe',
      '**Principal Architect** | Berlin, Germany',
      'Email: [jane.doe@example.com](mailto:jane.doe@example.com) | Phone: +49 123 456789',
      'Domain: Cloud Infrastructure | Status: Available',
      '',
      '## Summary',
      'Experienced cloud architect specializing in distributed systems.',
      '',
      '## Professional Experience',
      '',
      '### Staff Engineer — Tech Corp, Berlin',
      '*JANUARY 2022 — PRESENT*',
      '',
      'Leading platform engineering initiative.',
      '- **Kubernetes Migration:** Migrated legacy monolith to Kubernetes clusters.',
      '- Reduced latency by 40% through async event processing.',
      '- **Technologies:** Kubernetes, Go, Kafka',
      '',
      '## Academic Foundations',
      '',
      '### Master of Science — Computer Science',
      '*Technical University of Berlin | 2019 — 2021*',
      '- **Major:** Distributed Systems',
      '',
      '## Competency Stack',
      '- **LANGUAGES & RUNTIMES:** Go, TypeScript, Rust',
      '',
      '---',
      `*Generated from Portfolio Single Source of Truth • ${new Date().getFullYear()}*`,
    ].join('\n');

    expect(result).toBe(expectedMarkdown);
  });

  it('handles optional fields and empty lists cleanly', () => {
    const minimalData: CvData = {
      personal: {
        name: 'Alex Smith',
        location: 'Remote',
        phone: '123-456-7890',
        email: 'alex@example.com',
        currentRole: 'Software Developer',
        domain: 'Frontend',
        status: 'Open to Work',
        summary: 'Passionate developer.',
      },
      experience: [
        {
          title: 'Frontend Developer',
          company: 'Startup Inc',
          location: 'Remote',
          startDate: '2023-01',
          endDate: '2023-12',
          period: '2023',
          description: 'Built React web applications.',
          tags: ['React', 'CSS'],
          // bullets omitted
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science',
          field: 'Software Engineering',
          institution: 'State University',
          period: '2018 — 2022',
          // specializationLabel and specializationText omitted
        },
      ],
      skills: [],
      languageStats: [],
    };

    const result = generateCvMarkdown(minimalData);

    expect(result).toContain('### Frontend Developer — Startup Inc, Remote');
    expect(result).toContain('- **Technologies:** React, CSS');
    expect(result).not.toContain('- **Title:**');
    expect(result).toContain('### Bachelor of Science — Software Engineering');
    expect(result).toContain('*State University | 2018 — 2022*');
    expect(result).not.toContain('specialization');
    expect(result).toContain('## Competency Stack');
  });
});
