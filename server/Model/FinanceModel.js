const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    cash: {
      type: String,
      required: true,
    },
    bank: {
      type: Number,
      required: true,
      default: 0,
    },
    assets: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    liabilities: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FinanceModel", FinanceSchema);
