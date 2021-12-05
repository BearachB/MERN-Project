import React, { useState, useEffect } from 'react'
import SearchFeature from '../components/SearchFeature'

function App() {
  const [songs, setSongs] = useState([])
  const Filters = ''
  const Limit = 100
  const [SearchTerm, setSearchTerms] = useState('')
  const [Skip, setSkip] = useState(0)
  const [favourites, setFavourites] = useState([])
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

  // Function that fetches the songs to be displayed
  const fetchSongs = async (SearchTerm) => {
    const result = await fetch(
      `http://localhost:1337/api/songsearch?page=1&limit=100&searchTerm=${SearchTerm}`,
    )

    const data = await result.json()
    setSongs(data.results)
    setisLoaded(true)
  }

  // Function allowing for fetching of favourites
  const fetchFavourites = async () => {
    const req = await fetch('http://localhost:1337/api/bio', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setFavourites(data.favourites)
    } 
  
  }

  // Function allowing for adding of favourites
  const SaveFavourites = async (newFav) => {
    const res = await fetch('http://localhost:1337/api/addfavourite', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        favourites: newFav,
      }),
    })
   const data =  await res.json()
  }

  // Function allowing for removal of favourites
  const removeFavourites = async (Fav) => {
    const res = await fetch('http://localhost:1337/api/removefavourite', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        favourites: Fav,
      }),
    })
    const data =  await res.json()
   
  }

  // Use effect function for the fetching of favourites
  useEffect(() => {
    fetchFavourites()
  }, [favourites])

  // Use effect functionn for the fetching of songs
  useEffect(() => {
    fetchSongs(SearchTerm)
  }, [SearchTerm])

  return (
    // Main container for the results
    <div>
      <div>
        <u>
          <h1>Song Search</h1>
        </u>
        <SearchFeature refreshFunction={updateSearchTerms} />
        <br />
      </div>
      <h2>Search Results:</h2>
      {isLoaded ? (
        songs.length !== 0 ? (
          <div className="container">
            <table>
              {/* Table head - Prints the song info headers */}
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Track Name</th>
                  <th style={{ textAlign: 'center' }}>Popularity</th>
                  <th>Genre</th>
                  <th style={{ textAlign: 'center' }}>Favourite(★)</th>
                </tr>
              </thead>
              {/* Table body - Prints the actual song info */}
              <tbody>
              {songs.map((info,i) => (
                <tr key={i}>
                    <td>{info.artist_name}</td>
                    <td>{info.track_name}</td>
                    <td style={{ textAlign: 'center' }}>{info.popularity}</td>
                    <td>{info.genre}</td>
                    {/* Shows whether a song has been favourited by user */}
                    {favourites.includes(info.track_name) ? (
                      <td
                        style={{ textAlign: 'center' }}
                        onClick={() => removeFavourites(info.track_name)}
                      >
                        ★
                      </td>
                    ) : (
                      <td
                        style={{ textAlign: 'center' }}
                        onClick={() => SaveFavourites(info.track_name)}
                      >
                        ☆
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          // If there are no matches
        ) : (
          <h2>No Songs Match Your Search</h2>
        )
      ) : null}
      <br />
    </div>
  )
}

export default App
