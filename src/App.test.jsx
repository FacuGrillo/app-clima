import { act, render, screen } from '@testing-library/react';
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

test('toggles between dark and light theme', async () => {
  render(<App />);

  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: /oscuro/i }));
  });

  expect(screen.getByRole('button', { name: /claro/i })).toBeInTheDocument();
});

test('shows an error when the search is empty', async () => {
  render(<App />);

  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
  });

  expect(await screen.findByText(/ingresa una ciudad/i)).toBeInTheDocument();
});

test('allows adding a city to favorites', async () => {
  const mockWeather = {
    cod: 200,
    name: 'Buenos Aires',
    sys: { country: 'AR' },
    weather: [{ description: 'cielo claro', icon: '01d' }],
    main: { temp: 18, feels_like: 19, humidity: 60, pressure: 1012 },
    wind: { speed: 3 },
    visibility: 10000,
  };
  const mockForecast = {
    cod: '200',
    list: [
      { dt_txt: '2026-07-09 12:00:00', main: { temp: 19 }, weather: [{ description: 'cielo claro', icon: '01d' }] },
      { dt_txt: '2026-07-10 12:00:00', main: { temp: 20 }, weather: [{ description: 'poco nublado', icon: '02d' }] },
      { dt_txt: '2026-07-11 12:00:00', main: { temp: 21 }, weather: [{ description: 'lluvioso', icon: '10d' }] },
    ],
  };

  vi.mocked(global.fetch).mockImplementation((url) => {
    if (typeof url === 'string' && url.includes('geo')) {
      return Promise.resolve({ ok: true, json: async () => [] });
    }

    if (typeof url === 'string' && url.includes('/forecast')) {
      return Promise.resolve({ ok: true, json: async () => mockForecast });
    }

    return Promise.resolve({ ok: true, json: async () => mockWeather });
  });

  render(<App />);

  await act(async () => {
    await userEvent.type(screen.getByPlaceholderText(/ingresa ciudad/i), 'Buenos Aires');
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
  });

  await act(async () => {
    await userEvent.click(await screen.findByRole('button', { name: /agregar a favoritos/i }));
  });

  expect(await screen.findByRole('button', { name: /buenos aires, ar/i })).toBeInTheDocument();
});

test('shows a forecast section after a successful search', async () => {
  const mockWeather = {
    cod: 200,
    name: 'Buenos Aires',
    sys: { country: 'AR' },
    weather: [{ description: 'cielo claro', icon: '01d' }],
    main: { temp: 18, feels_like: 19, humidity: 60, pressure: 1012 },
    wind: { speed: 3 },
    visibility: 10000,
  };
  const mockForecast = {
    cod: '200',
    list: [
      { dt_txt: '2026-07-09 12:00:00', main: { temp: 19 }, weather: [{ description: 'cielo claro', icon: '01d' }] },
      { dt_txt: '2026-07-10 12:00:00', main: { temp: 20 }, weather: [{ description: 'poco nublado', icon: '02d' }] },
      { dt_txt: '2026-07-11 12:00:00', main: { temp: 21 }, weather: [{ description: 'lluvioso', icon: '10d' }] },
    ],
  };

  vi.mocked(global.fetch).mockImplementation((url) => {
    if (typeof url === 'string' && url.includes('geo')) {
      return Promise.resolve({ ok: true, json: async () => [] });
    }

    if (typeof url === 'string' && url.includes('/forecast')) {
      return Promise.resolve({ ok: true, json: async () => mockForecast });
    }

    return Promise.resolve({ ok: true, json: async () => mockWeather });
  });

  render(<App />);

  await act(async () => {
    await userEvent.type(screen.getByPlaceholderText(/ingresa ciudad/i), 'Buenos Aires');
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
  });

  expect(await screen.findByText(/pronóstico de los próximos días/i)).toBeInTheDocument();
});
