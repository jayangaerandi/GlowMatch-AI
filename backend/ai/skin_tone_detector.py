import cv2
import numpy as np

def detect_skin_tone(image_path):
    image = cv2.imread(image_path)

    if image is None:
        return "Unknown"

    avg_color = image.mean(axis=(0, 1))
    brightness = np.mean(avg_color)

    if brightness > 180:
        return "Fair"
    elif brightness > 130:
        return "Medium"
    elif brightness > 90:
        return "Tan"
    else:
        return "Deep"