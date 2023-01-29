import React, { useState } from 'react'
import { ImSad } from "react-icons/im"
import { BiHappy } from "react-icons/bi"
import { Link } from "react-router-dom"

function Error({ errorMsg }) {
    // Stores if the button element is hovered or not
    const [hover, setHover] = useState(false)

    return (
        <div className="myApp container py-3 text-center my-5">
            <h2>Looks like you have run into an error! <ImSad /></h2>
            <h3 className="my-5">Below is the error Message <BiHappy /></h3>
            <Link to=".."
                className={`border rounded p-2 cursor-pointer ${hover ? ' text-dark bg-light' : 'border-white text-white'}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                Return
            </Link>
            <div className="mt-4">{errorMsg}</div>
        </div>
    )
}

export default Error