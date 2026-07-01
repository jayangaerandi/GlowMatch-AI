import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def get_beauty_advice(question, skin_tone):

    prompt = f"""
You are GlowMatch AI, an AI beauty consultant.

The user's detected skin tone is: {skin_tone}.

Provide personalized beauty, skincare, makeup, and cosmetic advice.

User Question:
{question}
"""

    response = model.generate_content(prompt)

    return response.text