def get_makeup_look(
    skin_tone,
    skin_concern
):

    if skin_tone == "Fair":

        return {

            "look_name":
            "Soft Bridal Glow",

            "eye_makeup":
            "Champagne Shimmer Eyes",

            "occasion":
            "Wedding",

            "description":
            "Elegant soft makeup with subtle glow."
        }

    elif skin_tone == "Medium":

        return {

            "look_name":
            "Rose Glam Look",

            "eye_makeup":
            "Soft Brown Smokey Eye",

            "occasion":
            "Party",

            "description":
            "Warm glam makeup suitable for medium skin."
        }

    elif skin_tone == "Tan":

        return {

            "look_name":
            "Golden Goddess",

            "eye_makeup":
            "Bronze Smokey Eye",

            "occasion":
            "Evening Event",

            "description":
            "Rich warm tones enhance tan skin beautifully."
        }

    else:

        return {

            "look_name":
            "Royal Glam",

            "eye_makeup":
            "Deep Plum Eye Makeup",

            "occasion":
            "Wedding",

            "description":
            "Bold luxurious makeup for deeper skin tones."
        }