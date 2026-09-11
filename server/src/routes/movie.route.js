import express from "express";
import movieController from "../controllers/movie.controller.js";
import validate from "../middleware/validate.middleware.js";
import { movieSchema,updateMovieSchema } from "../libs/schemas/movie.schema.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleBasedAuth from "../middleware/role.middleware.js";
import { ROLE_ADMIN } from "../constants/roles.js";


const router = express.Router();
router.post("/", authMiddleware,roleBasedAuth(ROLE_ADMIN), validate(movieSchema),movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/error-test", (req, res, next) => {
  next(new Error("Testing error middleware"));
});
router.get("/:id", movieController.findMovieById);
router.put("/:id",authMiddleware,roleBasedAuth(ROLE_ADMIN),validate(updateMovieSchema),movieController.updateMovieById);
router.delete("/:id",authMiddleware,roleBasedAuth(ROLE_ADMIN) ,movieController.deleteMovieById);

export default router;
