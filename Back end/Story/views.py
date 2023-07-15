from django.http import JsonResponse
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
    return JsonResponse({"result": True, "story": list(story)})


@login_required
@csrf_exempt
def getstories(request):
    user = request.GET.get("user_id")
    stories = None
    if user:
        stories = Story.objects.filter(user=user).values()
    else:
        stories = Story.objects.all().values()

    stories = list(stories)
    for story in stories:
        story_id = story["id"]
        if StoryViewed.objects.filter(user=request.user, story=story_id).exists():
            story["is_viewed"] = True
        else:
            story["is_viewed"] = False
    return JsonResponse({"result": True, "stories": stories})


# @login_required
# def getmedia(request):
#     story_id = request.GET.get("story_id")
#     story = Story.objects.get(id=story_id)
#     media = Media.objects.filter(story=story).values()
#     for item in media:
#         print(item["id"])
#         print()
#     return JsonResponse({"result": True, "media": list(media)})


@login_required
def setsoryviewed(request):
    stories = request.GET.get("stories")
    story_ids = json.loads(stories)
    stories = Story.objects.filter(id__in=story_ids)
    for story in stories:
        viewed = StoryViewed.objects.create(user=request.user, story=story)
        print(viewed.id)
    return JsonResponse({"result": True})
