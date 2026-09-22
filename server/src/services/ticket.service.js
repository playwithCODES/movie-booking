import Ticket from "../models/Ticket.js";

const getTicketById = async (id) => {
  const ticket = await Ticket.findById(id).populate([
    {
      path: "userId",
    },
    {
      path: "bookingId",
      populate: [
        {
          path: "showId",
          populate: [
            {
              path: "movieId",
            },
            {
              path: "cinemaId",
            },
            {
              path: "hallId",
            },
          ],
        },
        {
          path: "seatIds",
          populate: {
            path: "category",
          },
        },
      ],
    },
  ]);

  return ticket;
};

export default {
  getTicketById,
};