const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UrlModel", urlSchema);
