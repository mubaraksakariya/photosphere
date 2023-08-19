from django.http import JsonResponse

# Create your views here.


def getnotifications(request):
    response_data = {
        "result": True,
    }
    return JsonResponse(response_data)
