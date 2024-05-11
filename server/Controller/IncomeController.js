const IncomeModel = require("../Model/IncomeModel");

const postIncome = async (req, res) => {
  const { isFixed, per_time, name, amount, description, date } = req.body;
  const userId = req.user.id;
  console.log(req.user);
  const income = {
    user: userId,
    isFixed,
    per_time,
    name,
    amount,
    description,
    date,
  };

  try {
    const inc = await IncomeModel.create(income);
    res
      .status(201)
      .json({ message: "income added successfully!", details: inc });
  } catch (error) {
    res.status(409).json({ message: error.message });
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

    var incomes = await IncomeModel.find(queryObject);
    if (start_date && end_date) {
      incomes.sort((a, b) => a.date - b.date);
    }
    res.status(200).json({ incomes: incomes });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { postIncome, getIncome };
