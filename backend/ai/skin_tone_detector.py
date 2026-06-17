import cv2
import numpy as np


def detect_skin_tone(image_path):

    image = cv2.imread(image_path)

    if image is None:
        return "Unknown"

    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades +
        "haarcascade_frontalface_default.xml"
    )

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    faces = face_cascade.detectMultiScale(
        gray,
        1.1,
        4
    )

    if len(faces) == 0:
        return "Unknown"

    x, y, w, h = faces[0]

    face_region = image[
        y:y+h,
        x:x+w
    ]

    avg_color = face_region.mean(
        axis=(0, 1)
    )

    brightness = np.mean(avg_color)

    print("Face Brightness:", brightness)

    if brightness > 200:
        return "Fair"

    elif brightness > 150:
        return "Medium"

    elif brightness > 100:
        return "Tan"

    else:
        return "Deep"