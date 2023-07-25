from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Chat import consumers

urlpatterns = [
    path("admin/", include("Admin.urls")),
    path("", include("User.urls")),
    path("post/", include("Post.urls")),
    path("story/", include("Story.urls")),
    path("chat/", include("Chat.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# websocket_urlpatterns = [
#     path("ws/", consumers.MessageConsumer.as_asgi()),
# ]
