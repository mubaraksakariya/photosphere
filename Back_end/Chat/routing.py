from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from Chat import consumers

# application = ProtocolTypeRouter(
#     {
#         "websocket": URLRouter(
#             [
#                 path("ws", consumers.MessageConsumer.as_asgi()),
#                 # Add more WebSocket routes here if you have additional consumers
#             ]
#         ),
#         # Other protocols (HTTP, etc.) can be defined here if needed.
#     }
# )


websocket_urlpatterns = [
    path("ws", consumers.MessageConsumer.as_asgi()),
]
