import { useState } from "react";
import { API_KEY, FORECAST_URL, WEATHER_URL } from "../config";

export const useWeatherAPI = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (location) => {
    const trimmed = (location || "").trim();

    if (!trimmed) {
      setError("Por favor ingresa una ciudad");
      setWeather(null);
      setForecast([]);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${WEATHER_URL}?q=${encodeURIComponent(trimmed)}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `${FORECAST_URL}?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`
      );

      if (!forecastRes.ok) {
        throw new Error(`HTTP ${forecastRes.status}`);
      }

      const forecastData = await forecastRes.json();
      const dailyForecasts = forecastData.list.filter((item, index) =>
        index % 8 === 0
      );
      setForecast(dailyForecasts);
      
      return data.name;
    } catch (err) {
      setError(
        err.message.includes("HTTP 404")
          ? "Ciudad no encontrada"
          : "Error al obtener datos"
      );
      setWeather(null);
      setForecast([]);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, error, loading, getWeather };
};
