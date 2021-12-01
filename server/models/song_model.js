const mongoose = require('mongoose')

// Definition of the user schema
const Song = new mongoose.Schema(
  {
    genre: {type: String},
    artist_name: {type: String},
    track_name: {type: String},
    track_id: {type: String},
    popularity: {type: Number},
    acousticness: {type: Number},
    danceability: {type: Number},
    duration_ms: {type: Number},
    energy: {type: Number},
    instrumentalness: {type: Number},
    key: {type: String},
    liveness: {type: Number},
    loudness: {type: Number},
    mode: {type: String},
    speechiness: {type: Number},
    tempo: {type: Number}
  },
  { collection: 'music_data' },
)

const model = mongoose.model('SongData', Song)

module.exports = model