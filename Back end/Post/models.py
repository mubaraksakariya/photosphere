from django.db import models


class CustomManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class Media(models.Model):
    file = models.FileField(upload_to="Media_files")
    post = models.ForeignKey("Post", on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_deleted = models.BooleanField(default=False)

    objects = CustomManager()


class Post(models.Model):
    user = models.ForeignKey("User.Customuser", on_delete=models.CASCADE)
    caption = models.TextField(default="")
    location = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_deleted = models.BooleanField(default=False)

    @property
    def media_files(self):
        return Media.objects.filter(post=self).values_list()

    @property
    def total_likes(self):
        return Like.objects.filter(post=self).count()

    @property
    def total_comments(self):
        return Comment.objects.filter(post=self).count()

    objects = CustomManager()

    class Meta:
        ordering = ["-created_at"]


class Like(models.Model):
    user = models.ForeignKey("User.Customuser", on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey("User.Customuser", on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE)
    text = models.TextField(default="")
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_deleted = models.BooleanField(default=False)

    objects = CustomManager()

    class Meta:
        ordering = ["-created_at"]
