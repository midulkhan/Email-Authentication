import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: string,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: string,
    required: true,
  },
  forgotPasswordToken: Boolean,
  forPasswordExpiry: Date,
  verifyToken: string,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
