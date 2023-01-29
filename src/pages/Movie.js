import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsFillSkipBackwardFill } from 'react-icons/bs'
import { AiFillStar } from "react-icons/ai"
import Pending from "../components/Pending.js"

// The movie page, displays a single movie with more info

function Movie({
    handlesIsPending,
    isPending
}) {
    const { state } = useLocation()
    const movieID = state.movie
    const [movieInfo, setMovieInfo] = useState({})
    const [hover, setHover] = useState(false)


    const fetchMovie = async () => {

        const url = `https://www.omdbapi.com/?i=${movieID}&apikey=247de336`

        const response = await fetch(url)
        const responseJson = await response.json()
        handlesIsPending(false)
        setMovieInfo(responseJson)

    }
    // This hook is executed only when the movieID variable changes. 
    useEffect(() => {
        handlesIsPending(true)

        // A mock delay to show the loading animation
        setTimeout(() => {
            fetchMovie()
        }, 500)

    }, [movieID])

    // If isPending is false display contents of page else display the pending component with loading gif.
    return (
        <>
            {isPending ? <Pending /> :
                <div className='container-fluid myApp'>
                    <div className="pt-3">
                        <Link to=".."
                            className={`border rounded p-2 cursor-pointer ${hover ? ' text-dark bg-light' : 'border-white text-white'}`}
                            style={{ textDecoration: "none" }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}>
                            <BsFillSkipBackwardFill /> Return
                        </Link>
                    </div>
                    <div className='container w-75 text-center text-md-start'>
                        <h2 className="display-2">{movieInfo.Title}</h2>
                        <div>
                            <span className="fw-semibold">{movieInfo.Year}{" -- "}</span>
                            <span className="">{movieInfo.Rated}</span>
                            <span className="">{" -- "}{movieInfo.Runtime}</span>
                        </div>
                        <div className="row my-4">
                            <img
                                style={{ maxHeight: "400px" }}
                                className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4"
                                src={movieInfo.Poster}
                                alt={movieInfo.Title} />
                            <div
                                className="container-fluid col col-md-6">
                                <p>{movieInfo.Plot}</p>
                                <p className="border rounded-pill text-center"
                                    style={{ backgroundColor: "white", color: "#141414" }}>{movieInfo.Genre}</p>
                                <p className="border rounded-pill text-center"
                                    style={{ backgroundColor: "white", color: "#141414" }}>{movieInfo.Language}</p>
                                <div className="container-fluid p-0">
                                    <p className="mb-1">Actors:</p>
                                    <p className="">{movieInfo.Actors}</p>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <p className="text-center"><span className="bg-success p-2">{movieInfo.Metascore}</span> Metascore</p>
                                    <p className="d-flex align-items-center"><AiFillStar style={{ color: "yellow", width: "40px", height: "30px" }} />{movieInfo.imdbRating}/10</p>
                                    <p>{movieInfo.imdbVotes} Votes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Movie