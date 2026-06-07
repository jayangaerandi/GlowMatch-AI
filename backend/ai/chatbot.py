def get_beauty_advice(question):

    question = question.lower()

    if "foundation" in question:

        return """
Foundation is one of the most important makeup products because it creates an even base for the rest of your makeup.

For fair skin tones, choose light ivory or beige shades.
For medium skin tones, natural beige and warm nude shades work well.
For tan skin tones, honey and caramel shades are usually suitable.
For deep skin tones, rich cocoa and espresso shades provide better coverage.

Always test foundation on your jawline and blend it properly for a natural finish.
"""

    elif "lipstick" in question:

        return """
Choosing the right lipstick depends on your skin tone and the occasion.

Fair skin tones usually look great with pink, peach, and nude shades.
Medium skin tones suit rose, mauve, and berry colors.
Tan skin tones pair well with coral, brick red, and warm brown shades.
Deep skin tones can confidently wear plum, burgundy, and deep red colors.

Applying a lip liner before lipstick can help improve definition and increase durability.
"""

    elif "oily skin" in question:

        return """
For oily skin, use oil-free and non-comedogenic makeup products.

Tips:
• Apply a mattifying primer before foundation.
• Choose matte foundations instead of dewy formulas.
• Use setting powder on oily areas such as the T-zone.
• Finish with a setting spray to keep makeup in place longer.

These steps help reduce shine and improve makeup longevity.
"""

    elif "dry skin" in question:

        return """
Dry skin requires extra hydration before applying makeup.

Tips:
• Cleanse your face gently.
• Apply a moisturizer and hydrating primer.
• Use liquid or cream foundations instead of powder formulas.
• Avoid excessive setting powder because it can emphasize dry patches.

Hydrated skin creates a smoother and more natural makeup finish.
"""

    elif "blush" in question:

        return """
Blush adds warmth and dimension to the face.

Fair skin tones generally suit soft pink shades.
Medium skin tones look great with peach and coral shades.
Tan skin tones often benefit from terracotta and warm coral shades.
Deep skin tones pair beautifully with berry and deep orange tones.

Apply blush lightly on the apples of the cheeks and blend upward toward the temples.
"""

    else:

        return """
I am your AI Beauty Assistant.

You can ask me questions about:
• Foundation selection
• Lipstick recommendations
• Blush recommendations
• Makeup tips
• Oily skin care
• Dry skin care
• Beauty routines

Try asking:
'Which foundation suits medium skin?'
'Best lipstick for tan skin?'
'How do I manage oily skin before makeup?'
"""