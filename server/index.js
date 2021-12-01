const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Song = require('./models/song_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())

// mongoose.connect('mongodb+srv://bearach:mernproject@cluster0.d4sre.mongodb.net/mern_project?retryWrites=true&w=majority')

mongoose.connect('mongodb://localhost:27017/full-mern-stack')

app.get('/api/songs', async (req, res) => {
  try {
    const song = await Song.find({},)
    // console.log(song)
    // console.log({song:artist_name})
    return res.json({ status: 'ok', song })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: "Can't get songs" })
  }
})

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

    return res.json({ status: 'ok', bio: user.bio, image: user.image })
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

app.get('/api/bio', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({ status: 'ok', bio: user.bio, photo: user.photo })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})


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

app.patch('/api/reset-password', async (req,res) => {
  const token = req.headers['x-access-token']
  console.log(token)
  try{
    const newPassword = await bcrypt.hash(req.body.password, 2)
    // console.log(newPassword)

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

app.listen(1337, () => {
  console.log('Server started on 1337')
})
