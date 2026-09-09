import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        showId: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Show",
        },

        seatIds: {
            required: true,
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Seat",
        },

        totalAmount: {
            required: true,
            type: Number,
        },

        status: {
            required: true,
            type: String,
        },

        bookingCode: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;