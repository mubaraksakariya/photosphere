from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json

from User.models import CustomUser
from User.simple_token import decode_jwt_token
from Chat.models import Message

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

    async def disconnect(self, close_code):
        # Remove the WebSocket connection from the mapping when disconnected.
        for user_id, connection in connected_users.items():
            if connection == self:
                del connected_users[user_id]
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

    async def send_message_to_user(self, receiver, message, sender):
        recipient_connection = connected_users.get(receiver.id)
        if recipient_connection:
            await recipient_connection.send(
                text_data=json.dumps(
                    {
                        "text": message,
                        "sender": sender.id,
                        "receiver": receiver.id,
                    }
                )
            )

    async def get_user_from_token(self, token):
        try:
            user_id = decode_jwt_token(token)
            sender = await sync_to_async(CustomUser.objects.get)(id=user_id)
            return sender
        except:
            return None
