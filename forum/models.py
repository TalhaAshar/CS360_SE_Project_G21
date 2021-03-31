from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Thread(models.Model):
    PostCount = models.IntegerField(default=1)
    Title = models.CharField(max_length=255)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Category = models.CharField(max_length=255)
    Creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

class Post(models.Model):
    Creator = models.ForeignKey(User, on_delete=models.CASCADE)
    TimeStamp = models.DateTimeField(auto_now_add=True)
    Body = models.TextField(blank=True, null=True)
    Image = models.ImageField(upload_to='publications/', blank=True, null=True)
    Poll_Title = models.CharField(max_length=255, blank=True, null=True)
    Poll_Yes = models.IntegerField(default=0, blank=True, null=True)
    Poll_No = models.IntegerField(default=0, blank=True, null=True)

class Postings(models.Model):
    ParentThread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    ParentPost = models.ForeignKey(Post, on_delete=models.CASCADE)

class Conversation(models.Model):
    Sender = models.ForeignKey(User, on_delete=models.CASCADE)
    # Receiver = models.ForeignKey(User, on_delete=models.CASCADE)

class Message(models.Model):
    Communicators = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Body = models.TextField()