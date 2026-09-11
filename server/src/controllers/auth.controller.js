import authService from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const registeredUser = await authService.register(req.body);
    res.json(registeredUser);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};
const login = async (req, res) => {
  try {
    const loggedInUser = await authService.login(req.body);
    res.json(loggedInUser);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const query = req.query;
  if (!query.userId || !query.token)
    return res.status(400).send("Token and userId are required");
  try {
    const data = await authService.resetPassword(
      query.userId,
      query.token,
      req.body.password,
    );

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

export default {
  forgotPassword,
  register,
  login,
  resetPassword,
};
