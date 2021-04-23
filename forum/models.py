from django.db import models
from django.contrib.auth.models import User

# Model for a single Thread
class Thread(models.Model):
    PostCount = models.IntegerField(default=1)
    Title = models.CharField(max_length=255)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Category = models.CharField(max_length=255)
    Creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    Base_View = models.CharField(max_length=255, blank=True, null=True)

# Model for a single Post
class Post(models.Model):
    Creator = models.ForeignKey(User, on_delete=models.CASCADE)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Body = models.TextField(blank=True, null=True)
    Poll_Title = models.CharField(max_length=255, blank=True, null=True)
    Poll_Yes = models.IntegerField(default=0, blank=True, null=True)
    Poll_No = models.IntegerField(default=0, blank=True, null=True)
    ParentThread = models.ForeignKey(Thread, on_delete=models.CASCADE, default=1)