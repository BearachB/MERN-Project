import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function App() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState('')

    const UploadImage = async (e) => {

        e.preventDefault()

        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','MernProject')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/webapps259/image/upload", {
            method: "POST",
            body:data
        })

        const file = await res.json()

        console.log(file)
        setImage(file.secure_url)
        setLoading(false)
    }

    const SaveImage = async (event) => {
        event.preventDefault()

        const res = await fetch('http://localhost:1337/api/profile-photo', {
        method: "PATCH",
        headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                image: image
              }),
        })
        console.log(image)
        const data = await res.json()
        console.log(data)
    
        if (data.status === 'ok') {
          navigate('/dashboard')
        }
      }



   return (

        <div>
            <h1>Upload image</h1>
            <input type="file" name="file" placeholder="upload an image " 
            onChange={UploadImage} />

            {
                loading?
                    <div></div>
                : (
                    <div>
                    <img src={image} alt={image} style = {{width:'300px'}} />
                    <button onClick={SaveImage}>Save Image</button>
                    </div>
                    
                )
            }
        </div>
   )


}

export default App;







    

    // const uploadImage = (files) => {
    //     const formData = new FormData()
    //     formData.append("file", files[0])
    //     formData.append('upload_preset', "MernProject")

    //     fetch("https://api.cloudinary.com/v1_1/webapps259/image/upload", {
    //         method: 'POST',
    //         body: formData
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //           if (data.secure_url !== '') {
    //             this.setState({
    //               uploadedFileCloudinaryUrl: data.secure_url
    //             });
    //           }
    //         })
    //         .catch(err => console.error(err))
    //     }
    

    // return <div>
    //     <input type="file" onChange={(event)=>{uploadImage(event.target.files)} }/>
    // </div>
