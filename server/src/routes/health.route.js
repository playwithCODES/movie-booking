import express from "express";
const router=express.Router();
import healthController from "../controllers/health.controller.js";

router.get("/healthPage", healthController.healthCheckUp);

export default router;