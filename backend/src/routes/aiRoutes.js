const router = require("express").Router();
const { handleTaskAI } = require("../controllers/aiController");

router.post("/task", handleTaskAI);

module.exports = router;
