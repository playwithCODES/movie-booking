import mongoose from "mongoose";
const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

hallSchema.index(
    { cinemaId: 1, name: 1 },
    { unique: true }
);

const Hall = mongoose.model("Hall", hallSchema);
export default Hall;