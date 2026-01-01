const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { aiInsights } = require("../controllers/aiController");

router.get("/insights", protect, aiInsights);

module.exports = router;
