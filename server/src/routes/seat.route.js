import express from "express";
import seatController from "../controllers/seat.controller.js";
import { seatSchema,updateSeatSchema  } from "../libs/schemas/seat.schema.js";
import validate from "../middleware/validate.middleware.js";

const router=express.Router();

router.post("/",validate(seatSchema), seatController.createSeat);
router.get("/", seatController.getAllSeats);
router.post("/multipleSeats",seatController.createMultipleSeats);
router.get("/:id", seatController.findSeatById);
router.put("/:id",validate(updateSeatSchema) ,seatController.updateSeatById);
router.delete("/:id", seatController.deleteSeatById);

export default router;