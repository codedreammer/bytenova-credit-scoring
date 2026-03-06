# 🚀 ByteNova – AI-Based Behavioral Credit Scoring System

## 📌 Overview

ByteNova is an AI-powered alternative credit scoring system designed to enable financial inclusion for MSMEs and underserved vendors.

The system evaluates behavioral financial patterns such as:

- Income
- Expense ratio
- Digital transaction percentage
- Income stability

Using a Logistic Regression ML model, ByteNova predicts default probability and converts it into a credit score (300–900 scale).

---

## ⭐ Key Features

- Behavioral credit scoring for MSMEs
- Explainable AI risk analysis
- Real-time credit score generation
- Vendor evaluation history tracking
- Dynamic risk analytics dashboard
- Node.js ↔ Python ML microservice architecture
- Logistic Regression probability-based scoring

---

## 🧠 Problem Statement

Traditional credit scoring systems rely heavily on historical credit data, excluding:

- First-time borrowers
- Small vendors
- Informal sector businesses

ByteNova leverages behavioral financial indicators to provide an alternative, explainable credit scoring mechanism.

---

## 🏗️ System Architecture

![Architecture](assets/architecture.png)

### Flow:

User → React Frontend → Node Backend → Python ML Microservice → Logistic Regression Model → Credit Score Output

---

## 📂 Project Structure

```
bytenova-credit-system
│
├── frontend/           # React + Vite UI
│   ├── src/pages
│   ├── src/components
│   └── src/services
│
├── backend/            # Node.js API
│   └── server.js
│
├── ml-model/           # Python ML microservice
│   ├── train_model.py
│   ├── predict.py
│   └── credit_model.pkl
│
└── assets/             # Architecture & UI images
```

---

## 🔄 System Workflow

1. User enters vendor financial details
2. React frontend sends data to Node.js backend
3. Node backend forwards data to Python ML service
4. Logistic Regression model predicts probability of default
5. Probability is converted into a credit score
6. Score and risk category are returned to the dashboard

---

## 📊 Machine Learning Model

- Model: Logistic Regression
- Dataset: 2000 synthetic behavioral vendor samples
- Accuracy: **86%**
- Output: Default Probability

### Score Formula

```
Credit Score = 1000 × (1 − Probability of Default)
```

### Risk Categories

- **800–1000** → Low Risk
- **650–799** → Moderate Risk
- **500–649** → Risky Borrower
- **Below 500** → High Risk

---

## 💻 Tech Stack

### Frontend
- React (Vite + TypeScript)
- Axios
- Circular Progress Bar

### Backend
- Node.js
- Express.js
- REST API

### ML Layer
- Python
- Flask
- scikit-learn
- Logistic Regression

---

## 📷 UI Preview

![UI Preview](assets/ui-preview.png)

![ML Score Preview](assets/ml-score-preview.png)

---

## 🧪 Sample Input

```
Vendor: Ramesh Kirana
City: Mumbai
Income: ₹40,000
Expense: ₹25,000
Digital Payment Ratio: 40%
Income Stability Score: 10
```

---

## 🚀 How To Run Locally

### 1️⃣ Clone Repo
git clone <your-repo-link>
cd bytenova-credit-scoring


### 2️⃣ Setup ML Service


cd ml-model
pip install numpy pandas scikit-learn joblib flask
python train_model.py
python predict.py


### 3️⃣ Setup Backend


cd backend
npm install
node server.js


### 4️⃣ Setup Frontend


cd frontend
npm install
npm run dev


Visit:

http://localhost:5173


---

## 🎯 Future Improvements

- Real-world financial dataset integration
- SHAP explainability module
- Bias detection & fairness testing
- Loan recommendation optimization
- Deployment on cloud (AWS/GCP)

---

## 👨‍💻 Developed For

National Online Hackathon 2026 – Startup & Open Innovation

Domain: AI/ML for Business


---

## 📄 License

This project is developed for educational and hackathon demonstration purposes.