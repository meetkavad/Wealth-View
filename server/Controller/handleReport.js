const UserModel = require("../Model/UserModel");
const IncomeModel = require("../Model/IncomeModel");
const ExpenseModel = require("../Model/ExpenseModel");

const getReport = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    const income = await IncomeModel.findOne({ user: userId });
    const expense = await ExpenseModel.findOne({ user: userId });

    console.log("user", user);

    res.status(200).json({
      message: "report fetched successfully!",
      user: user,
      income: income,
      expense: expense,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getReport };

// after generating report , feed it to AI so that user can chat its queries
