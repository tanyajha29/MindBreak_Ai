const express = require("express");
const { aiHandler, handleAI } = require("../controllers/aiController");

const router = express.Router();

router.post("/", handleAI);

module.exports = router;
