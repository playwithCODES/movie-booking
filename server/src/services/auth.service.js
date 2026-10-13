import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/jwt.js";

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (user)
    throw {
      status: 409,
      message: "User Already Exists ",
    };

  if (!data.password)
    throw {
      status: 400,
      message: "Password is required",
    };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
  });

  return {
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    phone: createdUser.phone,
  };
};

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (!user)
    throw {
      status: 404,
      message: "Invalid user credentials",
    };

  if (!user.isActive)
    throw {
      status: 400,
      message: "User deactivated. Please contact support.",
    };

  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch)
    throw {
      status: 400,
      message: "Incorrect email or password",
    };

  const token = createJWT({
    userId: user.id,
    roles: user.roles,
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    token,
    isActive: user.isActive,
  };
};

const forgotPassword = async (data) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (user) {
    const resetToken = crypto.randomBytes(32).toString("hex");

    await ResetPassword.create({
      userId: user.id,
      token: resetToken,
      isUsed: false,
    });
  }

  return {
    message:
      "If an account exists with this email, a password reset process has been initiated.",
  };
};

const resetPassword=async(userId, resetToken,password)=>{

  const data=await ResetPassword.findOne({
    userId,
    expiresAt:{$gt:Date.now()},
  }).sort({createdAt:-1});

  if(!data || data.token!=resetToken)
    throw{status:400,message:"Invalid or expired Token"}

  if(data.isUsed)
    throw{status:400,message:"Link is already Used"}

   const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

   await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });

  
  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

   return { message: "Password reset successfully" };

}

export default {
  register,
  login,
  forgotPassword,
  resetPassword
};
