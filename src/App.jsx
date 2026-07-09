import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ThemeToggle from "./components/ThemeToggle";
import ForecastPanel from "./components/ForecastPanel";
import FavoritesList from "./components/FavoritesList";
import HistoryList from "./components/HistoryList";
import { useWeatherAPI } from "./hooks/useWeatherAPI";
import { useTheme } from "./hooks/useTheme";
import { useFavorites } from "./hooks/useFavorites";
import { useHistory } from "./hooks/useHistory";

import "./styles/App.css";
import "./styles/dark-theme.css";

function App() {
  const { weather, forecast, error, loading, getWeather } = useWeatherAPI();
  const { theme, toggleTheme } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { history, addToHistory } = useHistory();

  const handleSearch = async (location) => {
    const cityName = await getWeather(location);
    if (cityName) {
      addToHistory(cityName);
    }
  };

  const handleFavoriteClick = (cityName) => {
    handleSearch(cityName);
  };

  const handleHistoryClick = (city) => {
    handleSearch(city);
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="app-card">
        <header className="hero">
          <div className="hero-top">
            <div>
              <p className="eyebrow">Pronóstico en tiempo real</p>
              <h1>App de Clima</h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <p className="hero-copy">
            Busca ciudades, guarda tus favoritas y consulta el clima actual con más detalles.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && <div className="loader" aria-label="Cargando clima"></div>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !weather && !error && (
          <p className="status-message">Busca una ciudad para ver el clima actual.</p>
        )}

        <section className="quick-links" aria-label="Accesos rápidos">
          <FavoritesList favorites={favorites} onSearch={handleFavoriteClick} />
          <HistoryList history={history} onSearch={handleHistoryClick} />
        </section>

        {weather && !loading && (
          <>
            <WeatherCard
              weather={weather}
              isFavorite={isFavorite(weather)}
              onToggleFavorite={() => toggleFavorite(weather)}
            />
            <ForecastPanel forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
