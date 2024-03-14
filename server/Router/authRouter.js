const express = require("express");
const {
  checkUsername,
  PostUserSignup,
  PostEmailVerification,
} = require("../Controller/signupController");
const authRouter = express.Router();
authRouter.get("/", (req, res) => {
  res.json({
    msg: "auth router",
  });
});
authRouter.route("/checkusername").post(checkUsername);
authRouter.route("/signup").post(PostUserSignup);
authRouter.route("/postcode").post(PostEmailVerification);

module.exports = authRouter;
