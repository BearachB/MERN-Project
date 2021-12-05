import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate()
  const [bio, setBio] = useState('')
  const [tempBio, setTempBio] = useState('')

  const [photo, setPhoto] = useState('')


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
// fetch image to display
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
        navigate('../login', { replace: true })
      } else {
        populateBio()
      }
    }
  })

  
// update the bio
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
      setBio(tempBio) // set state
      setTempBio('') // set to ""
    } else {
      alert(data.error)
    }
  }

  return (
    <div>
      <br />
      <br />
      <h1>Edit Profile</h1>
      <img
        src={photo}
        alt={photo}
        width="200"
        style={{ borderRadius: '300px' }}
      />
      <br />
      <br />
      <Link to="/photos">
        <button class="btn-primary">Change Profile Picture</button>
      </Link>
      <br />

      <h2>Your Bio: {bio || "You haven't added a bio yet. Add one below!"}</h2>
      <br />

      <form onSubmit={updateBio}>
        <input
          class="searchBox"
          type="text"
          placeholder="Tell Us About Yourself"
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
        />
        <br />
        <input class="btn btn-primary" type="submit" value="Update bio" />
      </form>
      <br />
      <h2>Reset password</h2>
      <Link to="/reset-password">
        <button class="btn-primary">Reset Password</button>
      </Link>
      <br />
      <br />
      <br />
    </div>
  )
}

export default EditProfile
