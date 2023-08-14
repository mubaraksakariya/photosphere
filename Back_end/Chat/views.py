from django.shortcuts import render
from django.core import serializers
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from User.models import CustomUser, serialize_user, serialize_users
from User.views import login_required
from django.http import JsonResponse
from .models import Message, serialize_chat, serialize_chats

# Create your views here.


@login_required
def getusers(request):
    search_string = request.GET.get("searchString", "").strip()
    if search_string == None:
        search_string = ""
    users = (
        CustomUser.objects.filter(username__icontains=search_string)
        .exclude(is_superuser=True)
        .exclude(id=request.user.id)
    )
    users = serialize_users(users)
    return JsonResponse({"result": True, "users": users})


@login_required
def getmessagehistory(request):
    sender = request.user
    reciever = request.GET.get("reciever")
    reciever = CustomUser.objects.get(id=reciever)
    messages = "None"
    messages = Message.objects.filter(
        (Q(sender=sender) & Q(receiver=reciever))
        | (Q(sender=reciever) & Q(receiver=sender))
    ).order_by("timestamp")
    messages = serialize_chats(messages)
    return JsonResponse({"result": True, "messages": messages})
