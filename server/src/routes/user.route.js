import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router=express.Router();
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/me", authMiddleware,userController.getMe);
router.get("/email", userController.findUserByEmail);
router.get("/:id", userController.findUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;