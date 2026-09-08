import Show from "../models/Show.js";

const createShow = async (data) => {
  const createdShow = await Show.create(data);
  return createdShow;
};

const getAllShows = async () => {
  const showsList = await Show.find();
  return showsList;
};

const findShowById = () => {};

const updateShowById = () => {};

const deleteShowById = () => {};

export default {
  createShow,
  getAllShows,
  findShowById,
  updateShowById,
  deleteShowById,
};
