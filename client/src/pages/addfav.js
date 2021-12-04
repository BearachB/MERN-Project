import React, { useState, useEffect } from 'react'

function FavPage() {
  const [songs, setSongs] = useState([])
  // let [page, setPage] = useState(1)
  const [favourites, setFavourites] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
  const [showFavourites, setShowFavourites] = useState([])

  // const nextPage = () => {
  //   setPage(page + 1)
  // }

  // const previousPage = () => {
  //   setPage(page - 1)
  // }



  const fetchSongs = async () => {
    const result = await fetch(
      'http://localhost:1337/api/songs?page=1&limit=100',
    )
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

// const removeFavourites = async () => {/




useEffect(() =>{
 
  fetchFavourites()
  
},[favourites])
 
// useEffect(() => {
 
fetchSongs()

// },[page])


  
  return (
    // Main container for the results
    <div className="container">
      <h1>Favourites</h1>
      { isLoaded ? (
        favourites.length !==0 ? (
        <>
      <table>
        {/* Table head */}
        <thead>
          <tr>
            <th>Artist</th>
            <th>Track Name</th>
            <th>Popularity</th>
            <th>Genre</th>
            <th>Favourite(★)</th>
          </tr>
        </thead>
        {/* Table head */}
        <tbody>
          {songs.map((info) => {
            return (
            <tr>
              {(favourites.includes(info.track_name))? (
              <>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td>{info.popularity}</td>
              <td>{info.genre}</td>
              <td onClick={() => removeFavourites(info.track_name)}>★</td>
              </>
              ): (<></>) }     
            </tr> )
            
          })}
        </tbody>
     </table>
  </> 
        ): <h2>No Songs Match Your Search</h2>
        ) : null }
    </div>
  )
}

export default FavPage
