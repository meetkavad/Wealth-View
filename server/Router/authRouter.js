const express = require("express");
const {
  checkUsername,
  PostUserSignup,
  PostEmailVerification,
} = require("../Controller/signupController");

const { authenticateToken } = require("../Controller/authorization");

const {
  PostUserLogin,
  PostForgotPassword,
  PostResetPassword,
} = require("../Controller/loginController");

const authRouter = express.Router();

authRouter.route("/checkusername").post(checkUsername);
authRouter.route("/signup").post(PostUserSignup);
authRouter.route("/postcode").post(authenticateToken, PostEmailVerification);

authRouter.route("/login").post(PostUserLogin);
authRouter.route("/forgotPassword").post(PostForgotPassword);
authRouter.route("/resetPassword").post(authenticateToken, PostResetPassword);

module.exports = authRouter;
