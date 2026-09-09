import express from "express";
import showController from "../controllers/show.controller.js";
import validate from "../middleware/validate.middleware.js";
import { showSchema,updateShowSchema  } from "../libs/schemas/show.schema.js";

const router=express.Router();

router.post("/",validate(showSchema), showController.createShow);
router.get("/", showController.getAllShows);
router.get("/:id", showController.findShowById);
router.put("/:id", validate(updateShowSchema),showController.updateShowById);
router.delete("/:id", showController.deleteShowById);

export default router;