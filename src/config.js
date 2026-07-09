// src/config.js

const envApiKey = import.meta.env.VITE_API_KEY;

// API key: preferir variable de entorno. NO dejar claves hardcodeadas.
export const API_KEY = envApiKey || "7005e21c0e23f08f98dbaa46ad2faf30";
export const HAS_API_KEY = Boolean(envApiKey);

// URLs base de las APIs
export const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
export const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
export const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
