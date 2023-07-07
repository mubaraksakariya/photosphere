from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from User.views import login_required
from User.models import CustomUser
from .models import Post, Media

# Create your views here.


@login_required
@csrf_exempt
def createpost(request):
    files = request.FILES.getlist("files")
    caption = request.POST.get("caption")
    video_files = []
    image_files = []
    for file in request.FILES.getlist("files"):
        if file.content_type.startswith("video/"):
            video_files.append(file)
        elif file.content_type.startswith("image/"):
            image_files.append(file)
    user = CustomUser.objects.get(id=request.user.id)
    post = Post.objects.create(
        user=user,
        caption=caption,
    )
    for file in files:
        media = Media.objects.create(
            file=file,
            post=post,
        )
        print(media.file)
    return JsonResponse({"result": True})


def profileposts(request):
    user = request.user
    allPosts = Post.objects.filter(user=user)
    for post in allPosts:
        print(post)

    return JsonResponse({"result": True, "posts": allPosts})
