import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.backends import TokenBackend

def generate_jwt_token(user):
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    return access_token

def decode_jwt_token(token):
    token_backend = TokenBackend(algorithm='HS256')  # Specify the algorithm used for token signing
    decoded_token = token_backend.decode(token, verify=False)  # Set verify=False to skip signature verification
    return decoded_token