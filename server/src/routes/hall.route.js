import express from "express";
import hallController from "../controllers/hall.controller.js";
import validate from "../middleware/validate.middleware.js";
import { hallSchema } from "../libs/schemas/hall.schema.js";
import { updateHallSchema } from "../libs/schemas/updateHallSchema.js";

const router=express.Router();
router.post("/",validate(hallSchema), hallController.createHall);
router.get("/", hallController.getAllHalls);
router.get("/:id", hallController.findHallById);
router.put("/:id",validate(updateHallSchema), hallController.updateHallById);
router.delete("/:id", hallController.deleteHallById);

export default router;