const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema; 
// const Song = require('./song_model')
// Definition of the user schema
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String},
    dob : {type: Date},
    phoneNo: {type: Number},
    image: {type: String, default: "https://res.cloudinary.com/webapps259/image/upload/v1638360127/mernproject/uvpdztcmvjjblahgpfru.jpg"},
    // t: {type: String, default:"t"},
    favourites: [{type: ObjectId, ref: "SongData"}]
  
  },
  { collection: 'user_data' },
)

const model = mongoose.model('UserData', User)

module.exports = model