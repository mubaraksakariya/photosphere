from django.db import models
from Post.models import Post, Media
from django.contrib.auth.models import AbstractUser
from django.db.models import Q
from django.core import serializers
import json


def default_profile_image_path():
    return "Profile_img/male.jpg"


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True)
    profile_img = models.ImageField(
        upload_to="Profile_img",
        height_field=None,
        width_field=None,
        max_length=None,
        blank=True,
        default=default_profile_image_path,
    )
    bio = models.TextField(blank=True)
    otp = models.CharField(max_length=6, default="", blank=True)
    is_blocked = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_verified = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)
    # date_joined , is the feild for joined date or created_at

    # @property
    # def number_of_posts(self):
    #     return Post.objects.filter(user=self).count()


def authenticate(username, password):
    user = None
    user = CustomUser.objects.filter(
        Q(username=username) | Q(email=username) | Q(phone_number=username)
    ).first()
    if user and user.check_password(password):
        return user
    else:
        return None


def serialize_user(user, currentUser=None):
    if currentUser == None:
        currentUser = user
    user_data = serializers.serialize("json", [user])
    user_json = json.loads(user_data)[0]["fields"]
    user_json["number_of_posts"] = Post.objects.filter(user=user.id).count()
    user_json.pop("password", None)
    user_json["id"] = user.id
    user_json["is_following"] = Follow.objects.filter(
        user=currentUser, following_id=user.id
    ).exists()
    user_json["followersCount"] = Follow.objects.filter(following=user).count()
    user_json["followiigCount"] = Follow.objects.filter(user=user).count()

    return user_json


def serialize_users(users_queryset, currentUser=None):
    serialized_users = [serialize_user(user, currentUser) for user in users_queryset]
    return serialized_users


class Follow(models.Model):
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE)
    following = models.ForeignKey(
        "CustomUser", on_delete=models.CASCADE, related_name="following"
    )
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)
