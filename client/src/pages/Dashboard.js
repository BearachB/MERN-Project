import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import photo from './photos/blank_male_profile_pic.jpg'

const Dashboard = () => {
  const navigate = useNavigate()
  const [quote, setQuote] = useState('')
  const [tempQuote, setTempQuote] = useState('')

  const [photo, setPhoto] = useState('')

  async function populateQuote() {
    const req = await fetch('http://localhost:1337/api/quote', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setQuote(data.quote)
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        navigate('../login/', { replace: true })
      } else {
        populateQuote()
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

  async function updateQuote(event) {
    event.preventDefault()

    const req = await fetch('http://localhost:1337/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setQuote(tempQuote)
      setTempQuote('')
    } else {
      alert(data.error)
    }
  }

  function handleLogOut() {
    localStorage.setItem('token', '')
    localStorage.clear()
    navigate('../login/', { replace: true })
  }


  function handleDelete() {
    localStorage.setItem('token', '')
    localStorage.clear()
    navigate('../login/', { replace: true })
  }

  return (
    <div>
      <h1>Your Bio: {quote || 'No quote found'}</h1>
      <form id='bio_form' onSubmit={updateQuote}>
        <input
          id='bio_input'
          type="text"
          placeholder="Bio"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        {/* <input type="submit" value="Update quote" /> */}
      </form>
      <button type="button" onClick={updateQuote}>Update Quote</button>
      <br/>
      <button type="button" onClick={handleLogOut}>Log Out</button>
      <br/>
      <button type="button" onClick={() => alert("Edit Account Information")}>Edit Account Information</button>
      <br/>
      <button type="button" onClick={() => alert("Delete Account Button Pressed")}>Delete Account</button>
    </div>
  )
}

export default Dashboard
