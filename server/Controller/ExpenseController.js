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
    res.status(409).json({ message: error.message });
  }
};

const getExpense = async (req, res) => {
  const { category, start_date, end_date, mode, is_asset, is_liability, name } =
    req.query;
  const userId = req.user.id;

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
        $lt: end_date,
      };
    }

    var expenses = await ExpenseModel.find(queryObject);
    if (start_date && end_date) {
      expenses.sort((a, b) => a.date - b.date);
    }
    res.status(200).json({ expenses: expenses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// const getMonthlyExpenses = async (req, res) => {
//   const { month, year } = req.query;
//   const userId = req.user.id;
//   try {
//     const expenses = await ExpenseModel.find({
//       user: userId,
//       date: {
//         $gte: new Date(year, month, 1),
//         $lt: new Date(year, month + 1, 1),
//       },
//     });
//     expenses.sort((a, b) => a.date - b.date);
//     res.status(200).json({ expenses });
//   } catch (error) {
//     console.error(error);
//     res.status(404).json({ message: error.message });
//   }
// };

module.exports = { postExpense, getExpense };
