import bcrypt

from db import users_collection


def register_user(name, email, password):

    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:

        return {
            "success": False,
            "message": "User already exists"
        }

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password.decode("utf-8"),
        "role": "user"
    })

    return {
        "success": True,
        "message": "Registration successful"
    }


def login_user(email, password):

    user = users_collection.find_one({
        "email": email
    })

    if not user:

        return {
            "success": False,
            "message": "User not found"
        }

    if bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):

        return {
            "success": True,
            "message": "Login successful",
            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        }

    return {
        "success": False,
        "message": "Invalid password"
    }

def change_password(email, current_password, new_password):

    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    if not bcrypt.checkpw(
        current_password.encode(),
        user["password"].encode()
    ):

        return {
            "success": False,
            "message": "Current password is incorrect"
        }

    hashed_password = bcrypt.hashpw(
        new_password.encode(),
        bcrypt.gensalt()
    ).decode()

    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "password": hashed_password
            }
        }
    )

    return {
        "success": True,
        "message": "Password changed successfully"
    }    