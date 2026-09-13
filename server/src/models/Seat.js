import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  seatNumber: {
    required: true,
    type: String,
  },
  row: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"SeatCategory",
    required: true,
     },
     
  status: {
    type: String,
    required: true,
    enum: ["AVAILABLE", "MAINTENANCE","UNAVAILABLE"],
  },
});

seatSchema.index({ hallId: 1, seatNumber: 1 }, { unique: true });
const Seat = mongoose.model("Seat", seatSchema);
export default Seat;
