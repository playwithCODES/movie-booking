import { movieSchema } from "./movie.schema.js";
const updateMovieSchema = movieSchema.partial();
export { movieSchema, updateMovieSchema };
