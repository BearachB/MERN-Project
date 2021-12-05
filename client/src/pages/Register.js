import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // post fetch to register, send email, password and name

  async function registerUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login')
    }
  }

  return (
    <div class="profile-content">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          class="btn btn-primary"
          value={name}
          onChange={(e) => setName(e.target.value)}  // input is set as nanme
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          class="btn btn-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          class="btn btn-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <br />
        <br />
        <input class="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  )
}

export default App
