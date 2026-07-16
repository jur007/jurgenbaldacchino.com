import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the design system introduction', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /luxury software consultancy/i }),
    ).toBeInTheDocument();
  });
});
