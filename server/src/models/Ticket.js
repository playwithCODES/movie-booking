import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketCode: {
      type: String,
      required: true,
      unique: true,
    },

    qrCode: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "USED", "CANCELLED"],
      default: "ACTIVE",
    },

    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;