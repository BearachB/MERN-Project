const mongoose = require('mongoose')

// Definition of the user schema
const Song = new mongoose.Schema(
  {
    genre: {type: String, text: true},
    artist_name: {type: String, text: true},
    track_name: {type: String, text: true},
    track_id: {type: String, text: true},
    popularity: {type: Number, text: true},
    acousticness: {type: Number, text: true},
    danceability: {type: Number, text: true},
    duration_ms: {type: Number, text: true},
    energy: {type: Number, text: true},
    instrumentalness: {type: Number, text: true},
    key: {type: String, text: true},
    liveness: {type: Number, text: true},
    loudness: {type: Number, text: true},
    mode: {type: String, text: true},
    speechiness: {type: Number, text: true},
    tempo: {type: Number, text: true}
  },
  { collection: 'music_data' },
)

const model = mongoose.model('SongData', Song)

module.exports = model