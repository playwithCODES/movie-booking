import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import Show from "../models/Show.js";

const createBooking = async (data) => {

  // 1. Check duplicate seat IDs
  const uniqueSeatIds = new Set(data.seatIds);

  if (uniqueSeatIds.size !== data.seatIds.length) {
    throw {
      status: 400,
      message: "Duplicate seats are not allowed",
    };
  }

  // 2. Find show
  const show = await Show.findById(data.showId);

  if (!show) {
    throw {
      status: 404,
      message: "Show not found",
    };
  }

  // 3. Check show is active
  if (show.isActive === false) {
    throw {
      status: 400,
      message: "Show is not active",
    };
  }

  // 4. Find requested seats
  const seats = await Seat.find({
    _id: { $in: data.seatIds },
  });

  // 5. Make sure all requested seats exist
  if (seats.length !== data.seatIds.length) {
    throw {
      status: 400,
      message: "One or more seats not found",
    };
  }

  // 6. Check all seats are available
  const allSeatsAvailable = seats.every(
    (seat) => seat.status === "AVAILABLE"
  );

  if (!allSeatsAvailable) {
    throw {
      status: 400,
      message: "One or more seats are not available",
    };
  }

  // 7. Check seats belong to show's hall
  const allSeatsBelongToShowHall = seats.every(
    (seat) =>
      seat.hallId.toString() === show.hallId.toString()
  );

  if (!allSeatsBelongToShowHall) {
    throw {
      status: 400,
      message: "One or more seats do not belong to this show's hall",
    };
  }

  // 8. Calculate total amount
  let totalAmount = 0;

  for (const seat of seats) {

    if (seat.category === "SILVER") {
      totalAmount += show.silverPrice;
    }

    if (seat.category === "GOLD") {
      totalAmount += show.goldPrice;
    }

    if (seat.category === "PLATINUM") {
      totalAmount += show.platinumPrice;
    }
  }

  // 9. Generate booking code
  const bookingCode = `OMX-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;

  // 10. Booking expiry
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // 11. Create booking
  const booking = await Booking.create({
    userId: data.userId,
    showId: data.showId,
    seatIds: data.seatIds,
    totalAmount,
    status: "PENDING",
    bookingCode,
    expiresAt,
  });

  return booking;
};

const getAllBookings = () => {};

const getBookingById = () => {};

const getMyBookings = () => {};

const updateBookingById = () => {};

const cancelBooking = () => {};

const deleteBookingById = () => {};

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBookingById,
  cancelBooking,
  deleteBookingById,
};
