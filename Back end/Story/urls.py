from django.urls import path
from . import views


urlpatterns = [
    path("createstory", views.createstory, name="createstory"),
    path("getstories", views.getstories, name="getstories"),
    # path("getmedia", views.getmedia, name="getmedia"),
    path("setsoryviewed", views.setsoryviewed, name="setsoryviewed"),
]
