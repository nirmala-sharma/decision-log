const express = require("express");
const router = express.Router();
const Decision = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;