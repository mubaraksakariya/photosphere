import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from User.models import authenticate, CustomUser, serialize_user
from User.simple_token import generate_jwt_token
from django.core import serializers
import os
from django.db.models import Q
from functools import wraps
from Post.models import Post
from Post.models import serialize_post, serialize_posts, Post


def login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.user is not None and request.user.is_superuser:
            return func(request, *args, **kwargs)
        # User is logged in, proceed with the decorated function
        return JsonResponse({"result": False})

    return wrapper


@csrf_exempt
def signin(request):
    data = request.body
    data = json.loads(data)
    email = data.get("email")
    password = data.get("password")

    user = authenticate(username=email, password=password)
    if user is not None and user.is_superuser:
        token = generate_jwt_token(user=user)
        user = serialize_user(user)
        return JsonResponse({"result": True, "token": token, "user": user})
    else:
        return JsonResponse({"result": False})


@login_required
def allusers(request):
    searchString = request.GET.get("searchString")
    if searchString is None:
        searchString = ""
    users = (
        CustomUser.objects.filter(
            Q(username__icontains=searchString)
            | Q(email__icontains=searchString)
            | Q(first_name__icontains=searchString)
            | Q(id__icontains=searchString)
        )
        .exclude(is_superuser=True)
        .values()
    )
    return JsonResponse({"result": True, "users": list(users)})


def toggleBlock(request):
    id = request.GET.get("id")
    user = CustomUser.objects.get(id=id)
    if user is not None:
        user.is_blocked = not user.is_blocked
        user.save()
        return JsonResponse({"result": True, "user": serialize_user(user)})
    else:
        return JsonResponse({"result": False})


def postlist(request):
    searchString = request.GET.get("searchString")
    if searchString is None:
        searchString = ""
    query = Q()
    search_terms = searchString.split()
    for term in search_terms:
        query |= Q(id__icontains=term)
        query |= Q(user__id__icontains=term)
        query |= Q(user__username__icontains=term)

    allPosts = Post.objects.filter(query)
    allPosts = serialize_posts(allPosts)
    return JsonResponse({"result": True, "allPosts": allPosts})
