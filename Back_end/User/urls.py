from django.urls import path, include
from . import views

urlpatterns = [
    path("signup", views.signup),
    path("signin", views.signin),
    path("googleSignup", views.googleSignup, name="googleSignup"),
    path("usertype", views.usertype, name="usertype"),
    path("userdetails", views.userdetails, name="userdetails"),
    path("verifyOtp", views.verifyOtp, name="verifyOtp"),
    path("resendOtp", views.resendOtp, name="resendOtp"),
    path("getuser", views.getuser, name="getuser"),
    path("updateProfile", views.updateProfile, name="updateProfile"),
    path("follow", views.follow, name="follow"),
    path("profileSettings", views.profileSettings, name="profileSettings"),
    path("followers", views.followers, name="followers"),
    path("followings", views.followings, name="followings"),
]
