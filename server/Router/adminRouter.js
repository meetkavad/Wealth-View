const express = require("express");

const adminRouter = express.Router();

const {
  addUrl,
  getStockData,
  interestRate,
  mutualFunds,
  commoditiesRate,
  cryptoRate,
  stockNews,
  addQuestions,
  getHistoricData,
} = require("../Controller/adminController");

// add articles and blogs urls  and quiz questions :
adminRouter.route("/add-url").post(addUrl);
adminRouter.route("/add-questions").post(addQuestions);

// access stock market data :
adminRouter.route("/stock").post(getStockData);
adminRouter.route("/ir").post(interestRate);
adminRouter.route("/mf").post(mutualFunds);
adminRouter.route("/cr").post(commoditiesRate);
adminRouter.route("/crypto").post(cryptoRate);
adminRouter.route("/news").post(stockNews);
adminRouter.route("/data").post(getHistoricData);

module.exports = adminRouter;
