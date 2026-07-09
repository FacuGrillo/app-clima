import WeatherHeader from "./WeatherHeader";
import TemperaturePill from "./TemperaturePill";
import WeatherMetaData from "./WeatherMetaData";

function WeatherCard({ weather, isFavorite, onToggleFavorite }) {
  const condition = weather?.weather?.[0];
  const main = weather?.main;
  const wind = weather?.wind;

  return (
    <div className="weather-card">
      <WeatherHeader weather={weather} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
      <div className="weather-main">
        <TemperaturePill main={main} condition={condition} />
        <WeatherMetaData main={main} wind={wind} visibility={weather?.visibility} />
      </div>
    </div>
  );
}

export default WeatherCard;
