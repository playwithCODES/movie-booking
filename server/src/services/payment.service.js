import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Seat from "../models/Seat.js";

const createPayment = async (userId, data) => {
  const booking = await Booking.findById(data.bookingId);
  if (!booking)
    throw {
      status: 400,
      message: "Booking not found",
    };

  if (booking.userId.toString() !== userId.toString())
    throw {
      status: 403,
      message: "unauthorized",
    };
  if (booking.status !== "PENDING")
    throw {
      status: 400,
      message: "Booking is not pending",
    };

  if (data.amount !== booking.totalAmount)
    throw {
      status: 400,
      message: "Invalid Payment Amount",
    };

  const createdPayment = await Payment.create({
    userId: userId,
    ...data,
    status: "PENDING",
  });
  return createdPayment;
};

const confirmPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw {
      status: 400,
      message: "Payment Not Found",
    };
  }

  if (payment.status === "SUCCESS")
    throw {
      status: 400,
      message: "Payment is already done",
    };

  const booking = await Booking.findById(payment.bookingId);
  if (!booking)
    throw {
      status: 400,
      message: "Booking not found",
    };

  if (booking.status !== "PENDING")
    throw {
      status: 400,
      message: "Booking is not pending",
    };

  if (payment.amount !== booking.totalAmount)
    throw {
      status: 400,
      message: "Payment amount invalid",
    };

  payment.status = "SUCCESS";
  booking.status = "CONFIRMED";

  await Seat.updateMany(
    {
      _id: {
        $in: booking.seatIds,
      },
    },
    {
      $set: {
        status: "BOOKED",
      },
    },
  );

  await payment.save();
  await booking.save();

  return payment;
};

export default {
  createPayment,
  confirmPayment,
};
