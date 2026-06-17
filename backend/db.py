from pymongo import MongoClient

client = MongoClient("mongodb+srv://glowmatchadmin:GlowAI2026@cluster0.eavwsh7.mongodb.net/?appName=Cluster0")

db = client["glowmatch_ai"]

analysis_collection = db["analysis"]

users_collection = db["users"]

chat_collection = db["chat_history"]

print("MongoDB Connected Successfully")