from django.contrib.auth import get_user_model
from User.simple_token import decode_jwt_token

User = get_user_model()

class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = None
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            user_id = decode_jwt_token(token)['user_id']
            user = User.objects.get(id = user_id)
        if user:
            request.user = user
        else: request.user = None

        response = self.get_response(request)
        return response
