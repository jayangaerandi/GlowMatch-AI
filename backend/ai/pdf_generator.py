from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

from datetime import datetime

import requests
import tempfile
import os


def download_image(url):

    try:

        response = requests.get(url)

        temp_file = tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".jpg"
        )

        temp_file.write(response.content)

        temp_file.close()

        return temp_file.name

    except:

        return None


def generate_report(data, filename):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    # --------------------------------------------------
    # TITLE
    # --------------------------------------------------

    content.append(
        Paragraph(
            "GlowMatch AI Beauty Report",
            styles["Title"]
        )
    )

    content.append(
        Paragraph(
            "Personalized Makeup Recommendation Report",
            styles["Heading2"]
        )
    )

    content.append(Spacer(1, 20))

    # --------------------------------------------------
    # DATE
    # --------------------------------------------------

    current_time = datetime.now().strftime(
        "%d %B %Y %H:%M"
    )

    content.append(
        Paragraph(
            f"<b>Analysis Date:</b> {current_time}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 10))

    # --------------------------------------------------
    # ANALYSIS SUMMARY
    # --------------------------------------------------

    content.append(
        Paragraph(
            "Analysis Summary",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Skin Tone:</b> {data['skin_tone']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Faces Detected:</b> {data['faces_detected']}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    # --------------------------------------------------
    # FOUNDATION
    # --------------------------------------------------

    foundation = data["recommendation"]["foundation"]

    content.append(
        Paragraph(
            "Recommended Foundation",
            styles["Heading2"]
        )
    )

    foundation_image = download_image(
        foundation["image"]
    )

    if foundation_image:

        content.append(
            Image(
                foundation_image,
                width=120,
                height=120
            )
        )

    content.append(
        Paragraph(
            f"<b>Name:</b> {foundation['name']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Brand:</b> {foundation['brand']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Rating:</b> ⭐ {foundation['rating']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Price:</b> ${foundation['price']}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 15))

    # --------------------------------------------------
    # LIPSTICK
    # --------------------------------------------------

    lipstick = data["recommendation"]["lipstick"]

    content.append(
        Paragraph(
            "Recommended Lipstick",
            styles["Heading2"]
        )
    )

    lipstick_image = download_image(
        lipstick["image"]
    )

    if lipstick_image:

        content.append(
            Image(
                lipstick_image,
                width=120,
                height=120
            )
        )

    content.append(
        Paragraph(
            f"<b>Name:</b> {lipstick['name']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Brand:</b> {lipstick['brand']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Rating:</b> ⭐ {lipstick['rating']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Price:</b> ${lipstick['price']}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 15))

    # --------------------------------------------------
    # BLUSH
    # --------------------------------------------------

    blush = data["recommendation"]["blush"]

    content.append(
        Paragraph(
            "Recommended Blush",
            styles["Heading2"]
        )
    )

    blush_image = download_image(
        blush["image"]
    )

    if blush_image:

        content.append(
            Image(
                blush_image,
                width=120,
                height=120
            )
        )

    content.append(
        Paragraph(
            f"<b>Name:</b> {blush['name']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Brand:</b> {blush['brand']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Rating:</b> ⭐ {blush['rating']}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"<b>Price:</b> ${blush['price']}",
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 20))

    # --------------------------------------------------
    # PERSONALIZED TIPS
    # --------------------------------------------------

    if data["skin_tone"] == "Fair":

        tips = """
        • Use light beige foundations<br/>
        • Soft pink blush works best<br/>
        • Nude and peach lipsticks suit well
        """

        summary = """
        Your fair complexion pairs beautifully with soft and natural shades.
        Light foundations, peach lipsticks and soft pink blushes create a fresh and balanced look.
        """

    elif data["skin_tone"] == "Medium":

        tips = """
        • Warm beige foundations work best<br/>
        • Coral blush adds warmth<br/>
        • Rose and berry lipsticks suit medium skin
        """

        summary = """
        Medium skin tones work well with warm and balanced shades.
        Coral blushes and berry lipsticks help enhance your natural glow.
        """

    elif data["skin_tone"] == "Tan":

        tips = """
        • Honey and caramel foundations work well<br/>
        • Terracotta blush enhances complexion<br/>
        • Brick red and coral lipsticks are ideal
        """

        summary = """
        Tan skin tones look stunning with warm earthy shades.
        Coral lipsticks and terracotta blushes help create a vibrant and polished appearance.
        """

    else:

        tips = """
        • Rich cocoa foundations provide coverage<br/>
        • Berry blush adds dimension<br/>
        • Deep red and plum lipsticks look stunning
        """

        summary = """
        Deep skin tones can confidently wear rich and bold colors.
        Deep reds, berries and plum shades beautifully complement your complexion.
        """

    content.append(
        Paragraph(
            "AI Beauty Summary",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            summary,
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 15))

    content.append(
        Paragraph(
            "Personalized Beauty Tips",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            tips,
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 30))

    content.append(
        Paragraph(
            "Generated by GlowMatch AI",
            styles["Italic"]
        )
    )

    pdf.build(content)

    # cleanup temporary images
    for img in [
        foundation_image,
        lipstick_image,
        blush_image
    ]:

        if img and os.path.exists(img):
            os.remove(img)

    return filename