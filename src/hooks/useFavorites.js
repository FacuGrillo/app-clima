import { useEffect, useMemo, useState } from "react";
import { getStorage } from "./useLocalStorage";

const FAVORITES_KEY = "clima-favoritos";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    try {
      const savedFavorites = JSON.parse(storage.getItem(FAVORITES_KEY) || "[]");
      setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (weather) => {
    if (!weather) return;

    const key = `${weather.name}-${weather.sys?.country}`.toLowerCase();
    const existing = favorites.find((item) => item.key === key);

    if (existing) {
      setFavorites((prev) => prev.filter((item) => item.key !== key));
    } else {
      setFavorites((prev) => [
        ...prev,
        {
          key,
          name: weather.name,
          country: weather.sys?.country,
          temp: weather.main?.temp,
        },
      ]);
    }
  };

  const isFavorite = (weather) => {
    if (!weather) return false;
    const key = `${weather.name}-${weather.sys?.country}`.toLowerCase();
    return favorites.some((item) => item.key === key);
  };

  return { favorites, toggleFavorite, isFavorite };
};
