from django.db import models
from User.models import CustomUser
from django.core.serializers import serialize
import json

# Create your models here.


class Message(models.Model):
    sender = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="sent_messages"
    )
    receiver = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="received_messages"
    )
    text = models.TextField(null=True, blank=True)
    media = models.ImageField(upload_to="chat_media/", null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username}: {self.message_content[:20]}"

    def setIsRead(self):
        self.is_read = True
        self.save()


def serialize_chat(message):
    message.setIsRead()
    message_data = serialize("json", [message])
    message_data = json.loads(message_data)[0]["fields"]
    return message_data


def serialize_chats(messages_queryset):
    serialized_messages = [serialize_chat(message) for message in messages_queryset]
    return serialized_messages
