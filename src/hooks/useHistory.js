import { useEffect, useState } from "react";
import { getStorage } from "./useLocalStorage";

const HISTORY_KEY = "clima-historial";

export const useHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    try {
      const savedHistory = JSON.parse(storage.getItem(HISTORY_KEY) || "[]");
      setHistory(Array.isArray(savedHistory) ? savedHistory : []);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (cityName) => {
    if (!cityName) {
      return;
    }

    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== cityName.toLowerCase()
      );
      return [cityName, ...filtered].slice(0, 6);
    });
  };

  return { history, addToHistory };
};
