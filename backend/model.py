import os
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

DATASET_PATH = os.path.join(
    PROJECT_ROOT,
    "dataset",
    "most_used_beauty_cosmetics_products_extended.csv"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "beauty_model.pkl"
)

def train_model():

    dataset = pd.read_csv(DATASET_PATH)

    dataset = dataset.dropna()

    encoder = LabelEncoder()

    dataset["Skin_Type"] = encoder.fit_transform(dataset["Skin_Type"])
    dataset["Category"] = encoder.fit_transform(dataset["Category"])

    X = dataset[["Skin_Type"]]
    y = dataset["Category"]

    model = DecisionTreeClassifier()

    model.fit(X, y)

    joblib.dump(model, MODEL_PATH)

    print("✅ Model saved successfully.")

    return model