const express = require("express");

const { authenticateToken } = require("../Controller/authorization");
const {
  postInfo,
  postExpense,
  postIncome,
} = require("../Controller/handleInputs");
const { getReport } = require("../Controller/handleReport");

const userRouter = express.Router();

userRouter.route("/inputInfo").post(authenticateToken, postInfo);
userRouter.route("/inputIncome").post(authenticateToken, postIncome);
userRouter.route("/inputExpense").post(authenticateToken, postExpense);
userRouter.route("/report").get(authenticateToken, getReport);

// chat bot :
const { collectMessages } = require("../Component/bot");
userRouter.route("/chat").post(authenticateToken, collectMessages);

module.exports = userRouter;
