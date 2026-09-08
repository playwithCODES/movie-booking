import Show from "../models/Show.js";

const createShow = async (data) => {
  const existingShow = await Show.findOne({
    hallId: data.hallId,
    date: data.date,
    startTime: { $lt: data.endTime },
    endTime: { $gt: data.startTime },
  });

  if (existingShow) {
    const error = new Error("Show timing overlaps with an existing show");
    error.statusCode = 409;
    throw error;
  }

  const createdShow = await Show.create(data);

  return createdShow;
};

const getAllShows = async () => {
  const showsList = await Show.find();

  return showsList;
};

const findShowById = async (id) => {
  const show = await Show.findById(id);

  return show;
};

const updateShowById = async (id, updatedData) => {
  const updatedShow = await Show.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return updatedShow;
};

const deleteShowById = async (id) => {
  const deletedShow = await Show.findByIdAndDelete(id);

  return {
    message: "Show has been deleted successfully",
  };
};

export default {
  createShow,
  getAllShows,
  findShowById,
  updateShowById,
  deleteShowById,
};
