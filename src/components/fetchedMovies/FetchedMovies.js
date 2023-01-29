import React from 'react'
import AddToFavorites from './favoriteMovies/AddToFavorites.js'
import RemoveFromFavorites from './favoriteMovies/RemoveFromFavorites.js'
import { Link } from 'react-router-dom'


function FetchedMovies({ movies, favoritesList, addsToFavoritesHandler, removesFromFavoritesHandler }) {
  return (
    <>
      {movies.length > 0 && movies.map((movie, index) => (
        <div key={index} className="myMovieContainer mx-2">
          <Link to='movie' state={{ movie: movie.imdbID }}>
            <img className="myImagePoster" src={movie.Poster} alt={movie.Title} />
          </Link>
          <div
            className='myOverlay d-flex flex-column justify-content-center align-items-center'>
            {favoritesList ?
              <RemoveFromFavorites removesFromFavoritesHandler={removesFromFavoritesHandler}
                movie={movie}
              /> :
              <AddToFavorites
                addsToFavoritesHandler={addsToFavoritesHandler}
                movie={movie} />}
          </div>
        </div>
      ))}
    </>
  )
}

export default FetchedMovies