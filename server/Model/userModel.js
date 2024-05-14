const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    dob: {
      type: Date,
      default: new Date("1990-01-01"),
    },
    marital_status: {
      type: String,
      default: "Single",
    },
    no_of_dependents: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserModel", userSchema);
