import React, { useState, useEffect } from 'react'

function FavPage() {
  const [songs, setSongs] = useState([])
  const [favourites, setFavourites] = useState([])
  const [isLoaded, setisLoaded] = useState(false)
 


  const fetchSongs = async () => {   // get songs from DB
    const result = await fetch(
      'http://localhost:1337/api/songs?page=1&limit=100',
    )
    const data = await result.json()

    setSongs(data.results)
    setisLoaded(true) // so it loads together
  }


  const fetchFavourites = async () => { // get favourites from db
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



// patch request to change favourites when one is removed
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

// page loads every time favourites is changed
useEffect(() =>{
 
  fetchFavourites()
  
},[favourites])
 

 // get songs
fetchSongs()




  
  return (
    // Main container for the results
    <div className="container">
      <u><h1>Favourites</h1></u>
      { isLoaded ? (                // show all when loaded
        favourites.length !==0 ? (   // only show if tere are favourites in list
        <>
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
        {/* Table head */}
        <tbody>
          {songs.map((info) => {  // map to make table
            return (
            <tr>
              {(favourites.includes(info.track_name))? (  // if songs are in favourites
              <>
              <td>{info.artist_name}</td>
              <td>{info.track_name}</td>
              <td style={{textAlign:"center"}}>{info.popularity}</td>
              <td>{info.genre}</td>
              <td style={{textAlign:"center"}} onClick={() => removeFavourites(info.track_name)}>★</td>
              </>
              ): (<></>) }     
            </tr> )
            
          })}
        </tbody>
     </table>
  </>         // show if favuorites is empty
        ): <h2>You Have No Songs in Your Favourites. <br /> Try adding some by searching for songs.</h2>
        ) : null }
    </div>
  )
}

export default FavPage
