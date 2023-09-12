from django.urls import path
from . import views

urlpatterns = [
    path("createpost", views.createpost, name="createpost"),
    path("profileposts", views.profileposts, name="profileposts"),
    path("getmedia", views.getmedia, name="getmedia"),
    path("getfeed", views.getfeed, name="getfeed"),
    path("likeapost", views.likeapost, name="likeapost"),
    path("commentonpost", views.commentonpost, name="commentonpost"),
    path("getcomments", views.getcomments, name="getcomments"),
    path("deletecomment", views.deletecomment, name="deletecomment"),
    path("post", views.post, name="post"),
]
