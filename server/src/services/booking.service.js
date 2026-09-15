import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import Show from "../models/Show.js";
import DiscountRule from "../models/DiscountRule.js";

const createBooking = async (data) => {
  // 1. Check duplicate seat IDs
  const uniqueSeatIds = new Set(data.seatIds);

  if (uniqueSeatIds.size !== data.seatIds.length) {
    throw {
      status: 400,
      message: "Duplicate seats are not allowed",
    };
  }

  const existingBooking = await Booking.findOne({
    showId: data.showId,
    seatIds: { $in: data.seatIds },
    status: { $in: ["PENDING", "CONFIRMED"] },
  });

  if (existingBooking) {
    throw {
      status: 409,
      message: "One or more selected seats are already booked for this show",
    };
  }

  // 2. Find show
  const show = await Show.findById(data.showId).populate("pricing.category");

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
  const allSeatsAvailable = seats.every((seat) => seat.status === "AVAILABLE");

  if (!allSeatsAvailable) {
    throw {
      status: 400,
      message: "One or more seats are not available",
    };
  }

  // 7. Check seats belong to show's hall
  const allSeatsBelongToShowHall = seats.every(
    (seat) => seat.hallId.toString() === show.hallId.toString(),
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
    const pricing = show.pricing.find(
      (item) => item.category._id.toString() === seat.category.toString(),
    );
    if (!pricing) {
      throw {
        status: 400,
        message: "Pricing not found for seat category",
      };
    }

    totalAmount += pricing.price;
  }

  // 9. Generate booking code
  const bookingCode = `OMX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  // 10. Booking expiry
  const expiresAt = new Date(Date.now() + 4 * 60 * 1000);

  //11. Discount Rule
  const discount = await DiscountRule.findOne({
    showIds: show._id,
    isActive: true,
  });

  if (discount) {
    const discountAmount = (totalAmount * discount.discountPercentage) / 100;
    totalAmount = totalAmount - discountAmount;
  }

  // 12. Create booking
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

const getAllBookings = async () => {
  const ALlBookingList = await Booking.find();
  return ALlBookingList;
};

const getBookingById = async (id, userId) => {
  const bookingId = await Booking.findOne({
    _id: id,
    userId: userId,
  });
  if (!bookingId)
    throw {
      message: "Booking Id not found",
    };
  return bookingId;
};

const getMyBookings = async (userId) => {
  const booking = await Booking.find({
    userId: userId,
  });
  return booking;
};

const updateBookingById = async (id, data) => {
  const booking = await Booking.findById(id);
  if (!booking)
    throw {
      status: 400,
      message: "booking doesn't exist",
    };
  const updatedBooking = await Booking.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedBooking;
};

const cancelBooking = async (id, userId) => {
  const booking = await Booking.findOne({
    _id:id, 
    userId:userId
  });

  if (!booking)
    throw {
      status: 400,
      message: "Booking doesn't exist",
    };

  if (booking.status === "CANCELLED")
    throw {
      status: 400,
      message: "Booking is cancelled",
    };
  booking.status = "CANCELLED";
  await booking.save();

  await Seat.updateMany(
    { _id: { $in: booking.seatIds } },
    { $set: { status: "AVAILABLE" } },
  );

  return {
    message: "Booking has been cancelled successfully",
  };
};

const deleteBookingById = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking)
    throw {
      status: 400,
      message: "Booking doesn't exist",
    };
  const deletedBooking = await Booking.findByIdAndDelete(id);
  return deletedBooking;
};

const expireBookings=async()=>{
  const expiredBookings=await Booking.find({
    status:"PENDING",
    expiresAt:{
      $lte:new Date()
    }
  });

  for (const booking of expiredBookings){
    booking.status="EXPIRED";
    await booking.save();

    await Seat.updateMany(
      {_id:{$in:booking.seatIds}},
    {
      $set:{
        status:"AVAILABLE"
      }
    }
    )
  }
  return expiredBookings;
}

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBookingById,
  cancelBooking,
  deleteBookingById,
  expireBookings
};
