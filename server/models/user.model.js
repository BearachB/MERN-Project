const mongoose = require('mongoose')

// Definition of the user schema
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String},
    bio: { type: String},
  },
  { collection: 'user-data' },
)

const model = mongoose.model('UserData', User)

module.exports = model