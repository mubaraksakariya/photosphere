from django.db import models
from django.core import serializers
from django.forms import model_to_dict

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey("User.CustomUser", on_delete=models.CASCADE)
    notification_type = models.CharField(
        max_length=50
    )  # Changed field name to "notification_type"
    text = models.CharField(max_length=50)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]


# Updated function names and corrected the argument names
def serialize_notification(notification):
    notification_dict = model_to_dict(notification)
    return notification_dict


def serialize_notifications(notifications_queryset):
    serialized_notifications = [
        serialize_notification(notification) for notification in notifications_queryset
    ]
    return serialized_notifications
