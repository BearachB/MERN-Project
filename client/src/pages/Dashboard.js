import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate, Link } from 'react-router-dom'


const Dashboard = () => {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
  const [tempBio, setTempBio] = useState('')
  const [photo, setPhoto] = useState('')

  async function populateBio() {
    const req = await fetch('http://localhost:1337/api/bio', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setBio(data.bio)
    } else {
      alert(data.error)
    }
  }

  async function loadImage() {
    const req = await fetch('http://localhost:1337/api/bio', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setPhoto(data.image)
      
    } else {
      alert(data.error)
    }
  }
loadImage()
// console.log(photo)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('../login/', { replace: true })
      } else {
        populateBio()
        // updatePhoto()
      }
    }
  })

  // async function updatePhoto(event) {
  //   event.preventDefault()
  //   const req = await fetch('http://localhost:1337/api/quote', {
  //     method: 'POST',
  //     headers: {
  //       'x-access-token': localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({
  //       quote: tempQuote,
  //     }),
  //   })

  async function updateBio(event) {
    event.preventDefault()

    const req = await fetch('http://localhost:1337/api/bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        bio: tempBio,
      }),
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setBio(tempBio)
      setTempBio('')
    } else {
      alert(data.error)
    }
  }

  function handleLogOut() {
    localStorage.setItem('token', '')
    localStorage.clear()
    navigate('../login/', { replace: true })
  }


  async function  handleDelete(event) {

    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/delete-profile', {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })

    const data = await response.json()
    console.log(data.status)

    if (data.status === 'ok') {
      localStorage.clear()
      navigate('../login/', { replace: true })
    }
  }


  

  return (
    <div>
      <h1>Your Bio: {bio || 'No bio found'}</h1>
      <img src={photo} alt={photo} width="100"  style={{'borderRadius':'200px'}}/>
      <form id='bio_form' onSubmit={updateBio}>
        <input
          id='bio_input'
          type="text"
          placeholder="Bio"
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
        />
        {/* <input type="submit" value="Update quote" /> */}
      </form>
      <button type="button" onClick={updateBio}>Update Bio</button>
      <br/>
      <button type="button" onClick={handleLogOut}>Log Out</button>
      <br/>
      <Link to="/editprofile"><button>Update Profile</button></Link>
      {/* <button type="button" onClick={() => alert("Edit Account Information")}>Edit Account Information</button> */}
      <br/>
      <button type="button" onClick={handleDelete}>Delete Account</button>
    </div>
  )
  }

export default Dashboard
