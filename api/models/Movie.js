const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
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
  homepage: {
    type: String,
  },
  text: {
    type: String,
  },
  genres: [{ id: { type: String }, name: { type: String } }],
  watched: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  reviews: [{ user: { type: Schema.Types.ObjectId, ref: "reviews" } }],
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      rating: { type: Schema.Types.Number },
    },
  ],
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
