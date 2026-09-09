import express from "express";
import cinemaController from "../controllers/cinema.controller.js";
import validate from "../middleware/validate.middleware.js";
import { cinemaSchema, updateCinemaSchema } from "../libs/schemas/cinema.schema.js";

const router=express.Router();

router.post("/",validate(cinemaSchema),cinemaController.createCinema);
router.get("/", cinemaController.getAllCinemas);
router.get("/:id", cinemaController.findCinemaById);
router.put("/:id",validate(updateCinemaSchema), cinemaController.updateCinemaById);
router.delete("/:id", cinemaController.deleteCinemaById);

export default router;



