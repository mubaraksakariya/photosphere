from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.


def getnotifications(request):
    JsonResponse(
        {
            "result": True,
        }
    )
