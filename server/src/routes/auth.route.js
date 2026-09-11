import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";
import {userSchema } from "../libs/schemas/user.schema.js"
import { forgotPasswordSchema, loginSchema, resetPasswordBodySchema, resetPasswordQuerySchema } from "../libs/schemas/auth.schema.js";

const router=express.Router();
router.post("/register",validate(userSchema), authController.register);
router.post("/login", validate(loginSchema),authController.login);
router.post("/forgot-password",validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password",validate(resetPasswordQuerySchema, "query"), validate(resetPasswordBodySchema, "body"), authController.resetPassword);


export default router;