from functools import wraps

from flask import (
    request,
    jsonify
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

        if not auth_header:

            return jsonify({
                "message":
                "Token missing"
            }), 401

        token = auth_header.split(
            " "
        )[1]

        user = verify_token(
            token
        )

        if not user:

            return jsonify({
                "message":
                "Invalid token"
            }), 401

        return f(*args, **kwargs)

    return decorated