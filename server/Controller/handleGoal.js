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
    res.status(201).json({
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
      timeline: timeline || goal.timeline,
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
        message: "Error Deleting successfully",
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

module.exports = {
  setGoal,
  editGoal,
  getGoal,
  deleteGoal,
  planTracking,
};
