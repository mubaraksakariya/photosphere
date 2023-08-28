from django.http import JsonResponse
from .models import Notification, serialize_notification, serialize_notifications
from User.views import login_required

# Create your views here.


@login_required
def getnotifications(request):
    print("notifications called")
    print(request.user)
    notifications = Notification.objects.filter(user=request.user)
    print(notifications.count())
    notifications = serialize_notifications(notifications)
    response_data = {
        "result": True,
        "notifications": notifications,
    }
    return JsonResponse(response_data)


@login_required
def notificationviewed(request):
    id = request.GET.get("notification_id")
    notification = Notification.objects.get(id=id)
    notification.is_read = True
    notification.save()
    return JsonResponse({"response": True})


def getunreadnotifications(request):
    count = Notification.objects.filter(user=request.user, is_read=False).count()
    response = {"result": True, "count": count}
    return JsonResponse(response)
