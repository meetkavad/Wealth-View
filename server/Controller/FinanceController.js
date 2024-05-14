const FinanceModel = require("../Model/FinanceModel");

// to send liabilites if expense if for a liability :

const postAL = async (req, res) => {
  const { is_asset, is_liability } = req.query;
  const { name, value } = req.body;

  const userId = req.user.id;
  try {
    const finance = await FinanceModel.findOne({ user: userId });
    if (finance) {
      if (is_asset) {
        finance.assets.push({ name, value });
      } else if (is_liability) {
        finance.liabilities.push({ name, value });
      }
      await finance.save();
      res.status(201).json({
        message: "asset/liability added!",
      });
    } else {
      res.status(404).json({
        message: "no finance data found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const editAL = async (req, res) => {
  const { is_asset, is_liability } = req.query;
  const { name, value } = req.body;
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const finance = await FinanceModel.findOne({ user: userId });
    if (finance) {
      if (is_asset) {
        if (name) finance.assets.id(id).name = name;
        if (value) finance.assets.id(id).value = value;
      } else if (is_liability) {
        if (name) finance.liabilities.id(id).name = name;
        if (value) finance.liabilities.id(id).value = value;
      }
      await finance.save();
      res.status(201).json({
        message: "asset/liability edited!",
      });
    } else {
      res.status(404).json({
        message: "no finance data found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAL = async (req, res) => {
  const { is_asset, is_liability } = req.query;
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const finance = await FinanceModel.findOne({ user: userId });
    if (finance) {
      if (is_asset) {
        finance.assets = finance.assets.filter(
          (asset) => asset._id.toString() !== id
        );
      } else if (is_liability) {
        finance.liabilities = finance.liabilities.filter(
          (liability) => liability._id.toString() !== id
        );
      }
      await finance.save();
      res.status(201).json({
        message: "asset/liability deleted!",
      });
    } else {
      res.status(404).json({
        message: "no finance data found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
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
    res.status(200).json({
      message: "finance section entry created!! ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const displayFinance = async (req, res) => {
  const userId = req.user.id;
  try {
    const finance = await FinanceModel.findOne({ user: userId });
    if (finance) {
      res.status(200).json({ finance: finance });
    } else {
      res.status(404).json({ message: "no finance data found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postAL,
  editAL,
  deleteAL,
  postBalance,
  displayFinance,
};
