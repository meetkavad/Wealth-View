const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    isFixed: {
      type: Boolean,
      required: true,
      default: false,
    },
    per_time: {
      type: String,
      required: function () {
        return this.isFixed;
      },
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: function () {
        return !this.isFixed;
      },
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IncomeModel", IncomeSchema);
