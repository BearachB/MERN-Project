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

mongoose.connect(   // mongoose connection
  'mongodb+srv://bearach:mernproject@cluster0.d4sre.mongodb.net/mern_project?retryWrites=true&w=majority',
)
// get songs form db
app.get('/api/songs', paginatedResults(), (req, res) => {
  res.json(res.paginatedResults)
})

// Pagination method taken from below:
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


// get request for search page
app.get('/api/songsearch', searchResults(), (req, res) => {
  res.json(res.searchResults)
})

function searchResults() {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const results = {}

    let term = req.query.searchTerm    //term is what the user entered
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
     
      next()

    } catch (e) {
      res.status(500).json({ message: 'Error Occured' })
    }
  }
}

// post request for registering
app.post('/api/register', async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 2)  // hash the password
    await User.create({    // create a user with below attributes
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' })
  }
})

// post request for login
app.post('/api/login', async (req, res) => {
  try{
  const user = await User.findOne({
    email: req.body.email,
  })

// compare hashed passwords
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password) 

  // if password correct assign token to local storage
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123',
    )
    return res.json({ status: 'ok', user: token })
  }} catch (err) {
     res.json({ status: 'error', error: 'Invalid login', user: false })
  }
})

// get request for user info
app.get('/api/bio', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({ status: 'ok', bio: user.bio, image: user.image, favourites: user.favourites, name: user.name })
  } catch (error) {
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// post request to update bio
app.post('/api/bio', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { bio: req.body.bio } })

    return res.json({ status: 'ok' })
  } catch (error) {
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// Update profile photo
app.patch('/api/profile-photo', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { image: req.body.image } })

    return res.json({ status: 'ok' })
  } catch (error) {
 
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// patch request for updating password
app.patch('/api/reset-password', async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const newPassword = await bcrypt.hash(req.body.password, 15)

    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { password: newPassword } })
    return res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

// delete request for deleting profile
app.delete('/api/delete-profile', async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOneAndDelete({ email: email })
    return res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error' })
  }
})

// Add to favourites
app.patch('/api/addfavourite', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $push: { favourites: req.body.favourites } })
    return res.json({ status: 'ok' })
  } catch (error) {
    res.json({ status: 'error', error: 'invalid token' })
  }
})

// Remove from favourites
app.patch('/api/removefavourite', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    await User.updateOne({ email: email }, { $pull: { favourites: req.body.favourites } })
    return res.json({ status: 'ok' })
  } catch (error) {
   
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.listen(1337, () => {
  console.log('Server started on 1337')
})
