import { useState } from "react";
import { API_KEY, GEO_URL } from "../config";

function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchSuggestions = async (query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length > 2) {
      try {
        const res = await fetch(
          `${GEO_URL}?q=${encodeURIComponent(trimmedQuery)}&limit=5&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setSelectedIndex(-1);
      } catch {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const nextValue = e.target.value;
    setCity(nextValue);
    fetchSuggestions(nextValue);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedCity = city.trim();

    if (trimmedCity.length === 0) {
      onSearch("");
      return;
    }

    onSearch(trimmedCity);
    setCity("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleSelect = (s) => {
    setCity(s.name);
    onSearch({ lat: s.lat, lon: s.lon });
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa ciudad..."
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions" aria-label="Sugerencias de ciudades">
          {suggestions.map((s, i) => (
            <li
              key={`${s.name}-${s.lat}-${s.lon}-${i}`}
              onClick={() => handleSelect(s)}
              className={i === selectedIndex ? "is-active" : ""}
            >
              {s.name} {s.state ? `(${s.state})` : ""}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
