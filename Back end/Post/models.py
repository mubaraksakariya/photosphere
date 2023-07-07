from django.db import models
import User

# Create your models here.


class Media(models.Model):
    file = models.FileField(upload_to="Media_files")
    post = models.ForeignKey("Post", on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_deleted = models.BooleanField(default=False)


class Post(models.Model):
    user = models.ForeignKey("User.Customuser", on_delete=models.CASCADE)
    caption = models.TextField(default="")
    location = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_deleted = models.BooleanField(default=False)
