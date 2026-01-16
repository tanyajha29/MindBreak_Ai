const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTaskStatus
} = require("../controllers/taskController");



router.post("/", protect, (req, res, next) => {
  
  next();
}, createTask);

router.patch("/:id", protect, updateTaskStatus);
router.get("/", protect, getTasks);

module.exports = router;
