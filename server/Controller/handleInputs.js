const IncomeModel = require("../Model/IncomeModel");
const ExpenseModel = require("../Model/ExpenseModel");
const UserModel = require("../Model/UserModel");

const postInfo = async (req, res) => {
  const { dob, marital_status, no_of_dependents } = req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    const date = new Date(dob);
    user.dob = date;
    user.marital_status = marital_status;
    user.no_of_dependents = no_of_dependents;
    await user.save();
    res
      .status(201)
      .json({ message: "info saved successfully!", details: user });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { postInfo };
