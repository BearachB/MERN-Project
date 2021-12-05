import React, { useState, useEffect } from 'react'

function App() {
  const [songs, setSongs] = useState([])
  let [page, setPage] = useState(1)
  const [isLoaded, setisLoaded] = useState(false)

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const displayResNumber = () => {
    const showRes = ' Showing Results: '
    if (page === 1) {
      return <p> {showRes}1-100 of 1,000</p>
    }
    if (page === 2) {
      return <p> {showRes}101-200 of 1,000</p>
    }
    if (page === 3) {
      return <p> {showRes}201-300 of 1,000</p>
    }
    if (page === 4) {
      return <p> {showRes}301-400 of 1,000</p>
    }
    if (page === 5) {
      return <p> {showRes}401-500 of 1,000</p>
    }
    if (page === 6) {
      return <p> {showRes}501-600 of 1,000</p>
    }
    if (page === 7) {
      return <p> {showRes}601-700 of 1,000</p>
    }
    if (page === 8) {
      return <p> {showRes}701-800 of 1,000</p>
    }
    if (page === 9) {
      return <p> {showRes}801-900 of 1,000</p>
    }
    if (page === 10) {
      return <p> {showRes}901-1,000 of 1,000</p>
    }
  }

  const fetchSongs = async () => {
    const result = await fetch(
      `http://localhost:1337/api/songs?page=${page}&limit=100`,
    )
    const data = await result.json()

    setSongs(data.results)
    setisLoaded(true)
  }



useEffect(() =>{
  fetchSongs() // eslint-disable-next-line
},[page])
  
  return (
    // Main container for the results
    <div className="container">
      { isLoaded ? (
        <>
      <u><h1>Song List</h1></u>
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
        {/* Table head */}
        <tbody>
          {songs.map((info) => (
            <tr>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td style={{textAlign:"center"}}>{info.popularity}</td>
              <td>{info.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="resultsPages">
        <table class="pageNoTable">
          <thead></thead>
          <tbody class="pageNoTableBody">
            <tr className="pageNoTableRow">
              
              { page !== 1? (
                <>
              <td class="pageButton">
                <button onClick={previousPage}>🡸</button>
              </td>
              <td style={{width:"40px", verticalAlign:"middle"}}>{displayResNumber()}</td>
              <td>
                <button onClick={nextPage}>🡺</button>
              </td>
              </>
              )
              : (
                <>
                <td class="pageButton">
              </td>
              <td>{displayResNumber()}</td>
              <td>
                <button onClick={nextPage}>🡺</button>
              </td>
              </>
              )     
               }
            </tr>
          </tbody>
        </table>
        
      </div> 
      </>
        ) : null }
    </div>
  )
}

export default App
