import Movie from "../models/Movie.js";

const createMovie=async(data)=>{
    const movie=await Movie.create(data);
    return movie;
}

const getAllMovies=async()=>{
    const moviesList=await Movie.find();
    return moviesList;
}

const findMovieById=async(id)=>{
    const movie=await Movie.findById(id);
    return movie;
}

const updateMovieById=async(id, Data)=>{
    const updatedMovie=await Movie.findByIdAndUpdate(id,Data, {new:true})
    return updatedMovie;
}
const deleteMovieById = async (id) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    throw {
      status: 404,
      message: "Movie not found",
    };
  }

  await cloudinaryService.deleteFromCloudinary(movie.poster.publicId);

  await cloudinaryService.deleteFromCloudinary(movie.banner.publicId);

  await Movie.findByIdAndDelete(id);

  return {
    message: "Movie deleted successfully",
  };
};




export default {
    createMovie,
    getAllMovies,
    findMovieById,
    deleteMovieById,
    updateMovieById
}