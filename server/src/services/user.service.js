import User from "../models/User.js";

const createUser = async(data) => {
    const createdUser=await User.create(data);
    
    return createdUser;
};

const getAllUsers = async() => {
    const usersList=await User.find();
    return usersList;
};

const findUserById = async(id) => {
    const user=await User.findById(id);
    return user;
};

const updateUserById = async(id, updatedData) => {
    const updatedUser=await User.findByIdAndUpdate(id, updatedData,{new:true});
    return updatedUser;
};
const deleteUserById =async (id) => {
    const deletedUser=await User.findByIdAndDelete(id);
    return deletedUser;
};

const findUserByEmail = async(email) => {
    const user=await User.findOne({email:email})
    return user;
};


const updateMyProfile = async (userId, { name, phone }) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, phone },
    {
      new: true,
      runValidators: true,
    }
  ).select("name email phone roles isActive");

  return updatedUser;
};


export default {
  createUser,
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  findUserByEmail,
  updateMyProfile
};
