import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleBasedAuth from "../middleware/role.middleware.js";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";

const router = express.Router();
router.post("/",authMiddleware,roleBasedAuth(ROLE_ADMIN) ,userController.createUser);
router.get("/",authMiddleware, roleBasedAuth(ROLE_ADMIN), userController.getAllUsers);
router.get("/me", authMiddleware, userController.getMe);
router.put("/me",authMiddleware, userController.updateMyProfile);
router.get("/email",authMiddleware, roleBasedAuth(ROLE_ADMIN) ,userController.findUserByEmail);

router.get("/:id",authMiddleware, roleBasedAuth(ROLE_ADMIN), userController.findUserById);
router.put("/:id",authMiddleware, roleBasedAuth(ROLE_ADMIN), userController.updateUserById);
router.delete("/:id",authMiddleware, roleBasedAuth(ROLE_ADMIN), userController.deleteUserById);

export default router;
