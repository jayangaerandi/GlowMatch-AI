import os
import jwt
import datetime

SECRET_KEY = os.getenv("SECRET_KEY")

def generate_token(user):

    payload = {

        "name": user.get("name"),

        "email": user.get("email"),

        "role": user.get("role", "user"),

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

