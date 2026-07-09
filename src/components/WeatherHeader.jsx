function WeatherHeader({ weather, isFavorite, onToggleFavorite }) {
  return (
    <div className="weather-header">
      <div>
        <p className="eyebrow">Clima actual</p>
        <h2>
          {weather.name}, {weather.sys?.country}
        </h2>
      </div>
      <button type="button" className="favorite-button" onClick={onToggleFavorite}>
        {isFavorite ? "★ Guardado" : "☆ Agregar a favoritos"}
      </button>
    </div>
  );
}

export default WeatherHeader;
