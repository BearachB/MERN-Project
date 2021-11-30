import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {

    const history = useNavigate()
    const [bio, setBio] = useState('')
    const [tempBio, setTempBio] = useState('')
    
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

        
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if(!user) {
                localStorage.removeItem('token')
                history('../login', {replace: true})
            } else {
                populateBio()

            }
        }
    })

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
        <h1>Your bio: {bio || 'No bio found'}</h1>
        
        <form onSubmit={updateBio}>
            <input 
                type="text"
                placeholder="Bio" 
                value={tempBio} 
                onChange={(e) => setTempBio(e.target.value) }
            />
            <input type="submit" value="Update bio" />
        </form>
    
    
    </div>
    ) 

}

export default EditProfile