import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.backends import TokenBackend
import jwt
from django.conf import settings
from datetime import datetime, timedelta


def generate_jwt_token(user):
    # Set the token's expiration time to one month from the current time
    expiration_time = datetime.utcnow() + timedelta(days=30)

    # Custom payload with expiration time (exp) claim
    payload = {
        "user_id": user.id,
        "exp": expiration_time.timestamp(),  # Expiration time as UNIX timestamp
    }

    # Generate the token
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


def decode_jwt_token(token):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get("user_id")
        return user_id
    except jwt.ExpiredSignatureError:
        # Handle the case where the token has expired
        print("Token has expired.")
        return None
    except jwt.InvalidTokenError:
        # Handle the case where the token is invalid
        print("Invalid token.")
        return None
    except Exception as e:
        print(f"Error decoding JWT token: {e}")
        return None
