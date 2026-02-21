const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["study", "fitness", "personal", "work", "other"],
      default: "personal",
    },

    targetDate: {
      type: Date,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);