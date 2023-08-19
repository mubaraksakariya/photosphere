from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/admin/", include("Admin.urls")),
    path("api/", include("User.urls")),
    path("api/post/", include("Post.urls")),
    path("api/story/", include("Story.urls")),
    path("api/chat/", include("Chat.urls")),
    path("api/notification/", include("Notification.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
