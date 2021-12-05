import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState('')


//  uplod selected image to cloudinary
  const UploadImage = async (e) => {
    e.preventDefault()

    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0]) // append the first file
    data.append('upload_preset', 'MernProject') // upload to mernproject folder in
    setLoading(true)
// fetch post request to upload to cloudinary
    const res = await fetch(   
      'https://api.cloudinary.com/v1_1/webapps259/image/upload',
      {
        method: 'POST',
        body: data,
      },
    )

    const file = await res.json()

    console.log(file)
    setImage(file.secure_url)
    setLoading(false)
  }

  // function to save image to database, patch to favourites array in user
  const SaveImage = async (event) => {
    event.preventDefault()

    const res = await fetch('http://localhost:1337/api/profile-photo', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        image: image,
      }),
    })
    
    const data = await res.json()
  

    if (data.status === 'ok') {
      navigate('/editprofile')
    }
  }

  return (
    <div class="profile-content">
      <h1>Upload image</h1>
      <br />
      <input
        class="btn-primary"
        type="file"
        name="file"
        placeholder="upload an image "
        onChange={UploadImage}
      />

      {loading ? (  // show save button when image has been uploaded to cloudinary
        <div>
          <br />
        </div>
      ) : (
        <div>
          <br />
          <img src={image} alt={image} style={{ width: '300px' }} />
          <br />
          <br />
          <button class="btn-primary" onClick={SaveImage}>
            Save Image
          </button>
        </div>
      )}
      <br />
      <br />
      <Link to="/editprofile">
        <button class="btn-primary">Back To Edit Profile</button>
      </Link>
    </div>
  )
}

export default App
