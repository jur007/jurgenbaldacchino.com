import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './button';

describe('Button', () => {
  it('renders a button element by default', () => {
    render(<Button>View work</Button>);

    expect(screen.getByRole('button', { name: /view work/i })).toBeInTheDocument();
  });

  it('renders an anchor element when requested', () => {
    render(
      <Button as="a" href="/work">
        Discover more
      </Button>,
    );

    const link = screen.getByRole('link', { name: /discover more/i });
    expect(link).toHaveAttribute('href', '/work');
  });
});
