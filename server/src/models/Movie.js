import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  runtime: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
