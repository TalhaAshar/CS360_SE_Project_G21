from rest_framework import serializers
from .models import Thread, Post
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
