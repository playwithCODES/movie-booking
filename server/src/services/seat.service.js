import Seat from "../models/Seat.js";
import SeatCategory from "../models/SeatCategory.js";

const createSeat = async (data) => {
  const createdSeat = await Seat.create(data);
  return createdSeat;
};

const createMultipleSeats = async (data) => {
  const hallId = data.hallId;
  const seats=[];
 let category;

 const goldCategory = await SeatCategory.findOne({
  code: "GOLD",
  isActive: true,
});

const platinumCategory = await SeatCategory.findOne({
  code: "PLATINUM",
  isActive: true,
});

const silverCategory = await SeatCategory.findOne({
  code: "SILVER",
  isActive: true,
});

for (let i = 1; i <= 10; i++) {
  const alphabet = String.fromCharCode(64 + i);

  if (i <= 5) {
    category = goldCategory._id;
  } else if (i === 6) {
    category = platinumCategory._id;
  } else {
    category = silverCategory._id;
  }

  for (let j = 1; j <= 10; j++) {
    const SeatNumber = alphabet + j;

    seats.push({
      seatNumber: SeatNumber,
      hallId: hallId,
      row: alphabet,
      category: category,
      status: "AVAILABLE",
    });
  }
}

  const createdSeats = await Seat.insertMany(seats);

  return createdSeats;
};

const getAllSeats = async () => {
  const seatsList = await Seat.find().populate("category").populate("hallId");
  return seatsList;
};


const findSeatById = async (id) => {
  const seat = await Seat.findById(id)
    .populate("category")
    .populate("hallId");

  return seat;
};

const updateSeatById = async (id, updatedData) => {
  const updatedSeat = await Seat.findByIdAndUpdate(
    id,
    updatedData,
    { new: true }
  );

  return updatedSeat;
};

const deleteSeatByID = async (id) => {
  const deletedSeat = await Seat.findByIdAndDelete(id);

  return {
    message: "Seat has been deleted successfully",
    seat: deletedSeat,
  };
};

export default {
  createSeat,
  createMultipleSeats,
  getAllSeats,
  findSeatById,
  updateSeatById,
  deleteSeatByID,
};
