const mongoose = require("mongoose");

// Define the structure for the expense object:
const expenseItemSchema = {
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

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    unique: true,
  },
  essential_expenses: [expenseItemSchema],
  discretionary_expenses: [expenseItemSchema],
  savings_expenses: [expenseItemSchema],
});

module.exports = mongoose.model("ExpenseModel", expenseSchema);

/*
essential_expenses includes :
Housing: Rent or mortgage payments, property taxes, homeowners or renters insurance.
Utilities: Electricity, water, gas, heating, garbage collection, internet, and phone bills.
Food: Groceries, dining out, and meal delivery services.
Transportation: Car payments, fuel, public transportation fares, tolls, parking fees, and vehicle maintenance.
Healthcare: Health insurance premiums, medical expenses, prescription medications, and co-pays.
Debt Payments: Student loans, credit card payments, personal loans, and other debt obligations.
Insurance: Health insurance, life insurance, disability insurance, and any other insurance premiums.
Childcare/Education: Daycare expenses, school tuition, books, and supplies.
Other Essentials: Basic clothing, personal care items, household supplies, and any other essential items required for daily living. 
*/

/*
discretionary_expenses (personal choices) includes :
Entertainment: Dining out at restaurants, movie tickets, streaming services, concerts, events, hobbies, and recreational activities.
Travel: Vacations, weekend getaways, flights, hotels, rental cars, and travel-related expenses.
Shopping: Non-essential clothing, accessories, electronics, gadgets, home decor, and luxury items.
Gym Memberships: Membership fees for gyms, fitness classes, personal training sessions, or sports activities.
Subscriptions: Magazine subscriptions, online memberships, software subscriptions, and other recurring services.
Personal Care: Salon or spa services, massages, skincare products, and beauty treatments.
Gifts/Donations: Birthday gifts, holiday gifts, charitable donations, and contributions to fundraisers.
*/

/*
Savings Expenses:
Emergency Fund: Contributions to an emergency savings fund to cover unexpected expenses or financial emergencies.
Retirement Savings: Contributions to retirement accounts such as 401(k), IRA, or pension plans.
Investments: Contributions to investment accounts, stocks, bonds, mutual funds, or other investment vehicles.
*/
