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
    try {
      setError(null);
      setLoading(true);

      let url;
      if (typeof location === "string") {
        // búsqueda por nombre (Enter o botón)
        url = `${WEATHER_URL}?q=${location}&appid=${API_KEY}&units=metric&lang=es`;
      } else {
        // búsqueda por coordenadas (cuando seleccionás de la lista)
        url = `${WEATHER_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=es`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        setError(
          `No se encontró la ciudad "${
            typeof location === "string" ? location : ""
          }". Verifica el nombre o intenta otra vez.`
        );
      }
    } catch (err) {
      setWeather(null);
      setError("Error al conectar con la API.");
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
