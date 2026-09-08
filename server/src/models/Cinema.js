import mongoose from "mongoose";

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique:true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
export default Cinema;
