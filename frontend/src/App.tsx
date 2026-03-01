import { useState } from "react";
import axios from "axios";
import "./App.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [form, setForm] = useState({
    income: "",
    expense: "",
    digitalPercent: "",
    incomeStability: "",
    defaultHistory: false,
  });

  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/score", {
      income: Number(form.income),
      expense: Number(form.expense),
      digitalPercent: Number(form.digitalPercent),
      incomeStability: Number(form.incomeStability),
      defaultHistory: form.defaultHistory,
    });

    setResult(response.data);
  };

  return (
    <div className="container">
      <h1>ByteNova Behavioral Credit Scoring</h1>

      <div className="card">
        <input
          name="income"
          placeholder="Monthly Income"
          onChange={handleChange}
        />
        <input
          name="expense"
          placeholder="Monthly Expense"
          onChange={handleChange}
        />
        <input
          name="digitalPercent"
          placeholder="Digital Transaction %"
          onChange={handleChange}
        />
        <input
          name="incomeStability"
          placeholder="Income Stability (1-5)"
          onChange={handleChange}
        />

        <label>
          Past Default:
          <input
            type="checkbox"
            name="defaultHistory"
            onChange={handleChange}
          />
        </label>

        <button onClick={handleSubmit}>Generate Score</button>
      </div>

      {result && (
        <div className="result-card">

          <div className="score-circle">
            <CircularProgressbar
              value={(result.score - 300) / 6}
              text={`${result.score}`}
              styles={buildStyles({
                textColor: "#F8FAFC",
                pathColor:
                  result.risk === "Low"
                    ? "#22C55E"
                    : result.risk === "Medium"
                    ? "#F59E0B"
                    : "#EF4444",
                trailColor: "#1E293B",
              })}
            />
          </div>

          <div className={`risk-badge ${result.risk.toLowerCase()}`}>
            {result.risk} Risk
          </div>

          <p>Suggested Loan Limit:</p>
          <h3>₹ {result.suggestedLoan}</h3>
        </div>
      )}
    </div>
  );
}

export default App;