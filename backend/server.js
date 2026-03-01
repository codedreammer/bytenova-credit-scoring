const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/score", async (req, res) => {
  try {
    const { income, expense, digitalPercent, incomeStability } = req.body;

    const response = await axios.post("http://127.0.0.1:8000/predict", {
      income: income,
      expense: expense,
      digital_percent: digitalPercent,
      income_stability: incomeStability
    });

    const probability = response.data.default_probability;

    // Convert probability to credit score (300–900 scale)
    const score = Math.round(900 - probability * 600);

    let risk = "Medium";
    if (score >= 750) risk = "Low";
    if (score < 600) risk = "High";

    const suggestedLoan =
      risk === "Low"
        ? income * 5
        : risk === "Medium"
        ? income * 3
        : income * 1;

    res.json({
      score,
      risk,
      suggestedLoan,
      probability
    });

  } catch (error) {
    console.error("ML Error:", error.message);
    res.status(500).json({ error: "ML service error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});