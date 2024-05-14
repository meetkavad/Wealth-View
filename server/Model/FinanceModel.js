const mongoose = require("mongoose");

const FinanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    cash: {
      type: Number,
      required: true,
      default: 0,
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
        },
        value: {
          type: Number,
          default: 0,
        },
      },
    ],
    liabilities: [
      {
        name: {
          type: String,
        },
        value: {
          type: Number,
          default: 0,
        },
      },
    ],
    knowledge: [
      {
        field: {
          type: String,
        },
        attempted: [
          {
            type: mongoose.Schema.Types.ObjectId,
          },
        ],
        score: {
          type: Number,
          default: 0,
        },
      },
    ],

    perspective: [
      {
        field: {
          type: String,
        },
        attempted: [
          {
            type: mongoose.Schema.Types.ObjectId,
          },
        ],
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    investment_preferences: {
      stocks: {
        Boolean,
      },
      sector: [
        {
          type: String,
          required: function () {
            return this.stocks;
          },
        },
      ],
      mutual_funds: {
        Boolean,
      },
      Gold: {
        Boolean,
      },
      fixed_returns: {
        Boolean,
      },
    },
  },
  {
    timestamps: true,
  }
);

const FinanceModel = mongoose.model("FinanceModel", FinanceSchema);
FinanceModel.syncIndexes();
module.exports = FinanceModel;
