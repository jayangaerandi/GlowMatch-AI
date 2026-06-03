def get_makeup_recommendation(skin_tone):

    recommendations = {

        "Fair": {
            "foundation": "Ivory Foundation",
            "lipstick": "Soft Pink Lipstick",
            "blush": "Peach Blush"
        },

        "Medium": {
            "foundation": "Beige Foundation",
            "lipstick": "Rose Lipstick",
            "blush": "Coral Blush"
        },

        "Tan": {
            "foundation": "Caramel Foundation",
            "lipstick": "Berry Lipstick",
            "blush": "Terracotta Blush"
        },

        "Deep": {
            "foundation": "Espresso Foundation",
            "lipstick": "Plum Lipstick",
            "blush": "Bronze Blush"
        }
    }

    return recommendations.get(
        skin_tone,
        {"message": "No recommendation found"}
    )