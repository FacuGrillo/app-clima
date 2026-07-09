import { getWeatherEmoji } from "../utils/weatherIcon";

function TemperaturePill({ main, condition }) {
  return (
    <div className="temp-pill">
      <span className="icon">{getWeatherEmoji(condition?.icon)}</span>
      <div>
        <strong>{main?.temp ?? "N/D"} °C</strong>
        <p>{condition?.description || "Sin descripción"}</p>
      </div>
    </div>
  );
}

export default TemperaturePill;
