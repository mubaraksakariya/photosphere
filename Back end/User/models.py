from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Q
from django.core import serializers
import json


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True)
    profile_img = models.ImageField(
        upload_to="Profile_img",
        height_field=None,
        width_field=None,
        max_length=None,
        blank=True,
        default="media/male.jpg",
    )
    bio = models.TextField(blank=True)
    otp = models.CharField(max_length=6, default="", blank=True)
    is_blocked = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_verified = models.BooleanField(default=False)
    # date_joined , is the feild for joined date or created_at

    # def email_user(self, subject, message, from_email=None, **kwargs):
    #     send_mail(subject, message, from_email, [self.email], **kwargs)


def authenticate(username, password):
    user = None
    user = CustomUser.objects.filter(
        Q(username=username) | Q(email=username) | Q(phone_number=username)
    ).first()
    if user and user.check_password(password):
        return user
    else:
        return None


def serialize_user(user):
    user_data = serializers.serialize("json", [user])
    user_json = json.loads(user_data)[0]["fields"]
    return user_json
