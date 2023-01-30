import { useState, useEffect } from "react";

import MovieCard from "./movieCard";
import './App.css';
import SearchIcon from './search.svg'

// 1174a367

const API_URL = 'http://www.omdbapi.com?apikey=1174a367';

const movie1 = {
    "Title": "Titanic",
    "Year": "1997",
    "imdbID": "tt0120338",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
}


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        // get data
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies({setSearchTerm});
    },[]);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.val)}/>

                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
            </div>

        {movies?.length > 0
            ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
    </div>
    );
}

export default App;

