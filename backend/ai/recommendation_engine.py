import pandas as pd


def get_makeup_recommendation(skin_tone):

    df = pd.read_csv(
        "../dataset/output.csv"
    )

    df["rating"] = pd.to_numeric(
        df["rating"],
        errors="coerce"
    )

    df["price"] = pd.to_numeric(
        df["price"],
        errors="coerce"
    )

    df = df.dropna(
        subset=["rating", "price"]
    )

    foundation_df = df[
        df["product_type"] == "foundation"
    ].sort_values(
        by="rating",
        ascending=False
    )

    lipstick_df = df[
        df["product_type"] == "lipstick"
    ].sort_values(
        by="rating",
        ascending=False
    )

    blush_df = df[
        df["product_type"] == "blush"
    ].sort_values(
        by="rating",
        ascending=False
    )

    foundation = foundation_df.iloc[0]
    lipstick = lipstick_df.iloc[0]
    blush = blush_df.iloc[0]

    return {

    "foundation": {
        "name": str(foundation["name"]),
        "brand": str(foundation["brand"]) if pd.notna(foundation["brand"]) else "Unknown Brand",
        "rating": float(foundation["rating"]),
        "price": float(foundation["price"])
    },

    "lipstick": {
        "name": str(lipstick["name"]),
        "brand": str(lipstick["brand"]) if pd.notna(lipstick["brand"]) else "Unknown Brand",
        "rating": float(lipstick["rating"]),
        "price": float(lipstick["price"])
    },

    "blush": {
        "name": str(blush["name"]),
        "brand": str(blush["brand"]) if pd.notna(blush["brand"]) else "Unknown Brand",
        "rating": float(blush["rating"]),
        "price": float(blush["price"])
    }
}