import React, { useState, useEffect } from 'react'
import SearchFeature from '../components/SearchFeature'
import { Input } from 'antd'

function App() {
  const [songs, setSongs] = useState([])
  const [Filters, setFilters] = useState('')
  const [Limit, setLimit] = useState(100)
  const [PostSize, setPostSize] = useState()
  const [SearchTerm, setSearchTerms] = useState('')
  const [Skip, setSkip] = useState(0)

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)
    fetchSongs(newSearchTerm)
    console.log('Fetching songs')
    // console.log(variables)
    // console.log("Search term: ",SearchTerm)
    console.log('Search.js Search term here:', newSearchTerm)
  }

  const fetchSongs = async (SearchTerm) => {
    // console.log("Update search terms: ", updateSearchTerms)
    const result = await fetch(
      `http://localhost:1337/api/songsearch?page=1&limit=100&searchTerm=${SearchTerm}`,
    )
    console.log('Search.js Search term here:', SearchTerm)
    const data = await result.json()
    setSongs(data.results)
  }

  useEffect(() => {
    fetchSongs(SearchTerm)
  }, [SearchTerm])

  // fetchSongs()
  return (
    // Main container for the results
    <div>
      <div>
        <h1>Song Search</h1>
        <SearchFeature refreshFunction={updateSearchTerms} />
        <br />
      </div>
      <h2>Search Results</h2>
      <div className="container">
        <table>
          {/* Table head */}
          <thead>
            <tr>
              <th>Artist</th>
              <th>Track Name</th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Track ID</th>
              <th>Favourite(★)</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {songs.map((info) => (
              <tr>
                <td>{info.artist_name}</td>
                <td>{info.track_name}</td>
                <td>{info.popularity}</td>
                <td>{info.genre}</td>
                <td>{info.track_id}</td>
                <td>☆★</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
