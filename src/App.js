import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Main from "./pages/Main.js"
import Movie from "./pages/Movie.js"
import Error from './pages/Error'


function App() {
    const [errorMsg, setErrorMsg] = useState('')
    const [isPending, setIsPending] = useState(true)
    function handlesError(errorStringMsg) {
        setErrorMsg(errorStringMsg)
    }
    function handlesIsPending(value) {
        setIsPending(value)
    }

    return (
        <>
            <Routes>
                <Route path='/'
                    element={
                        <Main
                            handlesError={handlesError}
                            handlesIsPending={handlesIsPending}
                            isPending={isPending}
                        />} />
                <Route path='movie'
                    element={
                        <Movie
                            handlesIsPending={handlesIsPending}
                            isPending={isPending}
                        />} />
                <Route path='error'
                    element={
                        <Error
                            errorMsg={errorMsg}
                        />} />
            </Routes>
        </>
    )
}

export default App