from django.db import models
from django.core import serializers

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey("User.CustomUser", on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    text = models.CharField(max_length=50)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    is_read = models.BooleanField(default=False)


def serialize_notifiaction(notifiactio):
    notifiactio_json = serializers.serialize("json", [notifiactio])
    return notifiactio_json


def serialize_notifiactions(users_queryset):
    serialized_users = [serialize_notifiaction for user in users_queryset]
    return serialized_users
