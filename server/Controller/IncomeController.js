const IncomeModel = require("../Model/IncomeModel");
const FinanceModel = require("../Model/FinanceModel");

const postIncome = async (req, res) => {
  const { isFixed, name, amount, description, date } = req.body;
  const userId = req.user.id;
  console.log(req.user);
  const income = {
    user: userId,
    isFixed,
    name,
    amount,
    description,
    date,
  };

  try {
    const inc = await IncomeModel.create(income);
    const finance = await FinanceModel.findOne({ user: userId });
    finance.bank += amount;
    await finance.save();

    res
      .status(201)
      .json({ message: "income added successfully!", details: inc });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

const getIncome = async (req, res) => {
  const { name, start_date, end_date } = req.query;
  const userId = req.user.id;

  try {
    let queryObject = { user: userId };
    if (name) queryObject.name = name;
    if (start_date && end_date) {
      queryObject.date = {
        $gte: start_date,
        $lt: end_date,
      };
    }
    queryObject.isFixed = false;
    var fixed_incomes = await IncomeModel.find({ isFixed: true, user: userId });
    var incomes = await IncomeModel.find(queryObject);
    incomes.sort((a, b) => a.date - b.date);
    fixed_incomes.sort((a, b) => a.date - b.date);
    res.status(200).json({ incomes: incomes, fixed_incomes: fixed_incomes });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const postManyIncomes = async (req, res) => {
  const incomes = req.body.map((income) => ({
    ...income,
    user: req.user.id,
  }));

  try {
    const inc = await IncomeModel.insertMany(incomes);
    res.status(201).json({ message: "incomes added successfully" });
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const income = await IncomeModel.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income not found!" });
    }

    await income.remove();

    res.status(200).json({ message: "Income deleted successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// // This function will be called every month
// function updateFinances() {
//   // Deduct fixed expenses and add fixed incomes here
// }

// // Get the current date and time
// let now = new Date();

// // Calculate how many milliseconds are left until the next month
// let delay = new Date(now.getFullYear(), now.getMonth() + 1, 1) - now;

// // Call updateFinances once when the next month starts
// setTimeout(() => {
//   updateFinances();

//   // Then call updateFinances every month
//   setInterval(updateFinances, 1000 * 60 * 60 * 24 * 30);
// }, delay);

module.exports = { postIncome, getIncome, deleteIncome, postManyIncomes };
