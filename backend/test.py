from pymongo import MongoClient

client = MongoClient("mongodb+srv://glowmatchadmin:GlowAI2026@cluster0.eavwsh7.mongodb.net/?appName=Cluster0")

try:
    client.admin.command("ping")
    print("Connected")
except Exception as e:
    print(e)