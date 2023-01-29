import React from 'react'
import loadingGif from "../assets/movie_loading_gif.gif"

function Pending() {
    return (
        <div className="myApp d-grid justify-content-center align-items-center">
            <img src={loadingGif} />
        </div>
    )
}

export default Pending