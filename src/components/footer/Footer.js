import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

function Footer() {
    const libraries = ["bootstrap", "bootstrap-icons", "react-bootstrap", "react-router-dom", "react-router", "react-icons", "Google Search <3"]
    const languages = ["React.js v18.2.0", "CSS3"]

    return (
        <>
            <div
                className="myHeader d-flex justify-content-between justify-content-lg-around mt-4"
                style={{ background: "radial-gradient(closest-side, black, #141414)" }}
            >
                <ul className="ps-4 py-3">
                    <h4>Libraries Used:</h4>
                    {libraries.map((library, index) => (
                        <ListGroupItem key={index}>{library}</ListGroupItem>
                    ))}
                </ul>
                <ul className="ps-0 py-3">
                    <h4>Languages</h4>
                    {languages.map((language, index) => (
                        <ListGroupItem key={index}>{language}</ListGroupItem>
                    ))}
                </ul>
                <ul className="ps-0 pe-4 py-3">
                    <h4>Contact Info</h4>
                    <ListGroupItem>LinkedIn</ListGroupItem>
                    <ListGroupItem>Github</ListGroupItem>
                </ul>
            </div>
            <div
                className="myHeader text-center">
                This project was created and developed by <u>me</u>.
            </div>
        </>
    )
}

export default Footer