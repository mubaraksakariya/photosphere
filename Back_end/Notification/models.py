from django.db import models

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey("User.CustomUser", on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    text = models.CharField(max_length=50)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    is_read = models.BooleanField(default=False)
