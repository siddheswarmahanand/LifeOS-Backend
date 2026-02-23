const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createGoal,
  getMyGoals,
  updateGoal,
  completeGoal,
  deleteGoal,
} = require("../controllers/goalController");

// 🟢 Create Goal
router.post("/", protect, createGoal);

// 📋 Get My Goals
router.get("/", protect, getMyGoals);

// ✏ Update Goal
router.put("/:id", protect, updateGoal);

// ✅ Complete Goal
router.put("/:id/complete", protect, completeGoal);

// 🗑 Delete Goal
router.delete("/:id", protect, deleteGoal);

module.exports = router;