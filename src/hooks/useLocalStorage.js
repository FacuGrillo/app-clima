export const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storage = window.localStorage;

  if (!storage || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") {
    return null;
  }

  return storage;
};
