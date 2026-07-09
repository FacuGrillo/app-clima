import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the weather app heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /app de clima/i })).toBeInTheDocument();
});
