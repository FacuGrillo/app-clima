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
    coord: { lat: -34.6037, lon: -58.3816 },
    weather: [{ description: 'cielo claro', icon: '01d' }],
    main: { temp: 18, feels_like: 19, humidity: 60, pressure: 1012 },
    wind: { speed: 3 },
    visibility: 10000,
  };
  const mockForecast = {
    cod: '200',
    list: [
      { dt: 1688913600, main: { temp: 19, temp_max: 21, temp_min: 18 }, weather: [{ description: 'cielo claro', icon: '01d' }] },
      { dt: 1689000000, main: { temp: 20, temp_max: 22, temp_min: 19 }, weather: [{ description: 'poco nublado', icon: '02d' }] },
      { dt: 1689086400, main: { temp: 21, temp_max: 23, temp_min: 20 }, weather: [{ description: 'lluvioso', icon: '10d' }] },
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

  const favoriteButtons = screen.getAllByRole('button', { name: /^Buenos Aires$/i });
  expect(favoriteButtons.length).toBeGreaterThan(0);
  expect(favoriteButtons[0].closest('.chip')).not.toBeNull();
});

test('shows a forecast section after a successful search', async () => {
  const mockWeather = {
    cod: 200,
    name: 'Buenos Aires',
    sys: { country: 'AR' },
    coord: { lat: -34.6037, lon: -58.3816 },
    weather: [{ description: 'cielo claro', icon: '01d' }],
    main: { temp: 18, feels_like: 19, humidity: 60, pressure: 1012 },
    wind: { speed: 3 },
    visibility: 10000,
  };
  const mockForecast = {
    cod: '200',
    list: [
      { dt: 1688913600, main: { temp: 19, temp_max: 21, temp_min: 18 }, weather: [{ description: 'cielo claro', icon: '01d' }] },
      { dt: 1689000000, main: { temp: 20, temp_max: 22, temp_min: 19 }, weather: [{ description: 'poco nublado', icon: '02d' }] },
      { dt: 1689086400, main: { temp: 21, temp_max: 23, temp_min: 20 }, weather: [{ description: 'lluvioso', icon: '10d' }] },
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
