const router = require("express").Router();
const { getInsights } = require("../controllers/insightsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getInsights);

module.exports = router;
