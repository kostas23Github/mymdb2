import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { IoIosRemoveCircle } from "react-icons/io"


function RemoveFromFavorites({ removesFromFavoritesHandler, movie }) {
  const [hover, setHover] = useState(false)
  return (
    <>
      <p>Remove from favorites</p>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // I have to pass the movie param so that the function knows which movie to add, so i need a callback that calls the function
        onClick={() => removesFromFavoritesHandler(movie)}>
        {!hover ?
          <IconContext.Provider
            value={{ size: "2.5rem" }}>
            <div>
              <IoIosRemoveCircleOutline />
            </div>
          </IconContext.Provider>
          : <IconContext.Provider
            value={{ size: "2.5rem", color: "red" }}>
            <div>
              <IoIosRemoveCircle />
            </div>
          </IconContext.Provider>}
      </div>
    </>
  )
}

export default RemoveFromFavorites