const mongoose = require('mongoose')

// Definition of the user schema
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String},
    image: {type: String, default: "https://res.cloudinary.com/webapps259/image/upload/v1638360127/mernproject/uvpdztcmvjjblahgpfru.jpg"
  }
  },
  { collection: 'user-data' },
)

const model = mongoose.model('UserData', User)

module.exports = model