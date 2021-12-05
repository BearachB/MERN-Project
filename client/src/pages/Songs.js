import React, { useState, useEffect } from 'react'

function App() {
  const [songs, setSongs] = useState([])
  let [page, setPage] = useState(1)
  const [favourites, setFavourites] = useState([])
  const [isLoaded, setisLoaded] = useState(false)

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  // Simple function that displays what page the user is on
  const displayResNumber = () => {
    const showRes = ' Showing Results: '
    if (page === 1) {
      return <p> {showRes}1-100 of 1,000</p>
    }
    if (page === 2) {
      return <p> {showRes}100-200 of 1,000</p>
    }
    if (page === 3) {
      return <p> {showRes}200-300 of 1,000</p>
    }
    if (page === 4) {
      return <p> {showRes}300-400 of 1,000</p>
    }
    if (page === 5) {
      return <p> {showRes}400-500 of 1,000</p>
    }
    if (page === 6) {
      return <p> {showRes}500-600 of 1,000</p>
    }
    if (page === 7) {
      return <p> {showRes}600-700 of 1,000</p>
    }
    if (page === 8) {
      return <p> {showRes}700-800 of 1,000</p>
    }
    if (page === 9) {
      return <p> {showRes}800-900 of 1,000</p>
    }
    if (page === 10) {
      return <p> {showRes}900-1,000 of 1,000</p>
    }
  }

  // Function that fetches the songs to be displayed
  const fetchSongs = async () => {
    const result = await fetch(
      `http://localhost:1337/api/songs?page=${page}&limit=100`,
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
    } else {
      alert(data.error)
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
     await res.json()
   
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
   await res.json()
   
  }

  // Use effect function for the fetching of favourites 
  useEffect(() => {
    fetchFavourites()
  }, [favourites])

  // Use effect functionn for the fetching of songs
  useEffect(() => {
    fetchSongs()  // eslint-disable-next-line
  }, [page])

  return (
    // Main container for the results
    <div className="container">
      {isLoaded ? (
        <>
          <u>
            <h1>Song List</h1>
          </u>
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
          {/* Div for the page forward/back buttons */}
          <div id="resultsPages">
            <table class="pageNoTable">
              <tbody class="pageNoTableBody">
                <tr className="pageNoTableRow">
                  {page !== 1 ? (
                    <>
                      <td class="pageButton">
                        <button onClick={previousPage}>🡸</button>
                      </td>
                      <td>{displayResNumber()}</td>
                      <td>
                        <button onClick={nextPage}>🡺</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td class="pageButton"></td>
                      <td>{displayResNumber()}</td>
                      <td>
                        <button onClick={nextPage}>🡺</button>
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default App
