const expenses = [
  "Housing",
  "Transportation",
  "Food",
  "Personal Care",
  "Healthcare",
  "Insurance",
  "Clothing",
  "Education",
  "Debt",
  "Investment",
  "Entertainment",
  "Miscellaneous",
];

const getRandomCategory = () =>
  expenses[Math.floor(Math.random() * expenses.length)];

const getRandomAmount = () => Math.floor(Math.random() * 10000) + 1000; // Random amount between 1000 and 10000

const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const startDate = new Date("2024-03-01");
const endDate = new Date("2024-05-31");

const expenditureData = [];

for (let i = 0; i < 50; i++) {
  // Generate 50 random expenses
  const isFixed = Math.random() < 0.5; // Randomly true or false
  const name = `Expense ${i + 1}`;
  const mode = Math.random() < 0.5 ? "Cash" : "Bank"; // Randomly "Cash" or "Bank"
  const amount = getRandomAmount();
  const category = getRandomCategory();
  const description = `Description for Expense ${i + 1}`;
  const date = getRandomDate(startDate, endDate);

  expenditureData.push({
    isFixed: isFixed,
    name: name,
    mode: mode,
    amount: amount,
    category: category,
    description: description,
    date: date,
  });
}

console.log(expenditureData);
