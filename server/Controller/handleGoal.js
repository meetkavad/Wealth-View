const GoalModel = require("../Model/GoalModel");

const setGoal = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      target_amount,
      allocated_amount,
      timeline,
      plan,
    } = req.body;

    const userId = req.user.id;
    const date = Date.now();
    const goal = {
      user: userId,
      name,
      type,
      description,
      target_amount,
      allocated_amount,
      timeline,
      plan,
      date,
    };

    const newGoal = await GoalModel.create(goal);
    res.status(200).json({
      message: "goal created successfully",
      goal: newGoal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const editGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      description,
      target_amount,
      allocated_amount,
      timeline,
      plan,
    } = req.body;
    const goal = await GoalModel.findById(id);
    if (!goal) {
      return res.status(404).json({
        message: "goal not found",
      });
    }

    const editedGoal = {
      name: name || goal.name,
      type: type || goal.type,
      description: description || goal.description,
      target_amount: target_amount || goal.target_amount,
      allocated_amount: allocated_amount || goal.allocated_amount,
      timeline:
        timeline || goal.timeline.split("T")[0].split("-").reverse().join("-"),
      plan: plan || goal.plan,
    };

    const updatedGoal = await GoalModel.findOneAndUpdate(
      { _id: id },
      editedGoal,
      {
        new: true,
      }
    );

    res.status(200).json({
      goal: updatedGoal,
      message: "goal updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // if a single id then that goal else all of the goals are sent
    let goal;
    if (id) {
      goal = await GoalModel.findById(id);
    } else {
      goal = await GoalModel.find({ user: userId });
    }
    if (!goal) {
      return res.status(404).json({
        message: "goal not found",
      });
    }
    return res.status(200).json({
      message: "goal found successfully",
      goal: goal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGoal = await GoalModel.findOneAndDelete({ _id: id });
    if (deleteGoal) {
      return res.status(200).json({
        message: "goal deleted successfully",
        goal: deleteGoal,
      });
    } else {
      return res.status(400).json({
        message: "Error Deleting goal",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const planTracking = async (req, res) => {
  try {
    const { goalId, taskId } = req.params;
    const goal = await GoalModel.findById(goalId);
    if (!goal) {
      return res.status(404).json({
        message: "goal not found",
      });
    }

    // getting a particular task :
    const task = goal.plan.id(taskId);

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    // updating task status :
    if (task.status) {
      task.status = false;
    } else {
      task.status = true;
    }
    await goal.save();

    // getting total tasks :
    const numTask = goal.plan.length;

    var count = 0;
    for (let task of goal.plan) {
      if (task.status) count += 1;
    }

    const complete = Math.floor((count / numTask) * 100);

    goal.completion = complete;
    await goal.save();

    return res.status(200).json({
      message: "task status updated successfully",
      completion: goal.completion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ai response :

require("dotenv").config();
const markdownIt = require("markdown-it");
const md = markdownIt();

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = process.env.GEMINI_API_KEY;

const getGoalReview = async (req, res) => {
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
            text: "you are an expert of financial goal planning and management  at an indian company called \"WEALTHVIEW\" , you will be the goal data and expense data of user , you need to review the goals of users and give advice and recommendations to the user based on their goal and to make the plan of goal more effective and achievable!  the format for goal review will be :   Recommendations for Effective and Achievable Goal PlanningData to be Returned:Prioritized Goal List: List of all user goals prioritized based on the following criteria:ImportanceUrgencyTimelineRevised Plans for Each Goal:Name: Name of the goalTarget Amount: Revised target amount, if necessaryAllocated Amount: Revised allocated amount, if necessaryTimeline: Revised timeline, if necessaryPlan: Revised or optimized planRationale: Explanation for any changes madeOverall Recommendations:Budget Allocation: Recommendations for redistributing funds or increasing savings to support all goalsInvestment Strategies: Suggestions for optimizing investments towards different goals based on risk tolerance and timelineTax-Saving Options: Advice on utilizing tax-saving instruments to reduce financial burdenBehavioral Changes: Recommendations for improving financial habits to enhance goal achievementOther Financial Considerations: Any additional recommendations relevant to the user's overall financial situationFormat:Prioritized Goal List: Tabular format with columns for Name, Importance, Urgency, TimelineRevised Plans for Each Goal: Tabular format with columns for Name, Target Amount, Allocated Amount, Timeline, Plan, RationaleOverall Recommendations: Bulleted list with subheadings for each recommendation categoryAdditional Considerations:Risk Tolerance: Assess the user's risk tolerance and recommend appropriate investment strategies.Time Horizon: Consider the timeline for each goal and recommend suitable investment options and saving plans.Inflation: Adjust target amounts and allocated amounts to account for inflation over the goal's timeline.Regular Reviews: Encourage the user to regularly review and adjust their goals and plans to ensure alignment with their financial situation and changing priorities. don't include any other stuff excpet the recommendations  and other things that you are called to include once data is provided",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Please provide me with the user's goal data and expense data. I will then analyze the information and provide you with a comprehensive review of their goals, including:\n\n**Prioritized Goal List:**\n\n| Name | Importance | Urgency | Timeline |\n|---|---|---|---|\n| ... | ... | ... | ... |\n\n**Revised Plans for Each Goal:**\n\n| Name | Target Amount | Allocated Amount | Timeline | Plan | Rationale |\n|---|---|---|---|---|---|\n| ... | ... | ... | ... | ... | ... |\n\n**Overall Recommendations:**\n\n* **Budget Allocation:** \n    * ...\n* **Investment Strategies:** \n    * ...\n* **Tax-Saving Options:** \n    * ...\n* **Behavioral Changes:** \n    * ...\n* **Other Financial Considerations:** \n    * ...",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: '   "goal": [        {            "_id": "663e1916f67d26497a3ec3d5",            "user": "662c6f0c145aa780ee156723",            "name": "purhase a car",            "type": "mid-term",            "description": "i wanna purchase a car worth 8 lakh rupees in upcoming six months",            "target_amount": 800000,            "allocated_amount": 600000,            "timeline": "2024-10-08T18:30:00.000Z",            "date": "2024-05-10T12:54:46.067Z",            "plan": [                {                    "index": 1,                    "task": "invest 500000 in midcap index funds",                    "status": true,                    "_id": "663e1a8072d2fc557733f7e1"                },                {                    "index": 2,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e2"                },                {                    "index": 3,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e3"                },                {                    "index": 4,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e4"                },                {                    "index": 5,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e5"                },                {                    "index": 6,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e6"                },                {                    "index": 7,                    "task": "to save 30000 rupees this month",                    "status": false,                    "_id": "663e1a8072d2fc557733f7e7"                }            ],            "completion": 14,            "createdAt": "2024-05-10T12:54:46.094Z",            "updatedAt": "2024-05-10T13:34:02.631Z",            "__v": 0        },        {            "_id": "663e215cbc21e61d8f7462e6",            "user": "662c6f0c145aa780ee156723",            "name": "plan a vaccation",            "type": "long-term",            "description": "wanna have a vaccation to western europe after 3 years",            "target_amount": 1000000,            "allocated_amount": 200000,            "timeline": "2027-10-04T18:30:00.000Z",            "date": "2024-05-10T13:30:04.139Z",            "plan": [                {                    "index": 1,                    "task": "save 2000 each month until one year , start sip with this amount",                    "status": false,                    "_id": "663e215cbc21e61d8f7462e7"                },                {                    "index": 2,                    "task": "to save 25000 rupees every month after purchasing car (i.e. after one year)",                    "status": false,                    "_id": "663e215cbc21e61d8f7462e8"                },                {                    "index": 3,                    "task": "to invest 200000 in large cap stocks ",                    "status": true,                    "_id": "663e215cbc21e61d8f7462e9"                }            ],            "completion": 33,            "createdAt": "2024-05-10T13:30:04.153Z",            "updatedAt": "2024-05-10T13:32:27.999Z",            "__v": 0        }    ] {    "expenses": [        {            "_id": "66370d8ebf1467ed33f8a4b2",            "user": "662c6f0c145aa780ee156723",            "isFixed": true,            "name": "groceries",            "mode": "Bank",            "amount": 25000,            "category": "Food",            "description": "grocery of each month",            "is_asset": false,            "is_liability": false,            "date": "2024-05-05T04:32:20.082Z",            "createdAt": "2024-05-05T04:39:42.155Z",            "updatedAt": "2024-05-05T04:39:42.155Z",            "__v": 0        },        {            "_id": "66370e04bf1467ed33f8a4bd",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "mobile case",            "mode": "Bank",            "amount": 200,            "category": "Miscellaneous",            "description": "purchased a mobile cover",            "is_asset": false,            "is_liability": false,            "date": "2024-02-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:41:40.284Z",            "updatedAt": "2024-05-05T04:41:40.284Z",            "__v": 0        },        {            "_id": "66370e3fbf1467ed33f8a4c8",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "Food",            "mode": "Bank",            "amount": 400,            "category": "Food",            "description": "ordered pizza from swiggy",            "is_asset": false,            "is_liability": false,            "date": "2024-02-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:42:39.357Z",            "updatedAt": "2024-05-05T04:42:39.357Z",            "__v": 0        },        {            "_id": "66370e94bf1467ed33f8a4d3",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "hair cut",            "mode": "Cash",            "amount": 220,            "category": "Personal Care",            "description": "new hair style yo!!",            "is_asset": false,            "is_liability": false,            "date": "2024-03-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:44:04.071Z",            "updatedAt": "2024-05-05T04:44:04.071Z",            "__v": 0        },        {            "_id": "66370ed2bf1467ed33f8a4de",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "travel to bank",            "mode": "Bank",            "amount": 320,            "category": "Transportation",            "description": "travelled to bank",            "is_asset": false,            "is_liability": false,            "date": "2024-03-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:45:06.155Z",            "updatedAt": "2024-05-05T04:45:06.155Z",            "__v": 0        },        {            "_id": "66370f03bf1467ed33f8a4e9",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "new jeans",            "mode": "Bank",            "amount": 4999,            "category": "Clothing",            "description": "purchased two new jeans!",            "is_asset": false,            "is_liability": false,            "date": "2024-04-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:45:55.133Z",            "updatedAt": "2024-05-05T04:45:55.133Z",            "__v": 0        },        {            "_id": "66370f35bf1467ed33f8a4f4",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "rent",            "mode": "Bank",            "amount": 12039,            "category": "Housing",            "description": "rent payment",            "is_asset": false,            "is_liability": false,            "date": "2024-05-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:46:45.155Z",            "updatedAt": "2024-05-05T04:46:45.155Z",            "__v": 0        },        {            "_id": "66370f81bf1467ed33f8a4ff",            "user": "662c6f0c145aa780ee156723",            "isFixed": true,            "name": "clinic",            "mode": "Bank",            "amount": 400,            "category": "Healthcare",            "description": "monthly clinic visit",            "is_asset": false,            "is_liability": false,            "date": "2024-05-05T04:32:20.082Z",            "createdAt": "2024-05-05T04:48:01.786Z",            "updatedAt": "2024-05-05T04:48:01.786Z",            "__v": 0        },        {            "_id": "66370fcfbf1467ed33f8a50a",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "spanish course",            "mode": "Bank",            "amount": 1699,            "category": "Education",            "description": "purchased new spanish learning course from udemy!",            "is_asset": false,            "is_liability": false,            "date": "2024-06-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:49:19.985Z",            "updatedAt": "2024-05-05T04:49:19.985Z",            "__v": 0        },        {            "_id": "66370ffdbf1467ed33f8a515",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "Netflix",            "mode": "Bank",            "amount": 999,            "category": "Entertainment",            "description": "Netflix subscription renewal",            "is_asset": false,            "is_liability": false,            "date": "2024-07-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:50:05.545Z",            "updatedAt": "2024-05-05T04:50:05.545Z",            "__v": 0        },        {            "_id": "6637104cbf1467ed33f8a520",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "Internet bill",            "mode": "Bank",            "amount": 666,            "category": "Housing",            "description": "internet recharge!",            "is_asset": false,            "is_liability": false,            "date": "2024-09-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:51:24.491Z",            "updatedAt": "2024-05-05T04:51:24.491Z",            "__v": 0        },        {            "_id": "663710f9bf1467ed33f8a52c",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "purchased a guitar",            "mode": "Bank",            "amount": 8490,            "category": "Entertainment",            "description": "purchased a new guitar",            "is_asset": true,            "is_liability": false,            "date": "2024-12-11T18:30:00.000Z",            "createdAt": "2024-05-05T04:54:17.969Z",            "updatedAt": "2024-05-05T04:54:17.969Z",            "__v": 0        }    ]} {    "incomes": [        {            "per_time": "1m",            "_id": "66370c82bf1467ed33f8a4a9",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "cloud kitchen",            "amount": 30000,            "description": "This is my earning from side hustle , i own and run a cloud kitchen named \'swaadisht\'.",            "date": "2024-01-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:35:14.376Z",            "updatedAt": "2024-05-05T04:35:14.376Z",            "__v": 0        },        {            "_id": "66370cc1bf1467ed33f8a4ab",            "user": "662c6f0c145aa780ee156723",            "isFixed": true,            "per_time": "1m",            "name": "Monthly Salary",            "amount": 105000,            "description": "This is my monthly salary which i earn by working in an IT company.",            "date": "2024-01-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:36:17.681Z",            "updatedAt": "2024-05-05T04:36:17.681Z",            "__v": 0        },        {            "per_time": "1m",            "_id": "66370d13bf1467ed33f8a4ad",            "user": "662c6f0c145aa780ee156723",            "isFixed": false,            "name": "dream11",            "amount": 3000,            "description": "i won 3000 rupees in a ipl gamble. just for fun!",            "date": "2024-09-03T18:30:00.000Z",            "createdAt": "2024-05-05T04:37:39.540Z",            "updatedAt": "2024-05-05T04:37:39.540Z",            "__v": 0        }    ]}',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Prioritized Goal List:\n\n| Name | Importance | Urgency | Timeline |\n|---|---|---|---|\n| Purchase a car | High | High | 2024-10-08 |\n| Plan a vacation | Medium | Low | 2027-10-04 |\n\n## Revised Plans for Each Goal:\n\n| Name | Target Amount | Allocated Amount | Timeline | Plan | Rationale |\n|---|---|---|---|---|---|\n| Purchase a car | 800000 | 600000 | 2024-10-08 | * Continue investing 500000 in mid-cap index funds.  * Increase monthly savings to 40000 to reach the goal within the timeline.  | The current monthly saving rate is insufficient to reach the goal. Increasing it to 40000 will ensure timely completion. |\n| Plan a vacation | 1100000 | 200000 | 2027-10-04 | * Continue saving 2000 each month for SIP for the next year.  * After purchasing the car, increase monthly savings to 25000.  * Consider diversifying investments, allocating a portion to fixed-income securities to mitigate risk. | Adjusted the target amount considering an average 3% inflation over 3 years. Diversifying investments will help manage risk for this long-term goal. |\n\n\n## Overall Recommendations:\n\n* **Budget Allocation:**\n    * Analyze your expenses and identify areas where you can reduce spending.\n    * Track your expenses meticulously to maintain control over your budget.\n    * Create a realistic monthly budget that accommodates increased savings for your goals.\n* **Investment Strategies:**\n    * While mid-cap funds are suitable for the car purchase (mid-term goal), consider diversifying for the vacation. \n    *  Include large-cap equity funds and fixed-income instruments to create a balanced portfolio.\n    *  Adjust the asset allocation based on your risk tolerance and time horizon. \n* **Tax-Saving Options:**\n    * Explore tax-saving instruments like ELSS (Equity Linked Saving Scheme) to benefit from tax deductions while investing in equity markets. \n    * Maximize contributions to PPF (Public Provident Fund) for long-term savings with tax benefits.\n* **Behavioral Changes:**\n    * Automate your savings by setting up recurring transfers to your investment accounts.\n    * Consider using budgeting apps or tools to track your income and expenses effectively.\n    * Set up financial reminders to stay on top of bills and investment contributions.\n* **Other Financial Considerations:**\n    * Build an emergency fund equivalent to 3-6 months of living expenses.\n    * Consider taking out health and life insurance policies for comprehensive protection. \n    *  Review your financial plan regularly and adjust it based on life changes and market conditions.",
          },
        ],
      },
    ],
  });

  try {
    // getting user finacial goals :
    userId = req.user.id;
    const goals = await GoalModel.find({ user: userId });

    const result = await chat.sendMessage(goals);
    const response = result.response;
    const text = response.text();
    var htmlContent = md.render(text);
    htmlContent = htmlContent.replace(/(?:\r\n|\r|\n)/g, "");

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

module.exports = {
  setGoal,
  editGoal,
  getGoal,
  deleteGoal,
  planTracking,
  getGoalReview,
};
