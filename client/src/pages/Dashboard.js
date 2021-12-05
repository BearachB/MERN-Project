import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
 
  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')

  // fetch bio to display
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



// fetch profile photo to display
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


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('../login/', { replace: true })
      } else {
        populateBio()
      }
    }
  })

  // fetch name to display
  async function getName() {
    const req = await fetch('http://localhost:1337/api/bio', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setName(data.name)
    } else {
      alert(data.error)
    }
  }
  getName()


// delete the profile
  async function  handleDelete(event) {

    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/delete-profile', {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    const data = await response.json()
    if (data.status === 'ok') {
      localStorage.clear()  // clear token
      navigate('../login/', { replace: true })
    }
  }

  return (
    <div class="profile-content">
      <h1>Hello  {name || 'No bio found'}</h1>
      <img src={photo} alt={photo} width="200" style={{'borderRadius':'300px'}}/>
      <br/>
      <br/>
      <p id="dashboardBio">{bio || "You have not written a bio yet. Click Update Profile below to add one!"}</p>
      <br/>
      <Link to="/editprofile"><button class="btn btn-primary">Update Profile</button></Link>
      <br/>
      <button class="btn btn-primary" type="button" onClick={handleDelete}>Delete Account</button>
    </div>
  )
  }

export default Dashboard