import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    minLength: [2, "User name cannot be less than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email address",
    },
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minLength: [6, "Invalid phone number"],
    maxLength: [13, "Invalid phone number"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },

  roles: {
    type: [String],
    default: ["USER"],
    enum: ["USER", "RECEPTIONIST", "ADMIN", "FOOD_STAFF"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpiresAt: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
