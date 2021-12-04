const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Song = require('./models/song_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://bearach:mernproject@cluster0.d4sre.mongodb.net/mern_project?retryWrites=true&w=majority',
)

app.get('/api/songs', paginatedResults(), (req, res) => {
  res.json(res.paginatedResults)
})

// https://betterprogramming.pub/build-a-paginated-api-using-node-js-express-and-mongodb-227ed5dc2b4b
function paginatedResults() {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const results = {}
    try {
      results.results = await Song.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message: 'Error Occured' })
    }
  }
}

app.get('/api/songsearch', searchResults(), (req, res) => {
  res.json(res.searchResults)
})

function searchResults() {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const results = {}
    console.log("Search Term 111: ",req.query.searchTerm)
    let term = req.query.searchTerm
    // console.log("re.body here: ", req.body)
    // console.log("Term here: ", term)
    try {
      results.results = await Song.find({
        "$or":[
        {artist_name:{'$regex' : term, '$options' : 'i'}},
        {track_name:{'$regex' : term, '$options' : 'i'}},
        {genre:{'$regex' : term, '$options' : 'i'}}
      ]})
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec()
      res.searchResults = results
      // console.log(res.searchResults)
      next()

    } catch (e) {
      res.status(500).json({ message: 'Error Occured' })
    }
  }
}




// app.get("/api/allsongs", allResults(), (req, res) => {
//   res.json(res.paginatedResults);
// });

// // https://betterprogramming.pub/build-a-paginated-api-using-node-js-express-and-mongodb-227ed5dc2b4b
// function allResults() {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const skipIndex = (page - 1) * limit;
//     const results = {};
//     try {
//       results.results = await Song.find()
//         .sort({ _id: 1 })
//         .limit(limit)
//         .skip(skipIndex)
//         .exec();
//       res.paginatedResults = results;
//       next();
//     } catch (e) {
//       res.status(500).json({ message: "Error Occured" });
//     }
//   };
// }


// app.get('/api/allsongs', async (req, res) => {

//   try {
//     const results = await Song.find()

//     return res.json({ status: 'ok', bio: user.bio, image: user.image, favourites: user.favourites })
//   } catch (error) {
//     console.log(error)
//     res.json({ status: 'error', error: 'invalid token' })
//   }
// })


app.post('/api/register', async (req, res) => {
  console.log(req.body)
  try {
    const newPassword = await bcrypt.hash(req.body.password, 2)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' })
  }
})

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })

  if (!user) {
    return { status: 'error', error: 'Invalid login' }
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123',
    )

    return res.json({ status: 'ok', user: token })
  } else {
    return res.json({ status: 'error', user: false })
  }
})

app.get('/api/bio', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({ status: 'ok', bio: user.bio, image: user.image, favourites: user.favourites })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.post('/api/bio', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { bio: req.body.bio } })

    return res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// app.get('/api/bio', async (req, res) => {
//   const token = req.headers['x-access-token']

//   try {
//     const decoded = jwt.verify(token, 'secret123')
//     const email = decoded.email
//     const user = await User.findOne({ email: email })
//     console.log(user)

//     return res.json({ status: 'ok', bio: user.bio, photo: user.photo, favourites: user.favourites })
//   } catch (error) {
//     console.log(error)
//     res.json({ status: 'error', error: 'invalid token' })
//   }
// })

// update profile photo
app.patch('/api/profile-photo', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { image: req.body.image } })

    return res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// app.patch('/api/reset-password', async (req,res) => {
//   const token = req.headers['x-access-token']
//   console.log(token)
//   try{
//     const newPassword = await bcrypt.hash(req.body.password, 2)
//     // console.log(newPassword)

app.put('/api/reset-password', async (req, res) => {
  const token = req.headers['x-access-token']
  console.log(token)
  try {
    const newPassword = await bcrypt.hash(req.body.password, 15)
    console.log(newPassword)

    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { password: newPassword } })
    return res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

app.delete('/api/delete-profile', async (req, res) => {
  const token = req.headers['x-access-token']
  console.log(token)
  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOneAndDelete({ email: email })
    return res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

// post to favourites

app.patch('/api/addfavourite', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $push: { favourites: req.body.favourites } })
    console.log(req.body.favourites)
    return res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.patch('/api/removefavourite', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $pull: { favourites: req.body.favourites } })
    console.log(req.body.favourites)
    return res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.listen(1337, () => {
  console.log('Server started on 1337')
})
