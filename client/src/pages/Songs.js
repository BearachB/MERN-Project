import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [songs, setSongs] = useState([])

  const fetchSongs = async () => {
    const result = await axios(`http://localhost:1337/api/songs`)
    setSongs(result.data['song'])
    // console.log(songs)
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
          </tr>
        </thead>
        <tbody>
          {songs.map((info) => (
            <tr>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td>{info.popularity}</td>
              <td>{info.genre}</td>
              <td>{info.track_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// function App() {

//   // const [items, setItems] = useState('')
//   // const [songs, setSongs] = useState('')

//   // async function listSongs(event) {
//   //   event.preventDefault()
//   //   const response = await fetch('http://localhost:1337/api/songs', {
//   //     method: 'GET',
//   //     headers: {
//   //       // 'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({

//   //     }),
//   //   })
//   //   const data = await response.json()

//   //   if (data.user) {
//   //     alert('Data fetched')
//   //     setSongs(data.songs)
//   //     // window.location.href = '/dashboard'
//   //     return data
//   //   } else {
//   //     alert('Error')
//   //   }
//   // }

//   return (
//     <div>
//       <h1>Songs</h1>
//       <br />
//       <p>Songs here:{songs[0]}</p>
//       <br />
//     </div>
//   )
// }

export default App
