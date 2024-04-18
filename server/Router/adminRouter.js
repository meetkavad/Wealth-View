const express = require("express");

const adminRouter = express.Router();
const { addUrl } = require("../Controller/adminController");

adminRouter.route("/add-url").post(addUrl);

module.exports = adminRouter;
