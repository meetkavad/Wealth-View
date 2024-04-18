const urlModel = require("../Model/UrlModel");

// add url :

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

module.exports = { addUrl };
