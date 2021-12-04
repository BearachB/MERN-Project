import React, { useState, useEffect } from 'react'
import SearchFeature from '../components/SearchFeature'

function App() {
  const [songs, setSongs] = useState([])
  const [Filters, setFilters] = useState('')
  const [Limit, setLimit] = useState(100)
  const [SearchTerm, setSearchTerms] = useState('')
  const [Skip, setSkip] = useState(0)
  const [favourites, setFavourites] = useState([])
  const [isLoaded, setisLoaded] = useState(false)

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    }
    Q
    setSkip(0)
    setSearchTerms(newSearchTerm)
    fetchSongs(newSearchTerm)
    console.log('Fetching songs')
    console.log('Search.js Search term here:', newSearchTerm)
  }

  const fetchSongs = async (SearchTerm) => {
    const result = await fetch(
      `http://localhost:1337/api/songsearch?page=1&limit=100&searchTerm=${SearchTerm}`,
    )
    console.log('Search.js Search term here:', SearchTerm)
    const data = await result.json()
    setSongs(data.results)
    setisLoaded(true)
  }

  const fetchFavourites = async () => {
    const req = await fetch('http://localhost:1337/api/bio', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      
    setFavourites(data.favourites)      
      
    } else {
      alert(data.error)
    }
   }


   const SaveFavourites = async (newFav) => {
    const res = await fetch('http://localhost:1337/api/addfavourite', {
    method: "PATCH",
    headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            favourites : newFav
          }),
    })
    const data = await res.json()
    console.log(data)
  }

  const removeFavourites = async (Fav) => {
    const res = await fetch('http://localhost:1337/api/removefavourite', {
    method: "PATCH",
    headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            favourites : Fav
          }),
    })
    const data = await res.json()
    console.log(data)

  }


  useEffect(() =>{
 
    fetchFavourites()
  },[favourites])


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
      { isLoaded ? (
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
              <th style={{textAlign:"center"}}>Favourite(★)</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
          {songs.map((info) => (
            <tr>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td style={{textAlign:"center"}}>{info.popularity}</td>
              <td>{info.genre}</td>
              {(favourites.includes(info.track_name))?
              <td style={{textAlign:"center"}} onClick={() => removeFavourites(info.track_name)}>★</td>
              :
              <td style={{textAlign:"center"}} onClick={() => SaveFavourites(info.track_name)}>☆</td>}
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
