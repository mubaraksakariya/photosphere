from django.http import JsonResponse
from .models import Notification, serialize_notifiaction, serialize_notifiactions

# Create your views here.


def getnotifications(request):
    notifications = Notification.objects.all()
    notifications = serialize_notifiactions(notifications)
    response_data = {
        "result": True,
        "notifications": notifications,
    }
    return JsonResponse(response_data)
