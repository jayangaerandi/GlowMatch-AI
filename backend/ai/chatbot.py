def get_beauty_advice(question):

    question = question.lower()

    if "foundation" in question:

        return """
Foundation creates an even skin tone and serves as the base for makeup.

Recommendations by skin tone:

• Fair Skin: Ivory, Porcelain and Light Beige shades.
• Medium Skin: Natural Beige and Warm Nude shades.
• Tan Skin: Honey and Caramel shades.
• Deep Skin: Cocoa and Espresso shades.

Tips:
1. Moisturize before applying foundation.
2. Match foundation to your jawline.
3. Blend using a brush or sponge.
4. Set with powder for longer wear.

A properly selected foundation can improve both coverage and overall makeup appearance.
"""

    elif "lipstick" in question:

        return """
Choosing lipstick depends on your skin tone and desired look.

Recommended shades:

• Fair Skin: Pink, Peach and Nude.
• Medium Skin: Rose, Mauve and Berry.
• Tan Skin: Coral, Brick Red and Warm Brown.
• Deep Skin: Plum, Burgundy and Deep Red.

Tips:
1. Use lip liner before lipstick.
2. Exfoliate dry lips.
3. Apply a second coat for longer-lasting color.

The right lipstick can enhance your natural features and complete your makeup look.
"""

    elif "blush" in question:

        return """
Blush adds warmth and dimension to your face.

Recommended shades:

• Fair Skin: Soft Pink.
• Medium Skin: Peach and Coral.
• Tan Skin: Terracotta.
• Deep Skin: Berry and Deep Orange.

Apply blush on the apples of your cheeks and blend upward toward the temples for a natural effect.
"""

    elif "oily skin" in question:

        return """
For oily skin:

• Use an oil-free cleanser.
• Apply a mattifying primer.
• Choose matte foundation.
• Set makeup with powder.
• Finish with a setting spray.

These steps help reduce shine and improve makeup longevity throughout the day.
"""

    elif "dry skin" in question:

        return """
For dry skin:

• Use a gentle cleanser.
• Apply moisturizer before makeup.
• Use hydrating primer.
• Choose liquid or cream foundation.
• Avoid excessive powder products.

Hydrated skin provides a smoother makeup application and healthier appearance.
"""

    elif "skin care" in question or "skincare" in question:

        return """
Basic skincare routine:

Morning:
1. Cleanser
2. Moisturizer
3. Sunscreen

Night:
1. Cleanser
2. Serum
3. Moisturizer

Consistency is the most important factor for healthy skin.
"""

    else:

        return """
I am your AI Beauty Assistant.

You can ask me about:

• Foundation
• Lipstick
• Blush
• Oily Skin
• Dry Skin
• Skincare
• Makeup Tips

Example Questions:

• Which foundation suits medium skin?
• Best lipstick for tan skin?
• How can I manage oily skin?
• What blush suits fair skin?
"""