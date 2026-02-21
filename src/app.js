const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const protect = require("./middleware/authMiddleware");
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api/goals", goalRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("LifeOS API Running 🚀");
});

module.exports = app;
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed successfully 🔐",
    user: req.user,
  });
});
