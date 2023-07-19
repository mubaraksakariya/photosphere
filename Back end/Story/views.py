from django.http import JsonResponse
from User.models import CustomUser, serialize_user
from User.views import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Story, StoryViewed
from Post.models import Media
import json


# Create your views here.


# @api_view(["POST"])
@login_required
@csrf_exempt
def createstory(request):
    file = request.FILES["file"]
    story = Story.objects.create(user=request.user, file=file)
    story = Story.objects.filter(id=story.id).values()
    user = serialize_user(request.user)
    return JsonResponse({"result": True, "user": list(user)})


@login_required
@csrf_exempt
def getstories(request):
    user = request.GET.get("user_id")
    stories = None
    if user:
        stories = Story.objects.filter(user=user).values()
        stories = list(stories)
        for story in stories:
            story_id = story["id"]
            if StoryViewed.objects.filter(user=request.user, story=story_id).exists():
                story["is_viewed"] = True
            else:
                story["is_viewed"] = False
        return JsonResponse({"result": True, "stories": stories})

    else:
        # stories = Story.objects.all().values()
        users_with_unviewed_stories = (
            Story.objects.exclude(storyviewed__user=request.user)
            .order_by("-created_at")
            .values_list("user", flat=True)
            .distinct()
        )
        unique_users = set(users_with_unviewed_stories)
        return JsonResponse({"result": True, "users": list(unique_users)})


@login_required
def setsoryviewed(request):
    stories = request.GET.get("stories")
    story_ids = json.loads(stories)
    stories = Story.objects.filter(id=story_ids)
    for story in stories:
        viewed = StoryViewed.objects.create(user=request.user, story=story)
    return JsonResponse({"result": True})
