import { useEffect, useState } from "react";
import { getStorage } from "./useLocalStorage";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    try {
      const savedTheme = storage.getItem("clima-theme") || "dark";
      setTheme(savedTheme === "light" ? "light" : "dark");
    } catch {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    storage.setItem("clima-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
};
