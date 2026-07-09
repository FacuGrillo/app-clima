import { getWeatherEmoji } from "../utils/weatherIcon";

function ForecastPanel({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-panel">
      <h3>Pronóstico de los próximos días</h3>
      <div className="forecast-list">
        {forecast.map((item) => {
          const condition = item.weather?.[0];
          const date = new Date(item.dt * 1000).toLocaleDateString("es-AR", {
            month: "short",
            day: "numeric",
          });

          return (
            <div key={item.dt} className="forecast-card">
              <span>{getWeatherEmoji(condition?.icon)}</span>
              <span>{date}</span>
              <strong>{item.main?.temp_max?.toFixed(0)}°</strong>
              <span>{item.main?.temp_min?.toFixed(0)}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastPanel;
