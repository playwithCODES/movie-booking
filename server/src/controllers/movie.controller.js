import movieService from "../services/movie.service.js"

const createMovie=async(req, res)=>{
  const Movie=await movieService.createMovie(req.body);
  res.json(Movie);
}

const getAllMovies=async(req, res)=>{
    const moviesList=await movieService.getAllMovies();
    res.json(moviesList);
}

const findMovieById=async(req, res)=>{
    const movie=await movieService.findMovieById(req.params.id)
    res.send(movie);
}

const updateMovieById=async(req, res)=>{
    const updatedMovie=await movieService.updateMovieById(req.params.id,req.body);
    res.json(updatedMovie);
}


const deleteMovieById=async(req,res)=>{
    const result=await movieService.deleteMovieById(req.params.id);
    res.json(result);
}

export default{
    createMovie,
    getAllMovies,
    findMovieById,
    updateMovieById,
    deleteMovieById
}