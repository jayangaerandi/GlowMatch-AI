import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def get_beauty_advice(question):

    prompt = f"""
You are GlowMatch AI.

You are an expert beauty consultant.

Answer only beauty, skincare, makeup, facial care,
hair care and cosmetic questions.

Question:
{question}
"""

    response = model.generate_content(prompt)

    return response.text