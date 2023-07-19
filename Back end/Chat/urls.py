from django.urls import path, include
from . import views

urlpatterns = [
    path("getusers", views.getusers, name="getusers"),
]
