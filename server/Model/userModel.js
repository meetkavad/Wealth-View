const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
    },
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://res.cloudinary.com/dxkufsejm/image/upload/v1625966460/Profile%20Pic/defaultProfilePic_z4v1qy.png",
  },
  bio: {
    type: String,
    default: "Hey there! I am using Wealth-View",
  },
  notifications: {
    type: Array,
    default: [],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

module.exports = mongoose.model("userModel", userSchema);
