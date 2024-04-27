const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
      is_verified: {
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
    },
    notifications: {
      type: Array,
      default: [],
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      default: new Date("1990-01-01"),
    },
    marital_status: {
      type: String,
      required: true,
      default: "Single",
    },
    no_of_dependents: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserModel", userSchema);
