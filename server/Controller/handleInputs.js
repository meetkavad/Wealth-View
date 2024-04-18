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

const postIncome = async (req, res) => {
  const { earned_income, passive_income, miscellaneous_income } = req.body;
  const userId = req.user.id;

  try {
    const newIncome = {
      user: userId,
      earned_income,
      passive_income,
      miscellaneous_income,
    };

    const inc = await IncomeModel.create(newIncome);
    await inc.populate("user", "-password");
    await inc.save();

    // to update the user model with the income model's object ID
    const user = await UserModel.findById({ _id: userId });
    const income = await IncomeModel.findOne({ user: userId });
    user.incomes = income._id;
    await user.save();

    res
      .status(201)
      .json({ message: "income saved successfully!", details: inc });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const postExpense = async (req, res) => {
  const { essential_expenses, discretionary_expenses, savings_expenses } =
    req.body;
  const userId = req.user.id;

  const newExpense = {
    user: userId,
    essential_expenses,
    discretionary_expenses,
    savings_expenses,
  };

  try {
    const exp = await ExpenseModel.create(newExpense);
    await exp.populate("user", "-password");
    await exp.save();

    // to update the user model with the expense model's object ID
    const user = await UserModel.findById({ _id: userId });
    const expense = await ExpenseModel.findOne({ user: userId });
    user.expenses = expense._id;
    await user.save();

    res
      .status(201)
      .json({ message: "expenses saved successfully!", details: exp });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { postInfo, postIncome, postExpense };
