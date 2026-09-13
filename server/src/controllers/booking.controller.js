import bookingService from "../services/booking.service.js";

const createBooking = async (req, res) => {
  try {
    const createdBooking = await bookingService.createBooking({
      userId: req.user.userId,
      showId: req.body.showId,
      seatIds: req.body.seatIds,
    });
    res.json(createdBooking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const allBookingList = await bookingService.getAllBookings();
    res.json(allBookingList);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const getMyBookings = async (req, res) => {
  try {
    const booking = await bookingService.getMyBookings(req.user.userId);
    res.json(booking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const updateBookingById = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateBookingById(
      req.params.id,
      req.body,
    );
    res.json(updatedBooking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const cancelledBooking = await bookingService.cancelBooking(req.params.id);
    res.json(cancelledBooking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const deleteBookingById = async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteBookingById(
      req.params.id,
    );
    res.json(deletedBooking);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBookingById,
  cancelBooking,
  deleteBookingById,
};
