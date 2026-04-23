const express = require("express");
const router = express.Router();
const Decision = require("../models/decision");

router.get("/", async (req, res) => {
  try {
    const decisions = await Decision.getAllDecisions();
    res.json(decisions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;