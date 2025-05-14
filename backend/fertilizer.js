// fertilizer.js
const express = require("express");
const { execFile } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
  const { nitrogen, phosphorus, potassium, crop } = req.body;

  const args = [nitrogen, phosphorus, potassium, crop];
  console.log("📥 Fertilizer input:", args);

  execFile("python3", ["recommend_fertilizer.py", ...args], (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error running Python script:", error);
      return res.status(500).json({ message: "Internal server error during fertilizer recommendation." });
    }

    if (stderr) console.error("⚠️ Python stderr:", stderr);

    const recommendation = stdout.trim();
    console.log("📤 Fertilizer recommendation:", recommendation);
    res.json({ message: recommendation });
  });
});

module.exports = router;
