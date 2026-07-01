latest_skin_tone = "Unknown"
print("APP.PY STARTED")

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify, send_file, g
from flask_cors import CORS
import os
from ai.recommendation_engine import get_makeup_recommendation
from db import analysis_collection
from ai.predictor import predict_product

from ai.face_detector import detect_face
from ai.skin_tone_detector import detect_skin_tone
from ai.hybrid_chatbot import get_beauty_advice
from ai.pdf_generator import generate_report
from flask import send_file
from auth.auth import (register_user,login_user,change_password)
from db import (analysis_collection,chat_collection,users_collection,favorites_collection)
from ai.skin_concern_detector import detect_skin_concern
from ai.makeup_look_engine import (get_makeup_look)
from auth.jwt_handler import generate_token
from auth.auth_middleware import (token_required)
import bcrypt


app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "https://glow-match-ai-psi.vercel.app"
            ]
        }
    }
)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/upload', methods=['POST'])
@token_required
def upload_image():

    if 'image' not in request.files:
        return jsonify({
            "message": "No image uploaded"
        }), 400

    image = request.files['image']

    image_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    image.save(image_path)

    # Face Detection
    faces_found = detect_face(image_path)

    # Skin Tone Detection
    skin_tone = detect_skin_tone(image_path)

    global latest_skin_tone
    latest_skin_tone = skin_tone

    # Makeup Recommendation
    recommendation = get_makeup_recommendation(
    skin_tone
    )   

    predicted_category = predict_product(
    skin_tone
    )

    # Save to MongoDB
    user_email = g.user["email"]

    print("USER EMAIL:", user_email)

    skin_concern = detect_skin_concern(
    image_path
    )

    makeup_look = get_makeup_look(
    skin_tone,
    skin_concern
    )

    print("USER EMAIL:", user_email)

    result = analysis_collection.insert_one({

    "user_email": user_email,

    "image_name": image.filename,

    "faces_detected": faces_found,

    "skin_tone": skin_tone,

    "skin_concern": skin_concern,

    "makeup_look": makeup_look,

    "recommendation": recommendation
    })


    print("Saved to MongoDB:", result.inserted_id)
    print(type(recommendation))
    print(recommendation)

    return jsonify({
    "message": "Analysis Completed",
    "faces_detected": faces_found,
    "skin_tone": skin_tone,
    "skin_concern": skin_concern,
    "makeup_look": makeup_look,
    "recommendation": recommendation,
    "predicted_category": predicted_category
    })

@app.route('/history', methods=['GET'])
@token_required
def get_history():

    history = list(
        analysis_collection.find(
            {},
            {"_id": 0}
        )
    )

    print("HISTORY RECORDS:")
    print(history)

    return jsonify(history)

@app.route('/')
def home():
    return "GlowMatch AI Backend Running"

@app.route('/chat', methods=['POST'])
def chat():

    data = request.get_json()

    question = data.get("question")
    user_email = data.get("user_email")

    answer = get_beauty_advice(
        question,
        latest_skin_tone
    )

    result = chat_collection.insert_one({
        "user_email": user_email,
        "question": question,
        "answer": answer
    })

    print("QUESTION:", question)
    print("USER EMAIL:", user_email)
    print("CHAT SAVED:", result.inserted_id)

    return jsonify({
        "answer": answer
    })

@app.route('/chat-history/<email>', methods=['GET'])
@token_required
def chat_history(email):

    history = list(
        chat_collection.find(
            {
                "user_email": email
            },
            {
                "_id": 0
            }
        )
    )

    return jsonify(history) 

@app.route('/dashboard', methods=['GET'])
def dashboard():

    total = analysis_collection.count_documents({})

    fair = analysis_collection.count_documents({
        "skin_tone": "Fair"
    })

    medium = analysis_collection.count_documents({
        "skin_tone": "Medium"
    })

    tan = analysis_collection.count_documents({
        "skin_tone": "Tan"
    })

    deep = analysis_collection.count_documents({
        "skin_tone": "Deep"
    })

    return jsonify({
        "total": total,
        "fair": fair,
        "medium": medium,
        "tan": tan,
        "deep": deep
    })

@app.route('/download-report', methods=['POST'])
def download_report():

    data = request.json

    file_name = "beauty_report.pdf"

    generate_report(
        data,
        file_name
    )

    return send_file(
        file_name,
        as_attachment=True
    )

@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    result = register_user(
        data["name"],
        data["email"],
        data["password"]
    )

    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    result = login_user(
        data["email"],
        data["password"]
    )

    if result["success"]:

        token = generate_token(
            result["user"]
        )

        result["token"] = token

    return jsonify(result)  

@app.route('/change-password', methods=['POST'])
@token_required
def change_user_password():

    data = request.get_json()

    result = change_password(

        data["email"],

        data["current_password"],

        data["new_password"]

    )

    return jsonify(result)    

@app.route('/forgot-password', methods=['POST'])
def forgot_password():

    data = request.get_json()

    user = users_collection.find_one({

        "email": data["email"]

    })

    if not user:

        return jsonify({

            "success": False,

            "message": "Email not found"

        })

    hashed = bcrypt.hashpw(

        data["new_password"].encode(),

        bcrypt.gensalt()

    ).decode()

    users_collection.update_one(

        {

            "email": data["email"]

        },

        {

            "$set": {

                "password": hashed

            }

        }

    )

    return jsonify({

        "success": True,

        "message": "Password updated successfully"

    })    

