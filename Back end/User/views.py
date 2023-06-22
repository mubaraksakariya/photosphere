import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.utils.crypto import get_random_string
import re
from .models import authenticate,CustomUser
from .simple_token import generate_jwt_token
# Create your views here.

from functools import wraps

def login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.user is None:
            return JsonResponse({'result':False})
        # User is logged in, proceed with the decorated function
        return func(request, *args, **kwargs)

    return wrapper




def usertype(request):
    return JsonResponse({'result':True,'user':'user'})


### signup  #########
@api_view(['POST'])
@csrf_exempt
def signup(request):
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    username = request.data.get('username')
    password = request.data.get('password')
    pattern = r'^(\+91|0|91)?\d{10}$'
    
    if CustomUser.objects.filter(email = email).exists() or CustomUser.objects.filter(phone_number = email).exists() or CustomUser.objects.filter(username = username).exists():
        return JsonResponse({'result':False})
    if re.match(pattern, email): 
        phone = email
        email = None
    user = CustomUser.objects.create(
        email = email,
        first_name =first_name,
        last_name = last_name,
        username = username,
    )
    user.set_password(password)
    user.save()
    return JsonResponse({'result':True})


@api_view(['POST'])
@csrf_exempt
def googleSignup(request):
    token = request.data.get('token')
    email = token['email']
    first_name = token['name']
    profile_image_url = token['picture']
    response = requests.get(profile_image_url)
    if response.status_code == 200:
        content = response.content
        file = ContentFile(content)
        profile_image = default_storage.save(f"{email}.jpg", file)
    else:
        profile_image =  None

    if not CustomUser.objects.filter(email = email).exists():
        user = CustomUser.objects.create(
            username = email,
            email = email,
            first_name = first_name,
            profile_img = profile_image,
            password = get_random_string(10)
        )
    else:
        user = CustomUser.objects.get(email = email)
    default_storage.delete(f"{email}.jpg")
    token = generate_jwt_token(user)
    print(token)
    # print(decode_jwt_token(token)['user_id'])
    return JsonResponse({'result':True,'token':token})


@api_view(['POST'])
@csrf_exempt
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(username=email,password=password)
    print(user)
    if user is not None:
        token = generate_jwt_token(user=user)
        return JsonResponse({'result':True,'token':token})
    else:
        return JsonResponse({'result':False})


@login_required
def userdetails(request):
    data = request.GET
    user_details_requested = [item for _,item in data.items()]
    user_data = {}
    for item in user_details_requested:
        if hasattr(request.user, item):
            user_data[item] = getattr(request.user, item)
    user_data.update({'result': True})
    print(user_data)

    return JsonResponse(user_data)


