import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

def train_model():

    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_path = os.path.join(
        base_dir,
        "dataset",
        "most_used_beauty_cosmetics_products_extended.csv"
    )

    dataset = pd.read_csv(dataset_path)

    dataset = dataset.dropna()

    encoder = LabelEncoder()

    dataset["Skin_Type"] = encoder.fit_transform(dataset["Skin_Type"])
    dataset["Category"] = encoder.fit_transform(dataset["Category"])

    X = dataset[["Skin_Type"]]
    y = dataset["Category"]

    model = DecisionTreeClassifier()
    model.fit(X, y)

    return model