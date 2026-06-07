import pandas as pd

df = pd.read_csv(
    "../dataset/most_used_beauty_cosmetics_products_extended.csv"
)

print(df.head())

print("\nColumns:")
print(df.columns.tolist())