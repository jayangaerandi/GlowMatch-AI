from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ai.recommendation_engine import get_makeup_recommendation
from db import analysis_collection
from ai.predictor import predict_product

from ai.face_detector import detect_face
from ai.skin_tone_detector import detect_skin_tone

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/upload', methods=['POST'])
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

    # Makeup Recommendation
    recommendation = get_makeup_recommendation(
    skin_tone
    )   

    predicted_category = predict_product(
    skin_tone
    )

    # Save to MongoDB
    result = analysis_collection.insert_one({
        "image_name": image.filename,
        "faces_detected": faces_found,
        "skin_tone": skin_tone,
        "recommendation": recommendation
    })

    print("Saved to MongoDB:", result.inserted_id)
    print(type(recommendation))
    print(recommendation)

    return jsonify({
    "message": "Analysis Completed",
    "faces_detected": faces_found,
    "skin_tone": skin_tone,
    "recommendation": recommendation,
    "predicted_category": predicted_category
    })

@app.route('/history', methods=['GET'])
def get_history():

    history = list(
        analysis_collection.find(
            {},
            {"_id": 0}
        )
    )

    return jsonify(history)    


@app.route('/')
def home():
    return "GlowMatch AI Backend Running"


if __name__ == '__main__':
    app.run(debug=True)