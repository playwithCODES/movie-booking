import express from "express";
import ticketController from "../controllers/ticket.controller.js";

const router=express.Router();
router.get("/:id", ticketController.getTicketById);
export default router;