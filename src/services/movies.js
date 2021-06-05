import { useHttp } from "../hooks/use-http"
import { useCallback } from 'react';

export const useGetMovies = callbackFn => {
  const getMovies = useHttp();

  return useCallback(
    () => getMovies({url: 'https://react-http-e93a2-default-rtdb.europe-west1.firebasedatabase.app/movies.json'},
    callbackFn
  ), [getMovies, callbackFn]);
}

export const useAddMovie = (callbackFn) => {
  const addMovies = useHttp();

  return useCallback(
    body => addMovies({
      url: 'https://react-http-e93a2-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, callbackFn),
    [addMovies, callbackFn]
  );
}

export const useDeleteMovie = (callbackFn) => {
  const deleteMovie = useHttp();

  return useCallback(
    id => deleteMovie({
      url: `https://react-http-e93a2-default-rtdb.europe-west1.firebasedatabase.app/movies/${id}.json`,
      method: 'DELETE'
    }, callbackFn),
    [deleteMovie, callbackFn]
  )
}