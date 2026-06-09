import ollama

def get_beauty_advice(
    question,
    skin_tone
):

    response = ollama.chat(
        model="llama3.2",
        options={
            "temperature": 0.8,
            "num_predict": 500
        },
        messages=[
            {
                "role": "system",
                "content": f"""
You are GlowMatch AI Beauty Assistant.

Current User Skin Tone:
{skin_tone}

When recommending:
- Foundation
- Lipstick
- Blush
- Makeup styles

always consider the user's skin tone.

You are an experienced beauty consultant,
makeup artist,
and skincare specialist.

Provide detailed and professional answers.

Use headings,
bullet points,
and explanations.

Do not give short answers.
"""
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    return response["message"]["content"]