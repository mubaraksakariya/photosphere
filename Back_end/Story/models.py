from django.db import models


# Create your models here.
class ActiveStoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False, is_expired=False)


class Story(models.Model):
    user = models.ForeignKey("User.CustomUser", on_delete=models.CASCADE)
    file = models.FileField(upload_to="Media_files", default=None, null=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    is_expired = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    objects = ActiveStoryManager()

    class Meta:
        ordering = ["-created_at"]


class StoryViewed(models.Model):
    user = models.ForeignKey("User.CustomUser", on_delete=models.CASCADE)
    story = models.ForeignKey("Story", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
