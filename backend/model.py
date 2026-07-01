import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(
    BASE_DIR,
    "dataset",
    "most_used_beauty_cosmetics_products_extended.csv"
)

dataset = pd.read_csv(dataset_path)


def recommend_product(skin_tone):

    if skin_tone == "Fair":
        category = "Foundation"

    elif skin_tone == "Medium":
        category = "Concealer"

    elif skin_tone == "Tan":
        category = "Blush"

    else:
        category = "Highlighter"

    filtered = df[df["Category"] == category]

    if filtered.empty:
        return "No Recommendation Found"

    best_product = filtered.sort_values(
        by="Rating",
        ascending=False
    ).iloc[0]

    return (
        f"{best_product['Brand']} - "
        f"{best_product['Product_Name']}"
    )