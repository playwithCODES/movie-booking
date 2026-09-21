import express from "express";
import paymentController from "../controllers/payment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { verifyKhaltiPayment } from "../utils/payment.js";

const router = express.Router();

router.post("/", authMiddleware, paymentController.createPayment);

router.post(
  "/:id/confirm",
  authMiddleware,
  paymentController.confirmPayment,
);

router.get("/return-page", async (req, res, next) => {
  try {
    const { pidx } = req.query;

    if (!pidx) {
      return res.status(400).json({
        message: "pidx is required",
      });
    }

    const result = await verifyKhaltiPayment(pidx);

    console.log("Khalti verification:", result);

    return res.json({
      message: "Payment verified",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;