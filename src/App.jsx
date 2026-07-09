import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "./config";

import "./styles/App.css";
import "./styles/dark-theme.css";

const FAVORITES_KEY = "clima-favoritos";
const HISTORY_KEY = "clima-historial";

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storage = window.localStorage;

  if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
    return null;
  }

  return storage;
};

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    try {
      const savedFavorites = JSON.parse(storage.getItem(FAVORITES_KEY) || "[]");
      const savedHistory = JSON.parse(storage.getItem(HISTORY_KEY) || "[]");
      setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
      setHistory(Array.isArray(savedHistory) ? savedHistory : []);
    } catch {
      setFavorites([]);
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const isFavorite = useMemo(() => {
    if (!weather) {
      return false;
    }

    const key = `${weather.name}-${weather.sys?.country}`.toLowerCase();
    return favorites.some((item) => item.key === key);
  }, [favorites, weather]);

  const addToHistory = (cityName) => {
    if (!cityName) {
      return;
    }

    setHistory((prev) => {
      const next = [cityName, ...prev.filter((item) => item !== cityName)].slice(0, 6);
      return next;
    });
  };

  const toggleFavorite = () => {
    if (!weather) {
      return;
    }

    const cityKey = `${weather.name}-${weather.sys?.country}`.toLowerCase();

    setFavorites((prev) => {
      const exists = prev.some((item) => item.key === cityKey);

      if (exists) {
        return prev.filter((item) => item.key !== cityKey);
      }

      return [...prev, { key: cityKey, name: weather.name, country: weather.sys?.country || "" }];
    });
  };

  const getWeather = async (location) => {
    const normalizedLocation =
      typeof location === "string" ? location.trim() : location;

    if (typeof normalizedLocation === "string" && normalizedLocation.length === 0) {
      setWeather(null);
      setError("Ingresa una ciudad para buscar.");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      let url;
      if (typeof normalizedLocation === "string") {
        url = `${WEATHER_URL}?q=${encodeURIComponent(normalizedLocation)}&appid=${API_KEY}&units=metric&lang=es`;
      } else {
        url = `${WEATHER_URL}?lat=${normalizedLocation.lat}&lon=${normalizedLocation.lon}&appid=${API_KEY}&units=metric&lang=es`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setForecast([]);

        const forecastUrl = `${FORECAST_URL}?q=${encodeURIComponent(
          typeof normalizedLocation === "string" ? normalizedLocation : data.name
        )}&appid=${API_KEY}&units=metric&lang=es`;

        const forecastRes = await fetch(forecastUrl);

        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          const nextDays = (forecastData.list || [])
            .filter((item, index) => index % 8 === 0)
            .slice(0, 5)
            .map((item) => ({
              date: item.dt_txt,
              temp: item.main?.temp,
              description: item.weather?.[0]?.description || "Sin datos",
              icon: item.weather?.[0]?.icon || "01d",
            }));

          setForecast(nextDays);
        }

        if (typeof normalizedLocation === "string") {
          addToHistory(data.name);
        } else if (data.name) {
          addToHistory(data.name);
        }
      } else {
        setWeather(null);
        setError(
          `No se encontró la ciudad "${
            typeof normalizedLocation === "string" ? normalizedLocation : ""
          }". Verifica el nombre o intenta otra vez.`
        );
      }
    } catch {
      setWeather(null);
      setError("Error al conectar con la API o no se pudo completar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="hero">
          <p className="eyebrow">Pronóstico en tiempo real</p>
          <h1>App de Clima</h1>
          <p className="hero-copy">
            Busca ciudades, guarda tus favoritas y consulta el clima actual con más detalles.
          </p>
        </header>

        <SearchBar onSearch={getWeather} isLoading={loading} />

        {loading && <div className="loader" aria-label="Cargando clima"></div>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !weather && !error && (
          <p className="status-message">Busca una ciudad para ver el clima actual.</p>
        )}

        <section className="quick-links" aria-label="Accesos rápidos">
          {favorites.length > 0 && (
            <div className="panel">
              <h2>Favoritos</h2>
              <div className="chip-list">
                {favorites.map((city) => (
                  <button
                    key={city.key}
                    type="button"
                    className="chip"
                    onClick={() => getWeather(city.name)}
                  >
                    {city.name}, {city.country}
                  </button>
                ))}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="panel">
              <h2>Recientes</h2>
              <div className="chip-list">
                {history.map((city) => (
                  <button key={city} type="button" className="chip secondary" onClick={() => getWeather(city)}>
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />

            {forecast.length > 0 && (
              <section className="forecast-panel" aria-label="Pronóstico de los próximos días">
                <h3>Pronóstico de los próximos días</h3>
                <div className="forecast-list">
                  {forecast.map((day) => (
                    <div key={day.date} className="forecast-card">
                      <p>{new Date(day.date).toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" })}</p>
                      <strong>{Math.round(day.temp)}°C</strong>
                      <span>{day.description}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
