from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Q


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20,blank=True)
    profile_img = models.ImageField(upload_to='Profile_img', height_field=None, width_field=None, max_length=None,blank=True)




def authenticate(username,password):
    user = None
    user = CustomUser.objects.filter(Q(username=username) | Q(email=username) | Q(phone_number=username)).first()
    if user and user.check_password(password):  
        return user
    else:
        return None

