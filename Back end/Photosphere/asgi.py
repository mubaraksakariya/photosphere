import os
from django.core.asgi import get_asgi_application

# Ensure the DJANGO_SETTINGS_MODULE environment variable is set
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Photosphere.settings")

# Get the Django ASGI application
django_asgi_app = get_asgi_application()

# The Channels application that handles WebSocket connections
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from Chat.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,  # Handle HTTP requests using Django's ASGI application
        "websocket": AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),  # Handle WebSocket connections
    }
)
