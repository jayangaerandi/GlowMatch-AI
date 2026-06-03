from flask import Flask, request, jsonify
from flask_cors import CORS
import os

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

    return jsonify({
        "message": "Analysis Completed",
        "faces_detected": faces_found,
        "skin_tone": skin_tone
    })


@app.route('/')
def home():
    return "GlowMatch AI Backend Running"


if __name__ == '__main__':
    app.run(debug=True)