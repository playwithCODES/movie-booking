import express from "express";
import paymentController from "../controllers/payment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router=express.Router();
router.post("/", authMiddleware,paymentController.createPayment);
router.post("/:id/confirm", authMiddleware, paymentController.confirmPayment);
export default router;