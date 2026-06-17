import pandas as pd

df = pd.read_csv(
    "../dataset/most_used_beauty_cosmetics_products_extended.csv"
)

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