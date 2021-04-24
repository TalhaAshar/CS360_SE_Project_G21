from rest_framework import serializers
from .models import Thread, Post, Notification
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer

# Serializer for Thread Instance
class ThreadSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = Thread
        fields = ('id', 'PostCount', 'Title', 'Timestamp', 'Category', 'Creator', 'Base_View')

# Serializer for Post Instance
class PostSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'Creator', 'TimeStamp', 'Body', 'Poll_Title', 'Poll_Yes', 'Poll_No')

# Serializer for Notification Instance
class NotificationSerializer(serializers.ModelSerializer):
    Owner = UserSerializer(read_only=True)
    Commentor = UserSerializer(read_only=True)
    ParentThread = ThreadSerializer(read_only=True)
    class Meta:
        model = Notification
        fields = ('id', 'Owner', 'Timestamp', 'ParentThread', 'Body', 'Commentor')