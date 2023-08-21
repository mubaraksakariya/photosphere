from django.http import JsonResponse
from .models import Notification, serialize_notification, serialize_notifications

# Create your views here.


def getnotifications(request):
    notifications = Notification.objects.all()
    notifications = serialize_notifications(notifications)
    response_data = {
        "result": True,
        "notifications": notifications,
    }
    return JsonResponse(response_data)


def notificationviewed(request):
    id = request.GET.get("notification_id")
    notification = Notification.objects.get(id=id)
    notification.is_read = True
    notification.save()
    return JsonResponse({"response": True})
