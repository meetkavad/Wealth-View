const mongoose = require("mongoose");

// Define the structure for the income object:
const income_struct = {
  source: {
    type: String,
    required: true,
  },
  amount_pm: {
    type: Number,
    required: true,
    default: 0,
  },
};

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    unique: true,
  },

  earned_income: [income_struct],
  passive_income: [income_struct],
  miscellaneous_income: [income_struct],
});

module.exports = mongoose.model("IncomeModel ", incomeSchema);

/*
passive_income includes :
 1. Rental income
 2. Dividend income 
 3. Interest income
 4. Royalty income
 5. Capital gains 
 6. Annuity income eg. pension
 8. affiliate income 
 9. digial asset income 
 10. under government schemes


*/
