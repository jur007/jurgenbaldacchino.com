import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section from './section.tsx';

describe('Section', () => {
  it('renders semantic section content with title and intro', () => {
    render(
      <Section title="Craft" intro="Careful systems for modern teams.">
        <p>Every detail is deliberate.</p>
      </Section>,
    );

    expect(screen.getByRole('heading', { name: /craft/i })).toBeInTheDocument();
    expect(screen.getByText(/careful systems for modern teams/i)).toBeInTheDocument();
    expect(screen.getByText(/every detail is deliberate/i)).toBeInTheDocument();
  });
});
