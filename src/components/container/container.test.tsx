import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Container from './container';

describe('Container', () => {
  it('renders its children in the requested element', () => {
    render(
      <Container as="section">
        <h2>Editorial content</h2>
      </Container>,
    );

    const section = screen.getByText(/editorial content/i).closest('section');

    expect(screen.getByRole('heading', { name: /editorial content/i })).toBeInTheDocument();
    expect(section).toBeInTheDocument();
  });
});
