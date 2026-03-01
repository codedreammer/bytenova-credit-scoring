import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import joblib

# Create synthetic dataset
np.random.seed(42)

data_size = 2000

income = np.random.randint(5000, 50000, data_size)
expense = np.random.randint(2000, 40000, data_size)
digital_percent = np.random.randint(0, 100, data_size)
income_stability = np.random.randint(1, 6, data_size)

# Default logic (higher risk if unstable + low digital + high expense ratio)
default = (
    (expense / income > 0.7) |
    (digital_percent < 20) |
    (income_stability <= 2)
).astype(int)

df = pd.DataFrame({
    "income": income,
    "expense": expense,
    "digital_percent": digital_percent,
    "income_stability": income_stability,
    "default": default
})

X = df[["income", "expense", "digital_percent", "income_stability"]]
y = df["default"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print("Model Accuracy:", accuracy)

joblib.dump(model, "credit_model.pkl")