from django.http import JsonResponse
from .models import Notification, serialize_notification, serialize_notifications

# Create your views here.


def getnotifications(request):
    notifications = Notification.objects.all()
    notifications = serialize_notifications(notifications)
    response_data = {
        "result": True,
        "notifications": list(notifications),
    }
    return JsonResponse(response_data)
