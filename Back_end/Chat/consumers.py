from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json
from datetime import datetime
from User.models import CustomUser
from User.simple_token import decode_jwt_token
from Chat.models import Message
from Notification.models import Notification

connected_users = {}  # Maintain a dictionary to map WebSocket connections to users.


class MessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        token = self.scope["query_string"].decode("utf-8")[6:]
        if token:
            sender = await self.get_user_from_token(token)
            if sender:
                connected_users[
                    sender.id
                ] = self  # Add the WebSocket connection to the mapping.
                await self.mark_user_online(sender.id, True)

    async def disconnect(self, close_code):
        # Remove the WebSocket connection from the mapping when disconnected.
        for user_id, connection in connected_users.items():
            if connection == self:
                del connected_users[user_id]
                await self.mark_user_online(user_id, False)
                break

    async def receive(self, text_data):
        data = json.loads(text_data)
        token = self.scope["query_string"].decode("utf-8")[6:]
        receiver = data.get("receiver")
        receiver = await sync_to_async(CustomUser.objects.get)(id=receiver)
        message_content = data.get("text")
        print(message_content)
        if token:
            sender = await self.get_user_from_token(token)
            if sender and receiver and message_content != "_USER_IS_TYPING_":
                await sync_to_async(Message.objects.create)(
                    sender=sender, receiver=receiver, text=message_content
                )
            await self.send_message_to_user(receiver, message_content, sender)

    async def send_message_to_user(self, receiver, message, sender, type="chat"):
        recipient_connection = connected_users.get(receiver.id)
        if recipient_connection:
            await recipient_connection.send(
                text_data=json.dumps(
                    {
                        "type": type,
                        "text": message,
                        "sender": sender.id,
                        "receiver": receiver.id,
                        "timestamp": datetime.now().isoformat(),
                    }
                )
            )
        elif message != "_USER_IS_TYPING_":
            await self.create_message_notification(receiver, sender)

    async def get_user_from_token(self, token):
        try:
            user_id = decode_jwt_token(token)
            sender = await sync_to_async(CustomUser.objects.get)(id=user_id)
            return sender
        except:
            return None

    async def mark_user_online(self, user_id, value):
        print(user_id)
        print(value)
        try:
            user = await sync_to_async(CustomUser.objects.get)(id=user_id)
            user.is_online = value
            await sync_to_async(user.save)()
        except:
            print("user dose not exists or some other error")

    async def create_message_notification(self, receiver, sender):
        notification_filter = {
            "user": receiver,
            "notification_type": "message",
            "text": f"{sender.id}",
        }
        existing_notifications = await Notification.objects.filter(
            **notification_filter
        )

        if existing_notifications.exists():
            await existing_notifications.update(is_read=False)
        else:
            await sync_to_async(Notification.objects.create)(
                user=receiver,
                notification_type="message",
                text=f"{sender.id}",
            )
