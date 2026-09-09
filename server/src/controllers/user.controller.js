import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  const createdUser = await userService.createUser(req.body);
  res.json(createdUser);
};

const getAllUsers = async (req, res) => {
  const usersList = await userService.getAllUsers();
  res.json(usersList);
};

const findUserById = async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  res.json(user);
};

const updateUserById = async (req, res) => {
  const updatedUser = await userService.updateUserById(req.params.id, req.body);
  res.json(updatedUser);
};

const deleteUserById = async (req, res) => {
  const result = await userService.deleteUserById(req.params.id);
  res.json(result);
};

const findUserByEmail = async (req, res) => {
  const user = userService.findUserByEmail(req.query.email);
  res.json(user);
};

const getMe = async (req, res) => {
  const user = await userService.findUserById(req.user.userId);

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles:user.roles,
    isActive: user.isActive,
  });
};

export default {
  createUser,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  findUserByEmail,
  getMe,
};
