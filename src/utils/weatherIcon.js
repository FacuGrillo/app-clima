export const getWeatherEmoji = (icon = "") => {
  if (icon.startsWith("01")) return "☀️";
  if (icon.startsWith("02")) return "🌤️";
  if (icon.startsWith("03") || icon.startsWith("04")) return "☁️";
  if (icon.startsWith("09")) return "🌧️";
  if (icon.startsWith("10")) return "🌦️";
  if (icon.startsWith("11")) return "⛈️";
  if (icon.startsWith("13")) return "❄️";
  return "🌈";
};
