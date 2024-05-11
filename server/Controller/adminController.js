const urlModel = require("../Model/UrlModel");
const QuizModel = require("../Model/QuizModel");
require("dotenv").config();

// const historic_data = {};

const addUrl = async (req, res) => {
  try {
    const { name, url, source, topic } = req.body;
    const urlData = new urlModel({
      name,
      url,
      source,
      topic,
    });
    await urlData.save();
    res.status(200).json({
      msg: "url added successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getStockData = async (req, res) => {
  const { symbol } = req.body;

  const url = `https://yahoo-finance127.p.rapidapi.com/finance-analytics/${symbol}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // const price = result.price.regularMarketPrice.raw;
    res.status(200).json({
      msg: "stock data fetched successfully",
      price: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getHistoricData = async (req, res) => {
  // const { symbol } = req.body;
  const symbol = "NHPC.NS";
  const url = `https://yahoo-finance127.p.rapidapi.com/historic/${symbol}/1d/3mo`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // historic_data = result;
    res.status(200).json({
      msg: "data fetched successfully",
      price: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const interestRate = async (req, res) => {
  const url =
    "https://interest-rate-by-api-ninjas.p.rapidapi.com/v1/interestrate";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RATE_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RATE_RAPID_API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.status(200).json({
      msg: "data fetched successfully",
      price: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const mutualFunds = async (req, res) => {
  const url = "https://latest-mutual-fund-nav.p.rapidapi.com/latest";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.status(200).json({
      msg: "data fetched successfully",
      price: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const commoditiesRate = async (req, res) => {
  const url =
    "https://metals-prices-rates-api.p.rapidapi.com/latest?base=INR&symbols=XAU";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "metals-prices-rates-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    // var price = result.data.rates["XAU"];
    // price = 1 / price;

    res.status(200).json({
      message: "data fetched succesfully",
      data: result,
      // price: price,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
    console.error(error);
  }
};

const cryptoRate = async (req, res) => {
  const url = "https://binance43.p.rapidapi.com/avgPrice?symbol=ETHBTC";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "binance43.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.status(200).json({
      message: "data fetched succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
    console.error(error);
  }
};

const stockNews = async (req, res) => {
  const { symbol } = req.body;

  const url = `https://yahoo-finance-india1.p.rapidapi.com/market_india/news/?symbol=${symbol}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fffbcc2400msh66c3cfa1c5fc343p1d7d19jsn63f36987c93e",
      "X-RapidAPI-Host": "yahoo-finance-india1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.status(200).json({
      message: "data fetched succesfully",
      news: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error!",
    });
    console.error(error);
  }
};

const addQuestions = async (req, res) => {
  const { field, attribute } = req.body;

  try {
    const is_quiz = await QuizModel.findOne({ field: field });

    // if quiz already exists :
    if (is_quiz) {
      for (const attr of attribute) {
        const is_attr = await QuizModel.findOne({
          field: field,
          "attribute.name": attr.name,
        });
        if (is_attr) {
          const idx = is_attr.attribute.findIndex((a) => a.name === attr.name);
          for (const q of attr.questions) {
            is_attr.attribute[idx].questions.push(q);
            await is_attr.save();
          }
        } else {
          is_quiz.attribute.push(attr);
          await is_quiz.save();
        }
      }
      res.status(200).json({
        edited_quiz: is_quiz,
      });
    } else {
      const new_quiz = await QuizModel.create({
        field: field,
        attribute: attribute,
      });
      res.status(200).json({
        quiz: new_quiz,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  addUrl,
  getStockData,
  interestRate,
  mutualFunds,
  commoditiesRate,
  cryptoRate,
  stockNews,
  addQuestions,
  getHistoricData,
};

// module.exports = historic_data;
