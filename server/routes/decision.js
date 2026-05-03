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

// POST /decisions
router.post("/", async (req, res) => {
  try {
    const { userId, categoryId, title, status } = req.body;
    const decisionId = await Decision.createDecision(userId, categoryId, title, status);
    res.status(201).json({ message: "Decision created successfully", decisionId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /decisions/:id
router.get("/id", async (req, res) => {
  try {
    const decision = await Decision.getDecisionById(req.params.id);
    if (!decision) {
      return res.status(404).json({ message: "Decision not found" });
    }
    res.json(decision);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /decisions/:id
router.put("/id", async (req, res) => {
  try {
    const { title, status, categoryId } = req.body;
    await Decision.updateDecision(req.params.id, title, status, categoryId);
    res.json({ message: "Decision updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /decisions/:id
router.delete("/id", async (req, res) => {
  try {
    await Decision.deleteDecision(req.params.id);
    res.json({ message: "Decision deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;