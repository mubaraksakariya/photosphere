from django.urls import path, include
from . import views

urlpatterns = [
    path('signup',views.signup),
    path('signin',views.signin),
    path('googleSignup',views.googleSignup,name='googleSignup'),
    path('usertype',views.usertype,name='usertype'),
    path('userdetails',views.userdetails,name='userdetails'),

]