import React, { useState } from 'react'
// import Pagination from '../components/Pagination'

function App() {
  const [songs, setSongs] = useState([])
  let [page, setPage] = useState(1)

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const displayResNumber = () => {
    const showRes = ' Showing Results: '
    if (page == 1) {
      return <p> {showRes}1-100 of 1,000</p>
    }
    if (page == 2) {
      return <p> {showRes}100-200 of 1,000</p>
    }
    if (page == 3) {
      return <p> {showRes}200-300 of 1,000</p>
    }
    if (page == 4) {
      return <p> {showRes}300-400 of 1,000</p>
    }
    if (page == 5) {
      return <p> {showRes}400-500 of 1,000</p>
    }
    if (page == 6) {
      return <p> {showRes}500-600 of 1,000</p>
    }
    if (page == 7) {
      return <p> {showRes}600-700 of 1,000</p>
    }
    if (page == 8) {
      return <p> {showRes}700-800 of 1,000</p>
    }
    if (page == 9) {
      return <p> {showRes}800-900 of 1,000</p>
    }
    if (page == 10) {
      return <p> {showRes}900-1,000 of 1,000</p>
    }
  }

  const fetchSongs = async () => {
    const result = await fetch(
      `http://localhost:1337/api/songs?page=${page}&limit=100`,
    )
    const data = await result.json()

    setSongs(data.results)
  }
  fetchSongs()

  return (
    // Main container for the results
    <div className="container">
      <h1>Song List</h1>
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
        {/* Table head */}
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
      <div id="resultsPages">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td class="pageButton">
                <button onClick={previousPage}>🡸</button>
              </td>
              <td>{displayResNumber()}</td>
              <td>
                <button onClick={nextPage}>🡺</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
