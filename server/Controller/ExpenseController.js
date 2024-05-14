const FinanceModel = require("../Model/FinanceModel");
const ExpenseModel = require("../Model/ExpenseModel");

const postExpense = async (req, res) => {
  const {
    isFixed,
    name,
    amount,
    mode,
    category,
    description,
    date,
    is_asset,
    is_liability,
    liability_name,
  } = req.body;
  const userId = req.user.id;

  const expense = {
    user: userId,
    isFixed,
    name,
    mode,
    amount,
    category,
    description,
    is_asset,
    is_liability,
    liability_name,
    date,
  };

  try {
    const exp = await ExpenseModel.create(expense);
    const finance = await FinanceModel.findOne({ user: userId });

    // deducting from finance model :
    if (mode === "Cash") {
      finance.cash -= amount;
    } else {
      finance.bank -= amount;
    }
    // adding assets if it's an asset purchase! else deducting amount from liability if it's that expense.
    if (is_asset) {
      finance.assets.push({ name: name, value: amount });
    } else if (is_liability) {
      const lb = finance.liabilities.findOne({ name: liability_name });
      lb.value -= amount;
    }
    await finance.save();

    res
      .status(201)
      .json({ message: "expense added successfully!", details: exp });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

const postManyExpenses = async (req, res) => {
  const expenses = req.body.map((expense) => ({
    ...expense,
    user: req.user.id,
  }));

  try {
    const exp = await ExpenseModel.insertMany(expenses);
    res.status(201).json({ message: "expenses added successfully" });
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
};

const getExpense = async (req, res) => {
  const { category, start_date, end_date, mode, is_asset, is_liability, name } =
    req.query;
  const userId = req.user.id;
  console.log(start_date, end_date);
  try {
    let queryObject = { user: userId };
    if (category) queryObject.category = category;
    if (mode) queryObject.mode = mode;
    if (is_asset) queryObject.is_asset = is_asset;
    if (is_liability) queryObject.is_liability = is_liability;
    if (name) queryObject.name = name;
    if (start_date && end_date) {
      queryObject.date = {
        $gte: start_date,
        $lte: end_date,
      };
    }
    queryObject.isFixed = false;
    var fixed_expenses = await ExpenseModel.find({
      isFixed: true,
      user: userId,
    });
    var expenses = await ExpenseModel.find(queryObject);
    expenses.sort((a, b) => a.date - b.date);
    fixed_expenses.sort((a, b) => a.date - b.date);
    res
      .status(200)
      .json({ expenses: expenses, fixed_expenses: fixed_expenses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!expense) {
      return res.status(404).json({ message: "No expense found!" });
    }

    // adding amount to cash or bank :
    const finance = await FinanceModel.findOne({ user: userId });
    if (expense.mode === "Bank") {
      finance.bank += expense.amount;
    } else {
      finance.cash += expense.amount;
    }

    // removing asset if it's an asset expense! else adding amount to liability if it's that expense.
    if (expense.is_asset) {
      finance.assets = finance.assets.filter(
        (asset) => asset.name !== expense.name
      );
    }
    if (expense.is_liability) {
      const lb = finance.liabilities.findOne({ name: expense.liability_name });
      lb.value += expense.amount;
    }
    await finance.save();

    res.status(200).json({ message: "expense deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { postExpense, getExpense, postManyExpenses, deleteExpense };
