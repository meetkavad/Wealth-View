const ExpenseModel = require("../Model/ExpenseModel");
const UserModel = require("../Model/UserModel");
const IncomeModel = require("../Model/IncomeModel");
const FinanceModel = require("../Model/FinanceModel");
const GoalModel = require("../Model/GoalModel");
const RecModel = require("../Model/RecModel");
require("dotenv").config();
const markdownIt = require("markdown-it");
const md = markdownIt();

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

const getUserData = async (req, res) => {
  // to get all information related to user :
  const userId = req.user.id;
  const data = {};
  try {
    const user = await UserModel.findById(userId);
    data.user = user;
    // to not let access password and email :
    data.user.password = undefined;
    data.user.email = undefined;

    const income = await IncomeModel.find({ user: userId });
    data.income = income;
    const expense = await ExpenseModel.find({ user: userId });
    data.expense = expense;
    const finance = await FinanceModel.find({ user: userId });
    data.finance = finance;
    const goal = await GoalModel.find({ user: userId });
    data.goal = goal;
    const rec = await RecModel.find({ user: userId });
    data.recommendations = rec;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecommendation = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user.id;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "you are an personalized financial advisor working at an indian company called \"WealthView\" .  you are provided with user persona data(name , age , marital status, gender , no. of dependents) and financial data that includes : {finances (cash , bank balance,assets , liabilites)  , expense( isFixed,\n name,\n amount,\n mode,\n category,\n description,\n date,\n is_asset,\n is_liability,\n liability_name,\n) , and similar attributes for incomes , goals of users , recommendations : (date , recommendations)-> these are previous recommendations generated by you!} . using this information of user and your financial expertise , provide personalized recommendation to the user each day, since income and expenses will be added each day , on basis of that analyze that information and provide personal recommendations . don't dive much deeper into goal section , since we have a goal planner manager which looks into goal planning and management  , you can just take overview of goals of users , but don't recommend anything related to goals of users.     Format of Personalized Financial Advice/Recommendations\n\n1. Personalization Header:\n\nSalutation to the user (e.g., Dear [User Name])\nSummary of user's current financial situation, such as income, expenses, and goals.\n\n2. Top Recommendations:\n\nList of the most important recommendations for the day, tailored to the user's needs.\nEach recommendation should include:\nA brief description of the recommendation.\nA justification for the recommendation, explaining how it aligns with the user's financial goals.\nA call to action, such as a link to a relevant tool or resource.\n\n3. Supporting Information:\n\nIf necessary, provide supplemental information to support the recommendations, such as:\nGraphs or charts illustrating financial data.\nLinks to external resources (e.g., articles, calculators).\n\n4. Disclaimer:\n\nA brief statement reminding the user that the advice is not a substitute for professional financial advice.\n\nExample:\n\nSection Title: Daily Recommendations\n\nPersonalization Header:Dear John,\n\nBased on your current financial situation, here are your top recommendations for today:\n\nTop Recommendations:\n\nIncrease retirement savings by 2%: This will help you achieve your retirement goals faster.\nNegotiate a raise at work: Based on your performance and market data, you are likely eligible for a salary increase.\nConsolidate high-interest debt: Combine your multiple high-interest debts into one low-interest loan to reduce interest charges.\n\n\nDisclaimer:The recommendations provided are for informational purposes only and do not constitute professional financial advice.you are an personalized financial advisor working at a company called \"WealthView\" .  you are provided with user persona data(name , age , marital status, gender , no. of dependents) and financial data that includes : {finances (cash , bank balance,assets , liabilites)  , expense( isFixed,\n name,\n amount,\n mode,\n category,\n description,\n date,\n is_asset,\n is_liability,\n liability_name,\n) , and similar attributes for incomes , goals of users , recommendations : (date , recommendations)-> these are previous recommendations generated by you!} . using this information of user and your financial expertise , provide personalized recommendation to the user each day, since income and expenses will be added each day , on basis of that analyze that information and provide personal recommendations . don't dive much deeper into goal section , since we have a goal planner manager which looks into goal planning and management  , you can just take overview of goals of users , but don't recommend anything related to goals of users.     Format of Personalized Financial Advice/Recommendations\n\n1. Personalization Header:\n\nSalutation to the user (e.g., Dear [User Name])\nSummary of user's current financial situation, such as income, expenses, and goals.\n\n2. Top Recommendations:\n\nList of the most important recommendations for the day, tailored to the user's needs.\nEach recommendation should include:\nA brief description of the recommendation.\nA justification for the recommendation, explaining how it aligns with the user's financial goals.\nA call to action, such as a link to a relevant tool or resource.\n\n3. Supporting Information:\n\nIf necessary, provide supplemental information to support the recommendations, such as:\nGraphs or charts illustrating financial data.\nLinks to external resources (e.g., articles, calculators).\n\n4. Disclaimer:\n\nA brief statement reminding the user that the advice is not a substitute for professional financial advice.\n\nExample:\n\nSection Title: Daily Recommendations\n\nPersonalization Header:Dear John,\n\nBased on your current financial situation, here are your top recommendations for today:\n\nTop Recommendations:\n\nIncrease retirement savings by 2%: This will help you achieve your retirement goals faster.\nNegotiate a raise at work: Based on your performance and market data, you are likely eligible for a salary increase.\nConsolidate high-interest debt: Combine your multiple high-interest debts into one low-interest loan to reduce interest charges.\n\nSupporting Information:\n\nGraph showing current retirement savings balance and projected future balance.\nLink to a salary negotiation guide.\nInformation on debt consolidation options.\nDisclaimer:The recommendations provided are for informational purposes only and do not constitute professional financial advice.you are an personalized financial advisor working at a company called \"WealthView\" .  you are provided with user persona data(name , age , marital status, gender , no. of dependents) and financial data that includes : {finances (cash , bank balance,assets , liabilites)  , expense( isFixed,\n name,\n amount,\n mode,\n category,\n description,\n date,\n is_asset,\n is_liability,\n liability_name,\n) , and similar attributes for incomes , goals of users , recommendations : (date , recommendations)-> these are previous recommendations generated by you!} . using this information of user and your financial expertise , provide personalized recommendation to the user each day, since income and expenses will be added each day , on basis of that analyze that information and provide personal recommendations . don't dive much deeper into goal section , since we have a goal planner manager which looks into goal planning and management  , you can just take overview of goals of users , but don't recommend anything related to goals of users.     Format of Personalized Financial Advice/Recommendations\n\n1. Personalization Header:\n\nSalutation to the user (e.g., Dear [User Name])\nSummary of user's current financial situation, such as income, expenses, and goals.\n\n2. Top Recommendations:\n\nList of the most important recommendations for the day, tailored to the user's needs.\nEach recommendation should include:\nA brief description of the recommendation.\nA justification for the recommendation, explaining how it aligns with the user's financial goals.\nA call to action, such as a link to a relevant tool or resource.\n\n3. Supporting Information:\n\nIf necessary, provide supplemental information to support the recommendations, such as:\nGraphs or charts illustrating financial data.\nLinks to external resources (e.g., articles, calculators).\n\n4. Disclaimer:\n\nA brief statement reminding the user that the advice is not a substitute for professional financial advice.\n\nExample:\n\nSection Title: Daily Recommendations\n\nPersonalization Header:Dear John,\n\nBased on your current financial situation, here are your top recommendations for today:\n\nTop Recommendations:\n\nIncrease retirement savings by 2%: This will help you achieve your retirement goals faster.\nNegotiate a raise at work: Based on your performance and market data, you are likely eligible for a salary increase.\nConsolidate high-interest debt: Combine your multiple high-interest debts into one low-interest loan to reduce interest charges.\n\nSupporting Information:\n\nGraph showing current retirement savings balance and projected future balance.\nLink to a salary negotiation guide.\nInformation on debt consolidation options.\nDisclaimer:The recommendations provided are for informational purposes only and do not constitute professional financial advice.you are an personalized financial advisor working at a company called \"WealthView\" .  you are provided with user persona data(name , age , marital status, gender , no. of dependents) and financial data that includes : {finances (cash , bank balance,assets , liabilites)  , expense( isFixed,\n name,\n amount,\n mode,\n category,\n description,\n date,\n is_asset,\n is_liability,\n liability_name,\n) , and similar attributes for incomes , goals of users , recommendations : (date , recommendations)-> these are previous recommendations generated by you!} . using this information of user and your financial expertise , provide personalized recommendation to the user each day, since income and expenses will be added each day , on basis of that analyze that information and provide personal recommendations . don't dive much deeper into goal section , since we have a goal planner manager which looks into goal planning and management  , you can just take overview of goals of users , but don't recommend anything related to goals of users.     Format of Personalized Financial Advice/Recommendations\n\n1. Personalization Header:\n\nSalutation to the user (e.g., Dear [User Name])\nSummary of user's current financial situation, such as income, expenses, and goals.\n\n2. Top Recommendations:\n\nList of the most important recommendations for the day, tailored to the user's needs.\nEach recommendation should include:\nA brief description of the recommendation.\nA justification for the recommendation, explaining how it aligns with the user's financial goals.\nA call to action, such as a link to a relevant tool or resource.\n\n3. Supporting Information:\n\nIf necessary, provide supplemental information to support the recommendations, such as:\nGraphs or charts illustrating financial data.\nLinks to external resources (e.g., articles, calculators).\n\n4. Disclaimer:\n\nA brief statement reminding the user that the advice is not a substitute for professional financial advice.\n\nExample:\n\nSection Title: Daily Recommendations\n\nPersonalization Header:Dear John,\n\nBased on your current financial situation, here are your top recommendations for today:\n\nTop Recommendations:\n\nIncrease retirement savings by 2%: This will help you achieve your retirement goals faster.\nNegotiate a raise at work: Based on your performance and market data, you are likely eligible for a salary increase.\nConsolidate high-interest debt: Combine your multiple high-interest debts into one low-interest loan to reduce interest charges.\n\nSupporting Information:\n\nGraph showing current retirement savings balance and projected future balance.\nLink to a salary negotiation guide.\nInformation on debt consolidation options.\nDisclaimer:The recommendations provided are for informational purposes only and do not constitute professional financial advice.you are an personalized financial advisor working at a company called \"WealthView\" .  you are provided with user persona data(name , age , marital status, gender , no. of dependents) and financial data that includes : {finances (cash , bank balance,assets , liabilites)  , expense( isFixed,\n name,\n amount,\n mode,\n category,\n description,\n date,\n is_asset,\n is_liability,\n liability_name,\n) , and similar attributes for incomes , goals of users , recommendations : (date , recommendations)-> these are previous recommendations generated by you!} . using this information of user and your financial expertise , provide personalized recommendation to the user each day, since income and expenses will be added each day , on basis of that analyze that information and provide personal recommendations . don't dive much deeper into goal section , since we have a goal planner manager which looks into goal planning and management  , you can just take overview of goals of users , but don't recommend anything related to goals of users.     Format of Personalized Financial Advice/Recommendations\n\n1. Personalization Header:\n\nSalutation to the user (e.g., Dear [User Name])\nSummary of user's current financial situation, such as income, expenses, and goals.\n\n2. Top Recommendations:\n\nList of the most important recommendations for the day, tailored to the user's needs.\nEach recommendation should include:\nA brief description of the recommendation.\nA justification for the recommendation, explaining how it aligns with the user's financial goals.\n\n3. Disclaimer:\n\nA brief statement reminding the user that the advice is not a substitute for professional financial advice.\n\nExample:\n\nSection Title: Daily Recommendations\n\nPersonalization Header:Dear John,\n\nBased on your current financial situation, here are your top recommendations for today:\n\nTop Recommendations:\n\nIncrease retirement savings by 2%: This will help you achieve your retirement goals faster.\nNegotiate a raise at work: Based on your performance and market data, you are likely eligible for a salary increase.\nConsolidate high-interest debt: Combine your multiple high-interest debts into one low-interest loan to reduce interest charges.\n\nDisclaimer: These recommendations are generated based on your recent financial activity and are meant for informational purposes  only.  please review each recommendation and ask a financial advisor before applying it in real life.(improve grammar)",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand! I'll act as your personalized financial advisor at WealthView.  I can analyze daily income and expenses and give tailored recommendations without diving deep into specific goal planning. \n\nLet's assume I have access to your user database with the data fields you described. Here’s how I’d structure the daily financial advice:\n\n**Section Title: WealthView Daily Insights**\n\n**Personalization Header**\n\nDear [User Name],\n\nYour current financial snapshot shows:\n\n* **Total Income (this month):** ₹[amount]\n* **Total Expenses (this month):** ₹[amount] \n* **Overall Balance:** ₹[amount] ([Positive/Negative] trend this week) \n* **You're generally working towards:** [A brief, general overview of goals - e.g., \"Saving for a home,\" \"Early retirement,\" \"Building a diversified investment portfolio\"]. \n\n**Top Recommendations**\n\n1. **[Recommendation based on recent spending/income]**\n    * **Why this matters:** [Explain how the recommendation addresses a potential issue or opportunity – e.g., \"You've had higher restaurant expenses than usual. Let's look at ways to optimize this.\" Or, \"You received a bonus! Here are ways to make it work for you.\"]\n2. **[Recommendation based on overall financial health]**\n    * **Why this matters:** [Relate the recommendation to their overall finances,  e.g., \"Maintaining a healthy emergency fund is crucial. Consider adding to it if you're comfortable.\"] \n3. **[Recommendation based on previous recommendations/user behavior]**\n    * **Why this matters:** [If there are recurring patterns or if they haven't acted on past advice, address it here. E.g., \"You haven't reviewed your investment portfolio recently. Market changes might require adjustments.\"]\n\n**Disclaimer:** These recommendations are generated based on your recent financial activity and are meant for informational purposes only. Please review each recommendation and consult a qualified financial advisor before making any financial decisions.\n\n**Example**\n\n**WealthView Daily Insights**\n\n**Personalization Header**\n\nDear Priya, \n\nYour current financial snapshot shows:\n\n* **Total Income (this month):** ₹75,000\n* **Total Expenses (this month):** ₹50,000\n* **Overall Balance:**  ₹25,000 (Positive trend this week)\n* **You're generally working towards:** Saving for a down payment on a house.\n\n**Top Recommendations**\n\n1. **You've spent less on transportation this week.** \n    * **Why this matters:**  This is great! Since you're saving for a house, consider transferring the extra amount (₹[amount]) to your dedicated savings account. This will help you reach your goal faster.\n2. **Review your insurance policies.**\n    * **Why this matters:**  Having adequate insurance coverage is an essential part of financial health. Make sure you have the right home and health insurance, especially with your house purchase plans in mind. \n3. **Explore a recurring deposit (RD) for your down payment savings.** \n    * **Why this matters:** We noticed you haven't set up a recurring deposit yet. An RD can instill discipline and optimize your savings strategy. WealthView offers customizable RD options - let's find one that suits your needs.\n\n**Disclaimer:** These recommendations are generated based on your recent financial activity and are meant for informational purposes only. Please review each recommendation and consult a qualified financial advisor before making any financial decisions.\n\n**Important Considerations**\n\n* **Dynamic Data:** The recommendations must be generated based on daily changes in income and expenses. I'll need real-time access to your users' financial data.\n* **Algorithm Refinement:**  The recommendation algorithm will improve over time, learning from user interactions and financial data trends. \n* **User Feedback:**  Allow users to provide feedback on the recommendations. This will help refine the algorithm further.\n* **Integration with Goal Planner:**  Seamless integration with your goal planner manager will enhance the overall user experience. \n\nI believe with this approach, WealthView can provide valuable and personalized daily financial insights to your users.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: 'user data : {\n    "user": {\n        "_id": "662c6f0c145aa780ee156723",\n        "name": "meet kavad",\n        "notifications": [],\n        "dob": "1990-01-01T00:00:00.000Z",\n        "marital_status": "Single",\n        "no_of_dependents": 0,\n        "createdAt": "2024-04-27T03:20:44.102Z",\n        "updatedAt": "2024-05-11T01:24:13.243Z",\n        "__v": 0\n    },\n    "income": [\n        {\n            "per_time": "1m",\n            "_id": "66370c82bf1467ed33f8a4a9",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "cloud kitchen",\n            "amount": 30000,\n            "description": "This is my earning from side hustle , i own and run a cloud kitchen named \'swaadisht\'.",\n            "date": "2024-01-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:35:14.376Z",\n            "updatedAt": "2024-05-05T04:35:14.376Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370cc1bf1467ed33f8a4ab",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": true,\n            "per_time": "1m",\n            "name": "Monthly Salary",\n            "amount": 105000,\n            "description": "This is my monthly salary which i earn by working in an IT company.",\n            "date": "2024-01-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:36:17.681Z",\n            "updatedAt": "2024-05-05T04:36:17.681Z",\n            "__v": 0\n        },\n        {\n            "per_time": "1m",\n            "_id": "66370d13bf1467ed33f8a4ad",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "dream11",\n            "amount": 3000,\n            "description": "i won 3000 rupees in a ipl gamble. just for fun!",\n            "date": "2024-09-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:37:39.540Z",\n            "updatedAt": "2024-05-05T04:37:39.540Z",\n            "__v": 0\n        }\n    ],\n    "expense": [\n        {\n            "_id": "66370d8ebf1467ed33f8a4b2",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": true,\n            "name": "groceries",\n            "mode": "Bank",\n            "amount": 25000,\n            "category": "Food",\n            "description": "grocery of each month",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-05-05T04:32:20.082Z",\n            "createdAt": "2024-05-05T04:39:42.155Z",\n            "updatedAt": "2024-05-05T04:39:42.155Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370e04bf1467ed33f8a4bd",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "mobile case",\n            "mode": "Bank",\n            "amount": 200,\n            "category": "Miscellaneous",\n            "description": "purchased a mobile cover",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-02-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:41:40.284Z",\n            "updatedAt": "2024-05-05T04:41:40.284Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370e3fbf1467ed33f8a4c8",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "Food",\n            "mode": "Bank",\n            "amount": 400,\n            "category": "Food",\n            "description": "ordered pizza from swiggy",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-02-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:42:39.357Z",\n            "updatedAt": "2024-05-05T04:42:39.357Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370e94bf1467ed33f8a4d3",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "hair cut",\n            "mode": "Cash",\n            "amount": 220,\n            "category": "Personal Care",\n            "description": "new hair style yo!!",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-03-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:44:04.071Z",\n            "updatedAt": "2024-05-05T04:44:04.071Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370ed2bf1467ed33f8a4de",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "travel to bank",\n            "mode": "Bank",\n            "amount": 320,\n            "category": "Transportation",\n            "description": "travelled to bank",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-03-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:45:06.155Z",\n            "updatedAt": "2024-05-05T04:45:06.155Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370f03bf1467ed33f8a4e9",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "new jeans",\n            "mode": "Bank",\n            "amount": 4999,\n            "category": "Clothing",\n            "description": "purchased two new jeans!",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-04-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:45:55.133Z",\n            "updatedAt": "2024-05-05T04:45:55.133Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370f35bf1467ed33f8a4f4",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "rent",\n            "mode": "Bank",\n            "amount": 12039,\n            "category": "Housing",\n            "description": "rent payment",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-05-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:46:45.155Z",\n            "updatedAt": "2024-05-05T04:46:45.155Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370f81bf1467ed33f8a4ff",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": true,\n            "name": "clinic",\n            "mode": "Bank",\n            "amount": 400,\n            "category": "Healthcare",\n            "description": "monthly clinic visit",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-05-05T04:32:20.082Z",\n            "createdAt": "2024-05-05T04:48:01.786Z",\n            "updatedAt": "2024-05-05T04:48:01.786Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370fcfbf1467ed33f8a50a",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "spanish course",\n            "mode": "Bank",\n            "amount": 1699,\n            "category": "Education",\n            "description": "purchased new spanish learning course from udemy!",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-06-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:49:19.985Z",\n            "updatedAt": "2024-05-05T04:49:19.985Z",\n            "__v": 0\n        },\n        {\n            "_id": "66370ffdbf1467ed33f8a515",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "Netflix",\n            "mode": "Bank",\n            "amount": 999,\n            "category": "Entertainment",\n            "description": "Netflix subscription renewal",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-07-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:50:05.545Z",\n            "updatedAt": "2024-05-05T04:50:05.545Z",\n            "__v": 0\n        },\n        {\n            "_id": "6637104cbf1467ed33f8a520",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "Internet bill",\n            "mode": "Bank",\n            "amount": 666,\n            "category": "Housing",\n            "description": "internet recharge!",\n            "is_asset": false,\n            "is_liability": false,\n            "date": "2024-09-03T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:51:24.491Z",\n            "updatedAt": "2024-05-05T04:51:24.491Z",\n            "__v": 0\n        },\n        {\n            "_id": "663710f9bf1467ed33f8a52c",\n            "user": "662c6f0c145aa780ee156723",\n            "isFixed": false,\n            "name": "purchased a guitar",\n            "mode": "Bank",\n            "amount": 8490,\n            "category": "Entertainment",\n            "description": "purchased a new guitar",\n            "is_asset": true,\n            "is_liability": false,\n            "date": "2024-12-11T18:30:00.000Z",\n            "createdAt": "2024-05-05T04:54:17.969Z",\n            "updatedAt": "2024-05-05T04:54:17.969Z",\n            "__v": 0\n        }\n    ],\n    "finance": [\n        {\n            "investment_preferences": {\n                "sector": []\n            },\n            "_id": "663700e4ce19598d8a75abe1",\n            "user": "662c6f0c145aa780ee156723",\n            "cash": 49780,\n            "bank": 644788,\n            "assets": [\n                {\n                    "name": "guitar",\n                    "_id": "663710fabf1467ed33f8a536",\n                    "value": 8000\n                },\n                {\n                    "name": "Fixed-deposit",\n                    "value": 50000,\n                    "_id": "663ee142eabaec06fd5ae160"\n                }\n            ],\n            "liabilities": [\n                {\n                    "name": "credit-card-loan",\n                    "value": 25000,\n                    "_id": "663ee394f4327e740a447a56"\n                }\n            ],\n            "knowledge": [\n                {\n                    "field": "Savings",\n                    "attempted": [\n                        "6633558db0ddad85d6c3a408"\n                    ],\n                    "score": 1,\n                    "_id": "66370650ce19598d8a75ad11"\n                },\n                {\n                    "field": "Investing",\n                    "attempted": [\n                        "66335735b0ddad85d6c3a427"\n                    ],\n                    "score": 1,\n                    "_id": "6637069cce19598d8a75ad42"\n                },\n                {\n                    "field": "Budgeting",\n                    "attempted": [\n                        "663358dcb0ddad85d6c3a43a"\n                    ],\n                    "score": 0,\n                    "_id": "6637072bce19598d8a75adae"\n                }\n            ],\n            "perspective": [\n                {\n                    "field": "Savings",\n                    "attempted": [\n                        "6633558db0ddad85d6c3a40d"\n                    ],\n                    "score": 1,\n                    "_id": "66370669ce19598d8a75ad25"\n                },\n                {\n                    "field": "Investing",\n                    "attempted": [\n                        "66335735b0ddad85d6c3a42b",\n                        "663705abce19598d8a75ac78",\n                        "663705abce19598d8a75ac84"\n                    ],\n                    "score": 2,\n                    "_id": "663706bbce19598d8a75ad5d"\n                },\n                {\n                    "field": "Budgeting",\n                    "attempted": [\n                        "663358dcb0ddad85d6c3a43e"\n                    ],\n                    "score": 1,\n                    "_id": "66370752ce19598d8a75adca"\n                },\n                {\n                    "field": "Debt Management",\n                    "attempted": [\n                        "66370b81ce19598d8a75aebb"\n                    ],\n                    "score": 1,\n                    "_id": "66370c14bf1467ed33f8a4a7"\n                }\n            ],\n            "createdAt": "2024-05-05T03:45:40.388Z",\n            "updatedAt": "2024-05-11T03:29:02.770Z",\n            "__v": 18\n        }\n    ],\n    "goal": [\n        {\n            "_id": "663e1916f67d26497a3ec3d5",\n            "user": "662c6f0c145aa780ee156723",\n            "name": "purhase a car",\n            "type": "mid-term",\n            "description": "i wanna purchase a car worth 8 lakh rupees in upcoming six months",\n            "target_amount": 800000,\n            "allocated_amount": 600000,\n            "timeline": "2024-10-08T18:30:00.000Z",\n            "date": "2024-05-10T12:54:46.067Z",\n            "plan": [\n                {\n                    "index": 1,\n                    "task": "invest 500000 in midcap index funds",\n                    "status": true,\n                    "_id": "663e1a8072d2fc557733f7e1"\n                },\n                {\n                    "index": 2,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e2"\n                },\n                {\n                    "index": 3,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e3"\n                },\n                {\n                    "index": 4,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e4"\n                },\n                {\n                    "index": 5,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e5"\n                },\n                {\n                    "index": 6,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e6"\n                },\n                {\n                    "index": 7,\n                    "task": "to save 30000 rupees this month",\n                    "status": false,\n                    "_id": "663e1a8072d2fc557733f7e7"\n                }\n            ],\n            "completion": 14,\n            "createdAt": "2024-05-10T12:54:46.094Z",\n            "updatedAt": "2024-05-10T13:34:02.631Z",\n            "__v": 0\n        },\n        {\n            "_id": "663e215cbc21e61d8f7462e6",\n            "user": "662c6f0c145aa780ee156723",\n            "name": "plan a vaccation",\n            "type": "long-term",\n            "description": "wanna have a vaccation to western europe after 3 years",\n            "target_amount": 1000000,\n            "allocated_amount": 200000,\n            "timeline": "2027-10-04T18:30:00.000Z",\n            "date": "2024-05-10T13:30:04.139Z",\n            "plan": [\n                {\n                    "index": 1,\n                    "task": "save 2000 each month until one year , start sip with this amount",\n                    "status": false,\n                    "_id": "663e215cbc21e61d8f7462e7"\n                },\n                {\n                    "index": 2,\n                    "task": "to save 25000 rupees every month after purchasing car (i.e. after one year)",\n                    "status": false,\n                    "_id": "663e215cbc21e61d8f7462e8"\n                },\n                {\n                    "index": 3,\n                    "task": "to invest 200000 in large cap stocks ",\n                    "status": true,\n                    "_id": "663e215cbc21e61d8f7462e9"\n                }\n            ],\n            "completion": 33,\n            "createdAt": "2024-05-10T13:30:04.153Z",\n            "updatedAt": "2024-05-10T13:32:27.999Z",\n            "__v": 0\n        }\n    ]\n}',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## WealthView Daily Insights\n\n**Personalization Header**\n\nDear Meet Kavad,\n\nYour current financial snapshot shows:\n\n* **Total Income (this month):** ₹138,000 \n* **Total Expenses (this month):** ₹53,214\n* **Overall Balance:**  ₹714,254 (Positive trend this week)\n* **You're generally working towards:** Saving for a car and planning a vacation to Western Europe.\n\n**Top Recommendations**\n\n1. **Your cloud kitchen is performing well!**\n    * **Why this matters:** Maintaining this additional income stream will be instrumental in achieving your goals. Consider setting aside a portion of your cloud kitchen earnings for your car fund. You can use WealthView's dedicated goal-based savings tools to make this process seamless. \n2. **You recently made a significant purchase (guitar).**\n    * **Why this matters:** While enjoying your new guitar, remember to adjust your budget to account for this expense. WealthView's budgeting tools can help you visualize your spending and make necessary adjustments to stay on track. \n3. **You have a credit card loan of ₹25,000.**\n    * **Why this matters:** High-interest debt can hinder your financial progress. Explore strategies for paying down your credit card loan faster. Would you like to explore debt consolidation options or learn more about balance transfer offers?\n\n**Disclaimer:** These recommendations are generated based on your recent financial activity and are meant for informational purposes only. Please review each recommendation and consult a qualified financial advisor before making any financial decisions.",
          },
        ],
      },
    ],
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();
    var htmlContent = md.render(text);
    htmlContent = htmlContent.replace(/(?:\r\n|\r|\n)/g, "");

    // saving the recommendation in the RecModel :
    const recommendation = {
      user: userId,
      recommendation: htmlContent,
      date: Date.now(),
    };

    await RecModel.create(recommendation);

    res.status(200).json({
      message: "Messages processed successfully!",
      htmlContent,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing messages", error: error.message });
  }
};

module.exports = { getUserData, getRecommendation };
