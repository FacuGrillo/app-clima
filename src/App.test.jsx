import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('renders the weather app heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /app de clima/i })).toBeInTheDocument();
});

test('shows an error when the search is empty', async () => {
  render(<App />);

  await userEvent.click(screen.getByRole('button', { name: /buscar/i }));

  expect(await screen.findByText(/ingresa una ciudad/i)).toBeInTheDocument();
});
