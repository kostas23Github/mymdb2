import React from 'react'


function SearchBar({ queryTitle, setQueryTitle, queryId, setQueryId, setFocused }) {

  return (
    <>
      <input
        type="text"
        id="myInputTitle"
        className='myInputElem col' 
        placeholder='Search by movie title'
        value={queryTitle}
        onChange={(e) => setQueryTitle(e.target.value)}
        onFocus={() => setFocused(true)}
        // onBlur loses focus
        onBlur={() => setFocused(false)}
        style={{ height: "40px", maxWidth: "300px" }}
      />
      <input
        type="text"
        id="myInputId"
        className='myInputElem col ms-2' 
        placeholder='Search by movie id'
        value={queryId}
        onChange={(e) => setQueryId(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ height: "40px", maxWidth: "300px" }}
      />
    </>
  )
}

export default SearchBar