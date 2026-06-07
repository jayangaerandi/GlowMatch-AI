import pandas as pd
import random


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
    ).reset_index(drop=True)

    lipstick_df = df[
        df["product_type"] == "lipstick"
    ].sort_values(
        by="rating",
        ascending=False
    ).reset_index(drop=True)

    blush_df = df[
        df["product_type"] == "blush"
    ].sort_values(
        by="rating",
        ascending=False
    ).reset_index(drop=True)

    # Select recommendation range based on skin tone
    if skin_tone == "Fair":
        start, end = 0, 4

    elif skin_tone == "Medium":
        start, end = 5, 9

    elif skin_tone == "Tan":
        start, end = 10, 14

    else:
        start, end = 15, 19

    # Safety check in case dataset is smaller
    start = min(start, len(foundation_df) - 1)
    end = min(end, len(foundation_df) - 1)

    foundation = foundation_df.iloc[
        random.randint(start, end)
    ]

    lipstick = lipstick_df.iloc[
        random.randint(
            min(start, len(lipstick_df) - 1),
            min(end, len(lipstick_df) - 1)
        )
    ]

    blush = blush_df.iloc[
        random.randint(
            min(start, len(blush_df) - 1),
            min(end, len(blush_df) - 1)
        )
    ]

    return {

        "foundation": {
            "name": str(foundation["name"]),
            "brand": str(foundation["brand"]) if pd.notna(foundation["brand"]) else "Unknown Brand",
            "rating": float(foundation["rating"]),
            "price": float(foundation["price"]),
            "image": str(foundation["image_link"])
        },

        "lipstick": {
            "name": str(lipstick["name"]),
            "brand": str(lipstick["brand"]) if pd.notna(lipstick["brand"]) else "Unknown Brand",
            "rating": float(lipstick["rating"]),
            "price": float(lipstick["price"]),
            "image": str(lipstick["image_link"])
        },

        "blush": {
            "name": str(blush["name"]),
            "brand": str(blush["brand"]) if pd.notna(blush["brand"]) else "Unknown Brand",
            "rating": float(blush["rating"]),
            "price": float(blush["price"]),
            "image": str(blush["image_link"])
        }

    }