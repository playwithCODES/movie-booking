import express from "express";
import discountController from "../controllers/discount.controller.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import roleBasedAuth from "../middleware/role.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { discountRuleSchema, updateDiscountRuleSchema } from "../libs/schemas/discount.schema.js";

const router = express.Router();
router.post(
  "/",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  validate(discountRuleSchema),
  discountController.createDiscount,
);
router.get(
  "/",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),

  discountController.getAllDiscountList,
);
router.get(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  discountController.findDiscountRuleById,
);
router.put(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  validate(updateDiscountRuleSchema),
  discountController.updateDiscountRuleById,
);
router.delete(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  discountController.deleteDiscountRuleById,
);

export default router;
