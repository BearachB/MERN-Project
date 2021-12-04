import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  async function resetPassword(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/reset-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        password
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      alert("Password Reset!")
      navigate('/editprofile')
    }
  }

  return (
    <div class="profile-content">
      <h1>Reset</h1>
      <form onSubmit={resetPassword}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Reset" />
      </form>
    </div>
  )
}

export default App






















// function App() {
//   // const navigate = useNavigate()
//   const navigate = useNavigate()

//   const [password, setPassword] = useState('')

//   async function resetPassword(event) {
//     event.preventDefault()

//     const response = await fetch('http://localhost:1337/api/reset-password', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         password
//       }),
//     })

//     const data = await response.json()

//     if (data.status === 'ok') {
//       navigate('/login')
//     }
//   }


//   return
//     (
//       <div>
//         <h1>Reset</h1>
//         <form onSubmit={resetPassword}>
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//           />
//           <input type="submit" value="Reset" />
//         </form>
//       </div>
//     )
// }

//   export default App