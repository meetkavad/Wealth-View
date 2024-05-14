const mongoose = require("mongoose");
const expenseCategories = require("../Component/expenseCategories.js");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
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
    mode: {
      type: String,
      required: true,
      enum: ["Cash", "Bank"],
      default: "Cash",
    },
    amount: {
      type: Number,
      required: true,
      default: 100,
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
    is_asset: {
      type: Boolean,
      default: false,
    },
    is_liability: {
      type: Boolean,
      default: false,
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
