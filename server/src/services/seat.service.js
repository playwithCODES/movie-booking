import Seat from "../models/Seat.js";

const createSeat = async (data) => {
  const createdSeat = await Seat.create(data);
  return createdSeat;
};

const getAllSeats = async () => {
  const seatsList = await Seat.find();
  return seatsList;
};

const findSeatById = async (id) => {
  const seat = await Seat.findById(id);
  return seat;
};

const updateSeatById = async (id, updatedData) => {
  const updatedSeat = await Seat.findByIdAndUpdate(id, updatedData, {new:true});
  return updatedSeat;
};

const deleteSeatByID = async (id) => {
  const deletedSeat = await Seat.findByIdAndUpdate(id);
  return {"message":"seat has been deleted successfully"};
};

export default {
  createSeat,
  getAllSeats,
  findSeatById,
  updateSeatById,
  deleteSeatByID,
};
