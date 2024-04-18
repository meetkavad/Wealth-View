const mongoose = require("mongoose");
const currentDate = new Date();

const GoalSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["short-term", "long-term", "mid-term"],
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    timeline: {
      type: Date,
      required: true,
      default: new Date(
        currentDate.getFullYear() + 1,
        currentDate.getMonth(),
        currentDate.getDate()
      ), // one year from now
    },
    date: {
      type: Date,
      required: true,
      default: currentDate,
    },
    plan: {
      rem_amount: Number,
      rem_date: Date,
      status: Number,
    },
    // status: {
    //   type: String,
    //   required: true,
    //   default: "pending",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GoalModel", GoalSchema);

