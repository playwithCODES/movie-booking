import Booking from "../models/Booking.js";
import Ticket from "../models/Ticket.js";
import Payment from "../models/Payment.js";
import Seat from "../models/Seat.js";
import QRCode from "qrcode";
import crypto from "crypto";

const createPayment = async (userId, data) => {
  const booking = await Booking.findById(data.bookingId);

  if (!booking) {
    throw {
      status: 400,
      message: "Booking not found",
    };
  }

  if (booking.userId.toString() !== userId.toString()) {
    throw {
      status: 403,
      message: "unauthorized",
    };
  }

  if (booking.status !== "PENDING") {
    throw {
      status: 400,
      message: "Booking is not pending",
    };
  }

 

  const createdPayment = await Payment.create({
    userId,
    bookingId: data.bookingId,
    amount: booking.totalAmount,
    paymentMethod: data.paymentMethod,
    status: "PENDING",
  });

  return createdPayment;
};

const confirmPayment = async (
  paymentId,
  pidx,
  transactionId,
) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw {
      status: 400,
      message: "Payment Not Found",
    };
  }

  if (payment.status === "SUCCESS") {
    throw {
      status: 400,
      message: "Payment is already done",
    };
  }

  const booking = await Booking.findById(payment.bookingId);

  if (!booking) {
    throw {
      status: 400,
      message: "Booking not found",
    };
  }

  if (booking.status !== "PENDING") {
    throw {
      status: 400,
      message: "Booking is not pending",
    };
  }

  if (payment.amount !== booking.totalAmount) {
    throw {
      status: 400,
      message: "Payment amount invalid",
    };
  }

  // Save Khalti payment information
  payment.pidx = pidx;
  payment.transactionId = transactionId;
  payment.status = "SUCCESS";

  // Confirm booking
  booking.status = "CONFIRMED";

  // Mark seats as booked
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

  // Generate unique ticket code
  const ticketCode = `OMX-${crypto.randomUUID()}`;

  // Generate QR code
  const qrCode = await QRCode.toDataURL(ticketCode);

  // Create ticket
  const ticket = await Ticket.create({
    bookingId: booking._id,
    userId: payment.userId,
    ticketCode,
    qrCode,
    status: "ACTIVE",
    usedAt: null,
  });

  return {
    payment,
    booking,
    ticket,
  };
};

export default {
  createPayment,
  confirmPayment,
};