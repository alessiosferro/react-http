import { useState, useEffect, useCallback, useContext } from 'react';
import { AppContext } from "./store/app-context";
import { useGetMovies, useAddMovie, useDeleteMovie } from "./services/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [{error, loading}] = useContext(AppContext);

  // map movies and updates movies state
  const mapMovies = useCallback(data => {
    const mappedMovies = data ? Object.keys(data).map(key => ({id: key, ...data[key]})) : []
    setMovies(mappedMovies);
  }, []);

  const getMovies = useGetMovies(mapMovies);
  const addMovie = useAddMovie(getMovies);
  const deleteMovie = useDeleteMovie(getMovies);

  // submits a post request with the body
  const addMovieHandler = useCallback(e => {
    e.preventDefault();

    const {
      title,
      description,
      favorite
    } = e.target.elements;

    addMovie({
      title: title.value,
      description: description.value,
      favorite: favorite.checked
    });
  }, [addMovie]);

  // fetch movies when the component is mounted
  useEffect(() => getMovies(), [getMovies]);

  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={getMovies}>Get movies!</button>
      
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <input type="checkbox" disabled checked={movie.favorite} />
          <button onClick={() => deleteMovie(movie.id)}>Delete</button>
        </div>
      ))}
      
      <form onSubmit={addMovieHandler}>
        <div>
          <label>Title<br/>
          <input name="title" type="text" placeholder="title" />
          </label>
        </div>
        <div>
          <label> Description<br/>
          <textarea name="description" placeholder="description"></textarea>
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="favorite"/>Favorite
          </label>
        </div>
        <button type="submit">Add movie</button>
      </form>
    </div>
  );
}

export default App;