@app.route('/user-history/<email>', methods=['GET'])
@token_required
def user_history(email):

    print("EMAIL RECEIVED:", email)

    history = list(
        analysis_collection.find(
            {
                "user_email": email
            },
            {
                "_id": 0
            }
        )
    )

    print("HISTORY COUNT:", len(history))

    if history:
        print("FIRST DOCUMENT:", history[0])

    return jsonify(history)


@app.route('/user-dashboard/<email>', methods=['GET'])
@token_required
def user_dashboard(email):

    print("EMAIL RECEIVED:", email)

    analyses = list(
        analysis_collection.find(
            {
                "user_email": email
            }
        )
    )

    print("ANALYSES FOUND:", len(analyses))

    if analyses:
        print("FIRST DOCUMENT:", analyses[0])

    total = len(analyses)

    fair = len([
        x for x in analyses
        if x.get("skin_tone") == "Fair"
    ])

    medium = len([
        x for x in analyses
        if x.get("skin_tone") == "Medium"
    ])

    tan = len([
        x for x in analyses
        if x.get("skin_tone") == "Tan"
    ])

    deep = len([
        x for x in analyses
        if x.get("skin_tone") == "Deep"
    ])

    return jsonify({
        "total": total,
        "fair": fair,
        "medium": medium,
        "tan": tan,
        "deep": deep
    })

@app.route('/profile/<email>', methods=['GET'])
@token_required
def profile(email):

    user = users_collection.find_one(
        {"email": email},
        {"_id": 0}
    )

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    analyses = analysis_collection.count_documents(
        {
            "user_email": email
        }
    )

    chats = chat_collection.count_documents(
        {
            "user_email": email
        }
    )

    return jsonify({

        "name": user["name"],

        "email": user["email"],

        "total_analyses": analyses,

        "total_chats": chats

    })

@app.route('/favorites', methods=['POST'])
@token_required
def save_favorite():

    data = request.get_json()

    favorites_collection.insert_one({

        "user_email": data["user_email"],

        "product_name": data["product_name"],

        "brand": data["brand"],

        "category": data["category"],

        "image": data["image"],

        "price": data["price"]

    })

    return jsonify({
        "message": "Added to favorites"
    })

@app.route('/favorites/<email>', methods=['GET'])
@token_required
def get_favorites(email):

    favorites = list(

        favorites_collection.find(

            {
                "user_email": email
            },

            {
                "_id": 0
            }
        )
    )

    return jsonify(favorites)

@app.route('/admin-login', methods=['POST'])
def admin_login():

    data = request.get_json()

    admin = users_collection.find_one({
        "email": data["email"],
        "role": "admin"
        
    })

    print("LOGIN EMAIL:", data["email"])

    admin = users_collection.find_one({
       "email": data["email"],
       "role": "admin"
    })

    print("ADMIN FOUND:", admin)

    if not admin:

        return jsonify({
            "success": False,
            "message": "Admin not found"
        })

    if bcrypt.checkpw(
        data["password"].encode(),
        admin["password"].encode()
    ):

        token = generate_token({
            "name": admin["name"],
            "email": admin["email"],
            "role": "admin"
        })

        return jsonify({
            "success": True,
            "token": token
        })

    return jsonify({
        "success": False,
        "message": "Invalid password"
    })

@app.route('/admin-dashboard')
@token_required
def admin_dashboard():

    total_users = users_collection.count_documents({})
    total_analyses = analysis_collection.count_documents({})
    total_chats = chat_collection.count_documents({})
    total_favorites = favorites_collection.count_documents({})

    fair = analysis_collection.count_documents({"skin_tone": "Fair"})
    medium = analysis_collection.count_documents({"skin_tone": "Medium"})
    tan = analysis_collection.count_documents({"skin_tone": "Tan"})
    deep = analysis_collection.count_documents({"skin_tone": "Deep"})

    acne = analysis_collection.count_documents({"skin_concern": "Acne"})
    dry = analysis_collection.count_documents({"skin_concern": "Dry Skin"})
    oily = analysis_collection.count_documents({"skin_concern": "Oily Skin"})
    normal = analysis_collection.count_documents({"skin_concern": "Normal"})

    return jsonify({

        "users": total_users,
        "analyses": total_analyses,
        "chats": total_chats,
        "favorites": total_favorites,

        "fair": fair,
        "medium": medium,
        "tan": tan,
        "deep": deep,

        "acne": acne,
        "dry": dry,
        "oily": oily,
        "normal": normal

    })

@app.route('/admin/users')
@token_required
def get_users():

    users = list(

        users_collection.find(
            {},
            {"_id": 0}
        )

    )

    return jsonify(users)


@app.route(
    '/admin/delete-user/<email>',
    methods=['DELETE']
)
@token_required
def delete_user(email):

    users_collection.delete_one({
        "email": email
    })

    return jsonify({
        "message": "User deleted"
    })                    

print(app.url_map)      

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001
    )
