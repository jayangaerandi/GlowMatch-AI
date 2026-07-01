import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["glowmatch_ai"]

analysis_collection = db["analysis"]
users_collection = db["users"]
chat_collection = db["chat_history"]
favorites_collection = db["favorites"]
admins_collection = db["admins"]

print("MongoDB Connected Successfully")