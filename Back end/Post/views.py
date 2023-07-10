from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from User.views import login_required
from User.models import CustomUser
from .models import Post, Media, Like, Comment
from django.core.paginator import Paginator
from rest_framework.decorators import api_view

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
    return JsonResponse({"result": True})


@login_required
def profileposts(request):
    user = request.user
    allPosts = Post.objects.filter(user=user).values()
    if allPosts.count() > 0:
        for post in allPosts:
            post["is_liked"] = False
            if Like.objects.filter(user=request.user, post=post["id"]).exists():
                post["is_liked"] = True
            post["total_likes"] = Like.objects.filter(post=post["id"]).count()
            post["total_comments"] = Comment.objects.filter(post=post["id"]).count()
        return JsonResponse({"result": True, "allPosts": list(allPosts)})
    return JsonResponse({"result": False, "allPosts": list(allPosts)})


@login_required
def getmedia(request):
    post_id = request.GET.get("post_id")
    post = Post.objects.get(id=post_id)
    media = Media.objects.filter(post=post).values_list("file", flat=True)
    return JsonResponse({"result": True, "media": list(media)})


@login_required
def getfeed(request):
    allPosts = Post.objects.all().values()
    page_number = int(request.GET.get("page"))
    print((page_number))
    paginator = Paginator(allPosts, 1)
    if page_number <= paginator.num_pages:
        posts = paginator.get_page(page_number)
        for post in posts:
            post["is_liked"] = False
            if Like.objects.filter(user=request.user, post=post["id"]).exists():
                post["is_liked"] = True
            post["total_likes"] = Like.objects.filter(post=post["id"]).count()
            post["total_comments"] = Comment.objects.filter(post=post["id"]).count()

    else:
        posts = None
        return JsonResponse({"result": False, "posts": posts})
    print(posts)
    return JsonResponse({"result": True, "posts": list(posts)})


@login_required
def likeapost(request):
    post_id = request.GET.get("post_id")
    post = Post.objects.get(id=post_id)
    if Like.objects.filter(user=request.user, post=post).exists():
        like = Like.objects.filter(user=request.user, post=post).delete()
    else:
        like = Like.objects.create(user=request.user, post=post)
    return JsonResponse({"result": True, "post_id": post_id})


# @api_view(["POST"])
@csrf_exempt
@login_required
def commentonpost(request):
    post_id = request.POST.get("post_id")
    comment = request.POST.get("comment")
    post = Post.objects.get(id=post_id)
    new_comment = Comment.objects.create(user=request.user, post=post, text=comment)
    new_comment = Comment.objects.filter(id=new_comment.id).values()
    return JsonResponse({"result": True, "comment": list(new_comment)})


@login_required
def getcomments(request):
    post = request.GET.get("post_id")
    count = int(request.GET.get("count"))
    post = Post.objects.get(id=post)
    comments = (
        Comment.objects.filter(post=post).order_by("-created_at").values()[:count]
    )

    return JsonResponse({"result": True, "comments": list(comments)})


@login_required
def deletecomment(request):
    comment = request.GET.get("comment")
    comment = Comment.objects.get(id=comment)
    comment.is_deleted = True
    comment.save()
    return JsonResponse({"result": True, "comment": comment.id})
