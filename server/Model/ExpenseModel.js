const mongoose = require("mongoose");
const expenseCategories = require("../Component/expenseCategories.js");

const ExpenseSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: expenseCategories,
      default: "Miscellaneous",
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExpenseModel", ExpenseSchema);
