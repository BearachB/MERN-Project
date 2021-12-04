import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchFeature(props) {
  const [searchTerms, setSearchTerms] = useState('')
  
  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value)
    props.refreshFunction(event.currentTarget.value)
  }
  
  return (
    <div>
      {/* <Search
        value={searchTerms}
        onChange={onChangeSearch}
        placeholder="Type here to search"
      /> */}
      <form>
        <input 
        value={searchTerms}
        onChange={onChangeSearch}
        placeholder="Enter search term"/>
      </form>
    </div>
  )
}

export default SearchFeature
