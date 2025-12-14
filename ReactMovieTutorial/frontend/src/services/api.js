// api.js

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("API_KEY:", API_KEY);
console.log("BASE_URL:", BASE_URL);

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Error fetching popular movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) {
    throw new Error(`Error searching movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};
