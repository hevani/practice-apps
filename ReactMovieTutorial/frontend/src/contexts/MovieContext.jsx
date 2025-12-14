import { createContext, useState, useContext, useEffect, useMemo, useCallback } from "react";

const MovieContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
});

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId) => favorites.some((movie) => movie.id === movieId),
    [favorites]
  );

  const memoizedValue = useMemo(
    () => ({ favorites, addToFavorites, removeFromFavorites, isFavorite }),
    [favorites, addToFavorites, removeFromFavorites, isFavorite]
  );

  return (
    <MovieContext.Provider value={memoizedValue}>
      {children}
    </MovieContext.Provider>
  );
};
