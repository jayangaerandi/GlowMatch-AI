import jwt
import datetime

SECRET_KEY = "GlowMatch_AI_Super_Secure_Secret_Key_2026_Authentication"

def generate_token(user):

    payload = {

        "name": user["name"],

        "email": user["email"],

        "exp": datetime.datetime.utcnow()
        + datetime.timedelta(days=1)

    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm="HS256"
    )

    return token


def verify_token(token):

    try:

        data = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return data

    except:

        return None

