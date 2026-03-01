from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("credit_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["income"],
        data["expense"],
        data["digital_percent"],
        data["income_stability"]
    ]])

    probability = model.predict_proba(features)[0][1]

    return jsonify({
        "default_probability": float(probability)
    })

if __name__ == "__main__":
    app.run(port=8000)