const Goal = require("../models/Goal");

// 🟢 Create Goal
const createGoal = async (req, res) => {
  try {
    const { title, category } = req.body;

    const goal = await Goal.create({
      title,
      category,
      user: req.user.id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📋 GET MY GOALS (Pagination + Filtering)
const getMyGoals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const category = req.query.category;

    const query = { user: req.user.id };

    if (category) {
      query.category = category;
    }

    const total = await Goal.countDocuments(query);

    const goals = await Goal.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalGoals: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      goals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏ Update Goal
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Complete Goal
const completeGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.completed = true;
    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑 Delete Goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    await goal.deleteOne();

    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGoal,
  getMyGoals,
  updateGoal,
  completeGoal,
  deleteGoal,
};