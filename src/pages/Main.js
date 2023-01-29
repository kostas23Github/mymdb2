import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap"
import Header from '../components/header/Header.js';
import SearchBar from '../components/searchBar/SearchBar'
import FetchedMovies from '../components/fetchedMovies/FetchedMovies.js'
import Error from './Error.js'
import Pending from '../components/Pending.js'
import Footer from '../components/footer/Footer.js';
import "../App.css"
import { AiFillCaretLeft } from "react-icons/ai"
import { AiFillCaretRight } from "react-icons/ai"
import { useNavigate } from 'react-router'

// The main page/landing page 

function Main({ 
  handlesError, 
  handlesIsPending, 
  isPending 
}) {
  const navigate = useNavigate()
  // Stores the fetched movies by the Fetch API
  const [fetchedMovies, setFetchedMovies] = useState([])
  // Stores the input search value of title/id
  const [queryTitle, setQueryTitle] = useState('')
  const [queryId, setQueryId] = useState('')
  // Stored if any input element is focused or not
  const [focused, setFocused] = useState(true)
  // Stored the array of movies the the user marked as favorites
  const [favorites, setFavorites] = useState([])
  // Stores the current page of the movie results
  const [pageCounter, setPageCounter] = useState(1)
  // The error msg after a bad request
  let errorStringMsg

  function addToFavorites(newFavorite) {
    // If movie already exists in favorites movie list dont't include the new one.
    if (favorites && favorites.some(movie => movie.imdbID === newFavorite.imdbID)) {
      return
    }
    
    const newFavoriteList = favorites ?  [...favorites, newFavorite] : [newFavorite]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  function removesFromFavorites(oldFavorite) {
    // Remove the movie clicked by the user
    const newFavoriteList = favorites.filter(movie => movie !== oldFavorite)
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  function endpoint() {
    // Handles the Url endpoint based on what/where the user searched a value
    if (queryTitle) {
      return `s=${queryTitle}&page=${pageCounter}`
    } else if (queryId) {
      return `i=${queryId}&page=0`
    }
  }

  async function fetchMovies() {
    const url = `https://www.omdbapi.com/?${endpoint()}&apikey=247de336`

    
    const response = await fetch(url)
    // imdbID tt0323108
    const responseJson = await response.json()
    // Update the rending state the re fetch promise is resolved
    handlesIsPending(false)
    // Adds to the fetched movies array only if the response is valid. The 2 different cases are to handle if the there was a search by title or id. By title a Search array is returned. By id an obj.
    if (responseJson.Search) {
      setFetchedMovies(responseJson.Search)
    } else if (responseJson.imdbID) {
      setFetchedMovies([responseJson])
    }
    
    try {
      // The user has searched sth and has finished typing and what he searched doesn't exist
      if ((queryTitle || queryId) && !focused && responseJson.Response === "False") {
        errorStringMsg = responseJson.Error
        // Throw error to execute the catch block
        throw new Error()
      }
    } catch (err) {
      // Execute the error handler which sets the error msg for the error page and navigate to that page 
      // Update the error msg string value
      handlesError(errorStringMsg)
      navigate('../error')
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [queryTitle, queryId, pageCounter, focused])

  useEffect(() => {
    // Update the favorite movies list based on local storage, at the first render
    const lSMovies = JSON.parse(localStorage.getItem("myFlix-Favorite-Movies"))

    setFavorites(lSMovies)
  }, [])


  function saveToLocalStorage(favoriteMovies) {
    // Updates the localStorage
    localStorage.setItem("myFlix-Favorite-Movies", JSON.stringify(favoriteMovies))
  }


  return (
    <>
      {isPending ? <Pending /> :
        <div className="myApp container-fluid py-3 m-0 d-flex flex-column">
          <div className="flex-grow-1">
            <div className='myHeader row d-flex justify-items-between align-items-center my-4'>
              <Header text="Flix" />
              <SearchBar
                queryTitle={queryTitle} setQueryTitle={setQueryTitle}
                queryId={queryId} setQueryId={setQueryId}
                setFocused={setFocused} />
            </div>
            <div className='container-fluid d-flex position-relative'>
              {fetchedMovies.length > 5 && <Button id="left" className="carouselBtn" onClick={() => setPageCounter(prevCounter => prevCounter <= 1 ? prevCounter : prevCounter - 1)}><AiFillCaretLeft /></Button>}
              <FetchedMovies
                movies={fetchedMovies}
                favoritesList={false}
                addsToFavoritesHandler={addToFavorites}
                removesFromFavoritesHandler={removesFromFavorites} />
              {fetchedMovies.length > 5 && <Button id="right" className="carouselBtn" onClick={() => setPageCounter(prevCounter => prevCounter + 1)}><AiFillCaretRight /></Button>}
            </div>
            <div className='myHeader row d-flex justify-items-between align-items-center my-4'>
              <Header text={"Favorites"} />
            </div>
            <div className='container-fluid d-flex'>
              <FetchedMovies
                movies={favorites}
                favoritesList={true}
                addsToFavoritesHandler={addToFavorites}
                removesFromFavoritesHandler={removesFromFavorites}
              />
            </div>
          </div>
          <Footer />
        </div >}
    </>
  );
}

export default Main;
