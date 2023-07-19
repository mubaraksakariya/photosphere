from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from User.models import CustomUser, serialize_user, serialize_users
from rest_framework.decorators import api_view
from django.http import JsonResponse

# Create your views here.


def getusers(request):
    users = CustomUser.objects.all().exclude(is_superuser=True)
    users = serialize_users(users)
    return JsonResponse({"result": True, "users": users})
