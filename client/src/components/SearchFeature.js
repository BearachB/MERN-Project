import React, { useState } from 'react'

// Search feature fucntion which passes the user input as props
function SearchFeature(props) {
  const [searchTerms, setSearchTerms] = useState('')
  
  // Whenever the user enters a keystroke, update the searchterm
  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value)
    props.refreshFunction(event.currentTarget.value)
  }
  
  // Returns the searchfeature component, which is displayed on the search page
  return (
    <div>
      <form>
        <input className="searchBox"
        value={searchTerms}
        onChange={onChangeSearch}
        placeholder="Enter search term"/>
      </form>
    </div>
  )
}

export default SearchFeature
