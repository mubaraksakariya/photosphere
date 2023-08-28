import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.crypto import get_random_string
import re
from .models import authenticate, CustomUser, serialize_user, Follow
from Notification.models import Notification
from .simple_token import generate_jwt_token
from django.core.mail import send_mail

from functools import wraps

import random


def generate_otp():
    otp = random.randint(100000, 999999)
    return otp


def send_otp(user):
    otp = str(generate_otp())
    user.otp = otp
    user.save()
    send_email(
        emailTo=user.email,
        message="Your OTP for authentication is " + otp,
    )


def login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.user is None:
            return JsonResponse({"result": False})
        # User is logged in, proceed with the decorated function
        return func(request, *args, **kwargs)

    return wrapper


def send_email(subject="otp", message="otp", emailTo="exampleemail"):
    send_mail(
        subject,
        message,
        "spherephotosphere@gmail.com",
        [emailTo],
        fail_silently=False,
    )


@login_required
def usertype(request):
    if request.user.is_superuser:
        return JsonResponse({"result": True, "user": "admin"})
    else:
        return JsonResponse({"result": True, "user": "user"})


### signup  #########
@api_view(["POST"])
@csrf_exempt
def signup(request):
    email = request.data.get("email")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    username = request.data.get("username")
    password = request.data.get("password")
    pattern = r"^(\+91|0|91)?\d{10}$"

    if (
        CustomUser.objects.filter(email=email).exists()
        or CustomUser.objects.filter(phone_number=email).exists()
        or CustomUser.objects.filter(username=username).exists()
    ):
        return JsonResponse({"result": False})
    if re.match(pattern, email):
        phone = email
        email = None
    user = CustomUser.objects.create(
        email=email,
        first_name=first_name,
        last_name=last_name,
        username=username,
    )

    user.set_password(password)
    send_otp(user)
    return JsonResponse({"result": True, "user": user.id})


@api_view(["POST"])
@csrf_exempt
def googleSignup(request):
    token = request.data.get("token")
    email = token["email"]
    first_name = token["name"]
    profile_image_url = token["picture"]
    response = requests.get(profile_image_url)
    user = None
    if response.status_code == 200:
        content = response.content
        file = ContentFile(content)
        profile_image = default_storage.save(f"{email}.jpg", file)
    else:
        profile_image = None

    if not CustomUser.objects.filter(email=email).exists():
        user = CustomUser.objects.create(
            username=email,
            email=email,
            first_name=first_name,
            profile_img=profile_image,
            password=get_random_string(10),
            is_verified=True,
        )
    else:
        user = CustomUser.objects.get(email=email)
    default_storage.delete(f"{email}.jpg")
    token = generate_jwt_token(user)
    user = serialize_user(user, user)
    return JsonResponse({"result": True, "token": token, "user": user})


@api_view(["POST"])
@csrf_exempt
def signin(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(username=email, password=password)
    if user is not None and user.is_verified:
        token = generate_jwt_token(user=user)
        user = serialize_user(user, user)
        return JsonResponse({"result": True, "token": token, "user": user})
    else:
        if user is not None:
            send_otp(user)
        return JsonResponse(
            {"result": False, "is_verified": user.is_verified, "user": user.id}
        )


@login_required
def userdetails(request):
    data = request.GET
    user_details_requested = [item for _, item in data.items()]
    user_data = {}
    for item in user_details_requested:
        if hasattr(request.user, item):
            user_data[item] = getattr(request.user, item)
    user_data.update({"result": True})
    return JsonResponse(user_data)


# @api_view(['POST'])
@csrf_exempt
def verifyOtp(request):
    payload = json.loads(request.body)
    otp = payload.get("otp")
    user = payload.get("user")
    user = CustomUser.objects.get(id=user)

    if user.otp == otp or user.is_verified:
        user.is_verified = True
        user.save()
        token = generate_jwt_token(user=user)
        return JsonResponse({"result": True, "token": token})
    else:
        return JsonResponse({"result": False})


def resendOtp(request):
    user = request.GET.get("user")
    user = CustomUser.objects.get(id=user)
    send_otp(user)
    return JsonResponse({"result": True})


@login_required
def getuser(request):
    id = request.GET.get("user")
    user = request.user
    if id:
        user = CustomUser.objects.get(id=id)
        id = user.id
    user = serialize_user(user, request.user)
    return JsonResponse({"result": True, "user": user})


@login_required
@csrf_exempt
def updateProfile(request):
    email = request.POST.get("email")
    username = request.POST.get("username")
    first_name = request.POST.get("first_name")
    last_name = request.POST.get("last_name")
    bio = request.POST.get("bio")
    user = CustomUser.objects.get(id=request.user.id)
    user.first_name = first_name
    user.email = email
    user.username = username
    user.last_name = last_name
    user.bio = bio
    if request.FILES.get("profilepic"):
        image = user.profile_img.path
        default_storage.delete(image)
        user.profile_img = request.FILES["profilepic"]
    user.save()
    return JsonResponse({"result": True, "user": serialize_user(user, request.user)})


@login_required
@csrf_exempt
def follow(request):
    user = int(request.GET.get("user"))
    user_to_follow = CustomUser.objects.get(id=user)
    if not Follow.objects.filter(user=request.user, following=user_to_follow).exists():
        follow = Follow.objects.create(user=request.user, following=user_to_follow)
        if user_to_follow.is_private:
            Notification.objects.create(
                user=user_to_follow,
                notification_type="follow_request",
                context=f"{request.user.id}",
            )
        else:
            Notification.objects.create(
                user=user_to_follow,
                notification_type="following",
                context=f"{request.user.id}",
            )
    else:
        Follow.objects.get(user=request.user, following=user_to_follow).delete()
    return JsonResponse(
        {"result": True, "user": serialize_user(user_to_follow, request.user)}
    )


@login_required
@csrf_exempt
def profileSettings(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body.decode("utf-8"))
            profile = data.get("profile")
            user = CustomUser.objects.get(id=profile["id"])
            user.is_private = bool(profile["is_private"])
            user.save()
            print(user.is_private)
            return JsonResponse({"result": True})
        except Exception as e:
            print(str(e))
            return JsonResponse({"result": False})
    else:
        return JsonResponse({"result": False})
