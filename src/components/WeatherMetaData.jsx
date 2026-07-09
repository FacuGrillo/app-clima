function WeatherMetaData({ main, wind, visibility }) {
  const visibilityKm = visibility ? (visibility / 1000).toFixed(1) : "N/D";

  return (
    <div className="weather-meta">
      <div>
        <span>Sensación</span>
        <strong>{main?.feels_like ?? "N/D"} °C</strong>
      </div>
      <div>
        <span>Humedad</span>
        <strong>{main?.humidity ?? "N/D"}%</strong>
      </div>
      <div>
        <span>Presión</span>
        <strong>{main?.pressure ?? "N/D"} hPa</strong>
      </div>
      <div>
        <span>Viento</span>
        <strong>{wind?.speed ?? "N/D"} m/s</strong>
      </div>
      <div>
        <span>Visibilidad</span>
        <strong>{visibilityKm} km</strong>
      </div>
    </div>
  );
}

export default WeatherMetaData;
