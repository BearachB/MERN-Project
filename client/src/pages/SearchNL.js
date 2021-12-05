import React, { useState, useEffect } from 'react'
import SearchFeature from '../components/SearchFeature'

function App() {
  const [songs, setSongs] = useState([])
  const Filters = ''
  const Limit = 100
  const [SearchTerm, setSearchTerms] = useState('')
  const [Skip, setSkip] = useState(0)
 
  const [isLoaded, setisLoaded] = useState(false)

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: Skip,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    }
    
    setSkip(0)
    setSearchTerms(newSearchTerm)
    fetchSongs(newSearchTerm)

  }

  // fetch the songs
  const fetchSongs = async (SearchTerm) => {
    const result = await fetch(
      `http://localhost:1337/api/songsearch?page=1&limit=100&searchTerm=${SearchTerm}`,
    )
    const data = await result.json()
    setSongs(data.results)
    setisLoaded(true)
  }


// load songs when search term is changed
  useEffect(() => {
    fetchSongs(SearchTerm)
  }, [SearchTerm])

  return (
    // Main container for the results
    <div>
      <div>
        <u><h1>Song Search</h1></u>
        <SearchFeature refreshFunction={updateSearchTerms} />
        <br />
      </div>
      <h2>Search Results:</h2>
      { isLoaded ? (          // show if loaded
       songs.length !==0 ? (
      <div className="container">
        <table>
          {/* Table head */}
          <thead>
            <tr>
              <th>Artist</th>
              <th>Track Name</th>
              <th style={{textAlign:"center"}}>Popularity</th>
              <th>Genre</th>
            
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
          {songs.map((info,i) => (
                <tr key={i}>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td style={{textAlign:"center"}}>{info.popularity}</td>
              <td>{info.genre}</td>
             
            </tr>
          ))}

          </tbody>
        </table>
      </div>
      ): <h2>No Songs Match Your Search</h2>
      ) : null }
      <br/>
    </div>
  )
}

export default App
