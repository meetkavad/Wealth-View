const express = require("express");

const userRouter = express.Router();
const { authenticateToken } = require("../Controller/authorization");

// personal information

const { postInfo } = require("../Controller/handleInputs");
userRouter.route("/inputInfo").post(authenticateToken, postInfo);

//Finance :
const {
  postAL,
  editAL,
  deleteAL,
  postBalance,
  displayFinance,
} = require("../Controller/FinanceController");
userRouter.route("/postBalance").post(authenticateToken, postBalance);
userRouter.route("/al").post(authenticateToken, postAL);
userRouter
  .route("/al/:id")
  .patch(authenticateToken, editAL)
  .delete(authenticateToken, deleteAL);
userRouter.route("/finance").get(authenticateToken, displayFinance);

// quiz :
const { getQuiz, postQuiz } = require("../Controller/handleQuiz");
userRouter.route("/fetchQuiz").get(authenticateToken, getQuiz);
userRouter.route("/quiz/:q_id").post(authenticateToken, postQuiz);

//Income :
const {
  postIncome,
  getIncome,
  deleteIncome,
  postManyIncomes,
} = require("../Controller/IncomeController");
userRouter
  .route("/income")
  .post(authenticateToken, postIncome)
  .get(authenticateToken, getIncome)
  .delete(authenticateToken, deleteIncome);
userRouter.route("/manyIncomes").post(authenticateToken, postManyIncomes);

// Expense :
const {
  postExpense,
  getExpense,
  postManyExpenses,
  deleteExpense,
} = require("../Controller/ExpenseController");
userRouter
  .route("/expense")
  .post(authenticateToken, postExpense)
  .get(authenticateToken, getExpense)
  .delete(authenticateToken, deleteExpense);
userRouter.route("/manyExpenses").post(authenticateToken, postManyExpenses);

//goals :
const {
  setGoal,
  editGoal,
  getGoal,
  deleteGoal,
  planTracking,
  getGoalReview,
} = require("../Controller/handleGoal.js");
userRouter
  .route("/goal")
  .post(authenticateToken, setGoal)
  .get(authenticateToken, getGoal); // for getting all goals
userRouter
  .route("/goal/:id")
  .get(authenticateToken, getGoal)
  .patch(authenticateToken, editGoal)
  .delete(authenticateToken, deleteGoal);
userRouter.route("/goal/:goalId/:taskId").post(authenticateToken, planTracking);
userRouter.route("/goal/review").get(authenticateToken, getGoalReview);

// recommendations :
const {
  getUserData,
  getRecommendation,
} = require("../Controller/RecController");
userRouter.route("/userData").get(authenticateToken, getUserData);
userRouter.route("/recommendation").post(authenticateToken, getRecommendation);

// chat bot :
const { collectMessages } = require("../Component/bot");
userRouter.route("/chat").post(authenticateToken, collectMessages);

module.exports = userRouter;
