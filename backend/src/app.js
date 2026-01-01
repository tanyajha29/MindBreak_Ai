const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️ INCOMING:", req.method, req.originalUrl);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.send("🚀 DayBreak API Running");
});

app.use(errorHandler);

module.exports = app;
