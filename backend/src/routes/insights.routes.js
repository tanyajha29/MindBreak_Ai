const router = require("express").Router();
const { getInsights } = require("../controllers/insightsController");
const auth = require("../middleware/auth");

router.get("/", auth, getInsights);

module.exports = router;
