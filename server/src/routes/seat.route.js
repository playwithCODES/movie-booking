import express from "express";
import seatController from "../controllers/seat.controller.js";
import { seatSchema } from "../libs/schemas/seat.schema.js";
import { updateSeatSchema } from "../libs/schemas/updateSeatSchema.js";
import validate from "../middleware/validate.middleware.js";

const router=express.Router();

router.post("/",validate(seatSchema), seatController.createSeat);
router.get("/", seatController.getAllSeats);
router.get("/:id", seatController.findSeatById);
router.put("/:id",validate(updateSeatSchema) ,seatController.updateSeatById);
router.delete("/:id", seatController.deleteSeatById);

export default router;