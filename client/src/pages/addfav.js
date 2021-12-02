
const Addtofav = () => {



const addsong = async (event) => {
    event.preventDefault()

    const res = await fetch('http://localhost:1337/api/addfavourite', {
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
    //   navigate('/dashboard')
    }
  }
}

return null