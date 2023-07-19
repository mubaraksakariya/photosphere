from django.urls import path, include
from . import views


urlpatterns = [
    path("signin", views.signin),
    path("allusers", views.allusers),
    path("toggleBlock", views.toggleBlock),
    path("postlist", views.postlist),
]
