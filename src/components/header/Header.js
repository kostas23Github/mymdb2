import React from 'react'
import "../../App.css"


function Header({text}) {
  return (
    <div className='col display-4 fw-semibold'><span className='myLogo'>My</span>{text}</div>
  )
}

export default Header