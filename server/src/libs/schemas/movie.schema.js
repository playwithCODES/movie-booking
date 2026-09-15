import {z} from "zod";

const movieSchema=z.object({
    name:z.string().min(1, "Movie name is required"),
    runtime:z.string().min(1,"Movie runtime is required"),
    description:z.string().min(1,"Movie description is needed"),
    genre:z.string().min(1,"Movie genre or category is required"),
    trailerLink:z.url(),
    releaseDate:z.coerce.date({error:"Movie release date is required"}),
  
})

const updateMovieSchema = movieSchema.partial();

export {movieSchema, updateMovieSchema};