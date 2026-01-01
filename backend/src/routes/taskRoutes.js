const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks
} = require("../controllers/taskController");
console.log("🔥 taskRoutes FILE LOADED");


router.post("/", protect, (req, res, next) => {
  console.log("🔥 POST /api/tasks HIT");
  next();
}, createTask);

router.get("/", protect, getTasks);

module.exports = router;
