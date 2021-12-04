import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const EditProfile = () => {

    const navigate = useNavigate()
    const [bio, setBio] = useState('')
    const [tempBio, setTempBio] = useState('')
    const [password, setPassword] = useState('')
    const [photo, setPhoto] = useState('')

    async function populateBio() {
       const req = await fetch('http://localhost:1337/api/bio', {
           headers: {
               'x-access-token': localStorage.getItem('token')
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
        
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if(!user) {
                localStorage.removeItem('token')
                navigate('../login', {replace: true})
            } else {
                populateBio()

            }
        }
    })

    async function resetPassword(event) {
        event.preventDefault()
        console.log(password)
    
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
        console.log(data.status)
    
        if (data.status === 'ok') {
          navigate('/editprofile')
        }
      }

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
    if(data.status === 'ok') {
        setBio(tempBio)
        setTempBio('')
    } else {
        alert(data.error)
    }
 }

    return ( 


    <div>
        <h1>Edit Profile</h1>
        <img src={photo} alt={photo} width="100" style={{'borderRadius':'200px'}}/><br/>
        <Link to="/photos"><button>Change Profile Picture</button></Link>
        <h1>Your Bio: {bio || "You haven't added a bio yet. Add one below"}</h1>  
        <form onSubmit={updateBio}>
            <input 
                type="text"
                placeholder="Tell Us About Yourself" 
                value={tempBio} 
                onChange={(e) => setTempBio(e.target.value) }
            />
            <input type="submit" value="Update bio" />
        </form>
        <h1>Reset password</h1>
        <Link to="/reset-password"><button>Reset Password</button></Link>
    
    </div>
    ) 

}

export default EditProfile