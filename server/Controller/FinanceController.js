const FinanceModel = require("../Model/FinanceModel");

// to send liabilites if expense if for a liability :
const getLiabilities = async (req, res) => {
  const finance = await FinanceModel.findOne({ user: req.user.id });
  try {
    if (finance) {
      const liabilities = finance.liabilities;
      if (liabilities.length > 0) {
        res.status(200).json({ liabilities: liabilities });
      } else {
        res.status(404).json({ message: "no liabilities found!" });
      }
    } else {
      res.status(404).json({ message: "not sufficient data!" });
    }
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const postBalance = async (req, res) => {
  const { cash, bank } = req.body;
  const userId = req.user.id;

  try {
    await FinanceModel.create({
      user: userId,
      cash: cash,
      bank: bank,
    });
    res.status(201).json({
      message: "finance section entry created!! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getLiabilities, postBalance };
