import movieService from "../services/movie.service.js";
import cloudinaryService from "../services/cloudinary.service.js";

const createMovie = async (req, res) => {
  try {
    const posterResult = await cloudinaryService.uploadToCloudinary(
      req.files.poster[0].buffer,
    );

    const bannerResult = await cloudinaryService.uploadToCloudinary(
      req.files.banner[0].buffer,
    );

    const movieData = {
      ...req.body,
      poster: {
        url: posterResult.secure_url,
        publicId: posterResult.public_id,
      },
      banner: {
        url: bannerResult.secure_url,
        publicId: bannerResult.public_id,
      },
    };

    console.log(posterResult);

    const movie = await movieService.createMovie(movieData);

    res.json(movie);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};
const getAllMovies = async (req, res) => {
  const moviesList = await movieService.getAllMovies();
  res.json(moviesList);
};

const findMovieById = async (req, res) => {
  const movie = await movieService.findMovieById(req.params.id);
  res.send(movie);
};

const updateMovieById = async (req, res) => {
  const movieData = {
    ...req.body,
  };

  if (req.files?.poster) {
    const posterResult = await cloudinaryService.uploadToCloudinary(
      req.files.poster[0].buffer,
    );

    movieData.poster = {
      url: posterResult.secure_url,
      publicId: posterResult.public_id,
    };
  }
  if (req.files?.banner) {
    const bannerResult = await cloudinaryService.uploadToCloudinary(
      req.files.banner[0].buffer,
    );
    movieData.banner = {
      url: bannerResult.secure_url,
      publicId: bannerResult.public_id,
    };
  }
  const updatedMovie = await movieService.updateMovieById(
    req.params.id,
    movieData,
  );
  res.json(updatedMovie);
};

const deleteMovieById = async (req, res) => {
  const result = await movieService.deleteMovieById(req.params.id);
  res.json(result);
};

export default {
  createMovie,
  getAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
};
