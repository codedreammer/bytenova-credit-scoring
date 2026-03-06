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

## 📊 Machine Learning Model

- Model: Logistic Regression
- Dataset: 2000 synthetic behavioral vendor samples
- Accuracy: **86%**
- Output: Default Probability

Score formula: Credit Score = 900 - (Default Probability × 600)

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