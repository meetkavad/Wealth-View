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
} = require("../Controller/adminController");

// add articles and blogs urls :
adminRouter.route("/add-url").post(addUrl);

// access stock market data :
adminRouter.route("/stock").post(getStockData);
adminRouter.route("/ir").post(interestRate);
adminRouter.route("/mf").post(mutualFunds);
adminRouter.route("/cr").post(commoditiesRate);
adminRouter.route("/crypto").post(cryptoRate);
adminRouter.route("/news").post(stockNews);

module.exports = adminRouter;
