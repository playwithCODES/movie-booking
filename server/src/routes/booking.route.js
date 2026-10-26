import express from "express";

import bookingController from "../controllers/booking.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import roleBasedAuth from "../middleware/role.middleware.js";

import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";

const router = express.Router();

// Create booking → Logged-in users
router.post(
  "/",
  authMiddleware,
  bookingController.createBooking
);

// Get all bookings → Admin only
router.get(
  "/",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  bookingController.getAllBookings
);

// Get my bookings → Logged-in users
router.get(
  "/my-bookings",
  authMiddleware,
  roleBasedAuth(ROLE_USER),
  bookingController.getMyBookings
);

// Get booking by ID → User/Admin
router.get(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN, ROLE_USER),
  bookingController.getBookingById
);

// Update booking → Admin only
router.put(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  bookingController.updateBookingById
);

// Cancel booking → User/Admin
router.post(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN, ROLE_USER),
  bookingController.cancelBooking
);

// Delete booking → Admin only
router.delete(
  "/:id",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  bookingController.deleteBookingById
);


// Verify booking using QR booking code → Admin only
router.get(
  "/verify/:bookingCode",
  authMiddleware,
  roleBasedAuth(ROLE_ADMIN),
  bookingController.verifyBookingByCode
);
export default router;