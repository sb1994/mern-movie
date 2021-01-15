const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "movies",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Create Movie Schema
const MovieSchema = new Schema({
  title: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  budget: {
    type: Number,
  },
  cast: [],
  crew: [],
  homepage: {
    type: String,
  },

  videos: [],
  text: {
    type: String,
  },
  genres: [{ id: { type: String }, name: { type: String } }],
  watched: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      review: { type: String },
      movie: { type: Schema.Types.ObjectId, ref: "movies" },
      rating: { type: String },
      created: { default: Date.now },
    },
  ],
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  tmdb_id: {
    type: String,
  },
  imdb_id: {
    type: String,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  revenue: {
    type: Number,
  },
  runtime: {
    type: Number,
  },
  status: {
    type: String,
  },
  tagline: {
    type: String,
  },
  vote_average: {
    type: String,
  },
});
module.exports = Movie = mongoose.model("movies", MovieSchema);
