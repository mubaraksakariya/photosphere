from django.http import JsonResponse
from .models import Notification, serialize_notification, serialize_notifications
from django.db.models import Q

# from User.views import login_required

# Create your views here.


# @login_required
def getnotifications(request):
    notifications = Notification.objects.filter(user=request.user, is_deleted=False)
    notifications = serialize_notifications(notifications)
    response_data = {
        "result": True,
        "notifications": notifications,
    }
    return JsonResponse(response_data)


# @login_required
def notificationviewed(request):
    id = request.GET.get("notification_id")
    notification = Notification.objects.get(id=id)
    notification.is_read = True
    notification.save()
    return JsonResponse({"response": True,'notification':serialize_notification(notification)})


def getunreadnotifications(request):
    notif = Notification.objects.filter(user=request.user, is_read=False,is_deleted = False)
    response = {"result": True, "count": notif.count()}
    return JsonResponse(response)


#### Private accounts accepting a follow request


def accept_follower_notification(user, follower):
    notific = Notification.objects.filter(
        user=user,
        notification_type="follow_request",
        context=f"{follower.id}",
    ).first()
    notific.is_deleted = True
    notific.save()
    notific = Notification.objects.filter(
        user=follower,
        notification_type="accepted",
        context=f"{user.id}",
    )
    for item in notific:
        item.is_deleted = True
        item.save()

    notific = Notification.objects.create(
        user=follower,
        notification_type="accepted",
        context=f"{user.id}",
    )
    return None


def follower_notification(user_to_follow, follower):
    if user_to_follow.is_private:
        Notification.objects.create(
            user=user_to_follow,
            notification_type="follow_request",
            context=f"{follower.id}",
        )
    else:
        notif = Notification.objects.filter(
            user=user_to_follow,
            notification_type="following",
            context=f"{follower.id}",
        )
        for item in notif:
            item.is_deleted = True
            item.save()
        Notification.objects.create(
            user=user_to_follow,
            notification_type="following",
            context=f"{follower.id}",
        )


def deleteFollowNotification(user_to_unfollow, follower):
    notif = Notification.objects.filter(
        Q(user=user_to_unfollow)
        & (Q(notification_type="following") | Q(notification_type="follow_request"))
        & Q(context=f"{follower.id}")
    )
    for item in notif:
        item.is_deleted = True
        item.save()


def postLikeNotification(like):
    notif = Notification.objects.filter(
        user=like.post.user, notification_type="like", context=f"{like.id}"
    )
    for item in notif:
        item.is_deleted = True
        item.save()
    notif = Notification.objects.create(
        user=like.post.user, notification_type="like", context=f"{like.id}"
    )

def deletepostLikeNotification(like):
    notif = Notification.objects.filter(
        user=like.post.user, notification_type="like", context=f"{like.id}"
    )
    for item in notif:
        item.is_deleted = True
        item.save()

def postCommentNotification(comment):
    notif = Notification.objects.filter(
        user=comment.post.user, notification_type="comment", context=f"{comment.id}"
    )
    for item in notif:
        item.is_deleted = True
        item.save()
    notif = Notification.objects.create(
        user=comment.post.user, notification_type="comment", context=f"{comment.id}"
    )
def deletePostCommentNotification(comment):
    notif = Notification.objects.filter(
        user=comment.post.user, notification_type="comment", context=f"{comment.id}"
    )
    for item in notif:
        item.is_deleted = True
        item.save()