import cv2
import numpy as np

def detect_skin_tone(image_path):
    image = cv2.imread(image_path)

    if image is None:
        return "Unknown"

    avg_color = image.mean(axis=(0, 1))
    brightness = np.mean(avg_color)
    print("Brightness:", brightness)

    if brightness > 200:
       return "Fair"

    elif brightness > 150:
       return "Medium"

    elif brightness > 100:
       return "Tan"

    else:
       return "Deep"