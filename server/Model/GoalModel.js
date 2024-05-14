const mongoose = require("mongoose");
const currentDate = new Date();

const GoalSchema = new mongoose.Schema(
  {
    user: {
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
    target_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    allocated_amount: {
      type: Number,
      required: true,
      default: 0,
    },
    timeline: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: currentDate,
    },
    plan: [
      {
        index: Number,
        task: String,
        status: {
          type: Boolean,
          default: false,
        },
      },
    ],
    completion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GoalModel", GoalSchema);
