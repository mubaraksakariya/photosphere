from django.urls import path
from . import views

urlpatterns = [
    path("getnotifications", views.getnotifications, name="getnotifications"),
]
