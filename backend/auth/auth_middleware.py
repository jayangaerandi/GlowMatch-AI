from functools import wraps

from flask import (
    request,
    jsonify,
    g
)

from auth.jwt_handler import (
    verify_token
)

def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get(
            "Authorization"
        )

        print("AUTH HEADER:", auth_header)

        if not auth_header:
            return jsonify({
                "message": "Token missing"
            }), 401

        token = auth_header.split(" ")[1]

        print("TOKEN:", token)

        user = verify_token(token)

        print("VERIFY TOKEN RESULT:", user)

        if not user:
            return jsonify({
                "message": "Invalid token"
            }), 401

        g.user = user    

        return f(*args, **kwargs)

    return decorated