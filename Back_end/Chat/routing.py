from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from Chat import consumers


websocket_urlpatterns = [
    path("ws", consumers.MessageConsumer.as_asgi()),
]
