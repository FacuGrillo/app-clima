// src/config.js

const envApiKey = import.meta.env.VITE_API_KEY;

// Tu API Key de OpenWeather
export const API_KEY = envApiKey || "7005e21c0e23f08f98dbaa46ad2faf30";

// URLs base de las APIs
export const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
export const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
export const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
