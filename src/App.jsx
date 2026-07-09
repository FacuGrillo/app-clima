import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { API_KEY, WEATHER_URL } from "./config";

import "./styles/App.css";
import "./styles/dark-theme.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      } else {
        setWeather(null);
        setError(
          `No se encontró la ciudad "${
            typeof normalizedLocation === "string" ? normalizedLocation : ""
          }". Verifica el nombre o intenta otra vez.`
        );
      }
    } catch (err) {
      setWeather(null);
      setError("Error al conectar con la API o no se pudo completar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>App de Clima</h1>
      <SearchBar onSearch={getWeather} />

      {loading && <div className="loader"></div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
