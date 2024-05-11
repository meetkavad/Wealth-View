const express = require("express");

const { authenticateToken } = require("../Controller/authorization");
const { postInfo } = require("../Controller/handleInputs");
const { getReport } = require("../Controller/handleReport");
const { postExpense, getExpense } = require("../Controller/ExpenseController");
const { postIncome, getIncome } = require("../Controller/IncomeController");
const {
  getLiabilities,
  postBalance,
} = require("../Controller/FinanceController");
const userRouter = express.Router();

userRouter.route("/inputInfo").post(authenticateToken, postInfo);

//Income :
userRouter
  .route("/income")
  .post(authenticateToken, postIncome)
  .get(authenticateToken, getIncome);

// Expense :
userRouter
  .route("/expense")
  .post(authenticateToken, postExpense)
  .get(authenticateToken, getExpense);

// Goals :
userRouter.route("/report").get(authenticateToken, getReport);

//Finance :
userRouter.route("/liabilities").get(authenticateToken, getLiabilities);
userRouter.route("/postBalance").post(authenticateToken, postBalance);

// chat bot :
const { collectMessages } = require("../Component/bot");
userRouter.route("/chat").post(authenticateToken, collectMessages);

// quiz :
const { getQuiz, postQuiz } = require("../Controller/handleQuiz");
userRouter.route("/fetchQuiz").get(authenticateToken, getQuiz);
userRouter.route("/quiz/:q_id").post(authenticateToken, postQuiz);

//goals :
const {
  setGoal,
  editGoal,
  getGoal,
  deleteGoal,
  planTracking,
} = require("../Controller/handleGoal.js");
userRouter.route("/goal").post(authenticateToken, setGoal);
userRouter.route("/goal").get(authenticateToken, getGoal);

userRouter
  .route("/goal/:id")
  .get(authenticateToken, getGoal)
  .patch(authenticateToken, editGoal)
  .delete(authenticateToken, deleteGoal);
userRouter.route("/goal/:goalId/:taskId").post(authenticateToken, planTracking);
module.exports = userRouter;
