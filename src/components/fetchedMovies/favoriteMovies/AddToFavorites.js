import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdOutlineFavorite } from 'react-icons/md'


function AddToFavorites({ addsToFavoritesHandler, movie }) {
    const [hover, setHover] = useState(false)

    return (
        <>
            <p>Add to favorites</p>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                // I have to pass the movie param so that the function knows which movie to add, so i need a callback that calls the function
                onClick={() => addsToFavoritesHandler(movie)}>
                {!hover ?
                    <IconContext.Provider
                        value={{ size: "2.5rem" }}>
                        <div>
                            <MdOutlineFavoriteBorder />
                        </div>
                    </IconContext.Provider>
                    : <IconContext.Provider
                        value={{ size: "2.5rem", color: "red" }}>
                        <div>
                            <MdOutlineFavorite />
                        </div>
                    </IconContext.Provider>}
            </div>
        </>
    )
}

export default AddToFavorites