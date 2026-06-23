import cv2
import numpy as np

def detect_skin_concern(image_path):

    image = cv2.imread(image_path)

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    brightness = np.mean(gray)

    if brightness < 80:

        return "Dry Skin"

    elif brightness > 170:

        return "Oily Skin"

    else:

        return "Normal Skin"
        

def get_skin_tips(concern):

    tips = {

        "Oily Skin":
        "Use oil-free foundations, lightweight moisturizers, and blotting papers to control excess shine.",

        "Dry Skin":
        "Use hydrating primers, rich moisturizers, and cream-based makeup products for a smooth finish.",

        "Normal Skin":
        "Maintain hydration, use SPF daily, and follow a balanced skincare routine.",

        "Acne":
        "Use non-comedogenic products and gentle cleansers. Avoid heavy makeup that may clog pores.",

        "Dark Spots":
        "Use products containing Vitamin C and SPF to reduce pigmentation and protect the skin."

    }

    return tips.get(
        concern,
        "Follow a healthy skincare routine and use sunscreen daily."
    )        