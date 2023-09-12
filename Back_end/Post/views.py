import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from Notification.views import (
    deletePostCommentNotification,
    deletepostLikeNotification,
    postCommentNotification,
    postLikeNotification,
)
from User.views import login_required
from User.models import CustomUser, serialize_user
from .models import Post, Media, Like, Comment, serialize_post
from django.core.paginator import Paginator, EmptyPage
from rest_framework.decorators import api_view
from django.forms.models import model_to_dict

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
    post = model_to_dict(Post.objects.get(id=post.id))
    return JsonResponse({"result": True, "post": post})


@csrf_exempt
@login_required
def profileposts(request):
    user = request.GET.get("user")
    if user is None:
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


@csrf_exempt
@login_required
def getmedia(request):
    post_id = request.GET.get("post_id")
    post = Post.objects.get(id=post_id)
    media = Media.objects.filter(post=post).values_list("file", flat=True)
    return JsonResponse({"result": True, "media": list(media)})


@csrf_exempt
@login_required
def getfeed(request):
    allPosts = Post.objects.all()

    page_number = int(request.GET.get("page", 1))
    paginator = Paginator(allPosts, 5)

    try:
        posts = paginator.page(page_number)
        post_ids = [post.id for post in posts]
    except EmptyPage:
        return JsonResponse({"result": False, "posts": []})

    return JsonResponse({"result": True, "posts": post_ids})


@csrf_exempt
@login_required
def post(request):
    id = request.GET.get("post_id")
    post = Post.objects.get(id=id)
    return JsonResponse(
        {"result": True, "post": serialize_post(post, user=request.user)}
    )


@csrf_exempt
@login_required
def likeapost(request):
    if request.method == "PUT":
        data = json.loads(request.body.decode("utf-8"))
        post_id = data.get("post_id")
        post = Post.objects.get(id=post_id)
        if Like.objects.filter(user=request.user, post=post).exists():
            like = Like.objects.filter(user=request.user, post=post)
            for item in like:
                deletepostLikeNotification(item)
            like.delete()
        else:
            like = Like.objects.create(user=request.user, post=post)
            postLikeNotification(like)
        return JsonResponse({"result": True, "post_id": post_id})
    if request.method == "GET":
        like_id = request.GET.get("like_id")
        like = Like.objects.get(id=like_id)
        user = like.user
        post = like.post
        return JsonResponse(
            {"result": True, "post": serialize_post(post), "user": serialize_user(user)}
        )
    print(request.method)
    return JsonResponse({"result": False})


# @api_view(["POST"])
@csrf_exempt
@login_required
def commentonpost(request):
    if request.method == "POST":
        post_id = request.POST.get("post_id")
        comment = request.POST.get("comment")
        post = Post.objects.get(id=post_id)
        new_comment = Comment.objects.create(user=request.user, post=post, text=comment)
        postCommentNotification(new_comment)
        new_comment = Comment.objects.filter(id=new_comment.id).values()
        return JsonResponse({"result": True, "comment": list(new_comment)})
    if request.method == "GET":
        comment_id = request.GET.get("comment_id")
        comment = Comment.objects.get(id=comment_id)
        post = comment.post
        user = comment.user
        return JsonResponse(
            {"result": True, "user": serialize_user(user), "post": serialize_post(post)}
        )


@login_required
def getcomments(request):
    post = request.GET.get("post_id")
    count = request.GET.get("count")
    comments = None
    if post:
        post = Post.objects.get(id=post)
        if not count == None:
            comments = (
                Comment.objects.filter(post=post)
                .order_by("-created_at")
                .values()[: int(count)]
            )
        else:
            comments = (
                Comment.objects.filter(post=post).order_by("-created_at").values()
            )

    return JsonResponse({"result": True, "comments": list(comments)})


@login_required
def deletecomment(request):
    comment = request.GET.get("comment")
    comment = Comment.objects.get(id=comment)
    comment.is_deleted = True
    deletePostCommentNotification(comment)
    comment.save()
    return JsonResponse({"result": True, "comment": comment.id})
