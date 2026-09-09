import express from "express";
import movieController from "../controllers/movie.controller.js";
import validate from "../middleware/validate.middleware.js";
import { movieSchema,updateMovieSchema } from "../libs/schemas/movie.schema.js";
const router = express.Router();
router.post("/", validate(movieSchema), movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/error-test", (req, res, next) => {
  next(new Error("Testing error middleware"));
});
router.get("/:id", movieController.findMovieById);
router.put("/:id",validate(updateMovieSchema),movieController.updateMovieById);
router.delete("/:id", movieController.deleteMovieById);

export default router;
