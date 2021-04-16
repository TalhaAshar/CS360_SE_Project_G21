from rest_framework import serializers
from .models import Thread, Post, Message, Conversation
from django.contrib.auth.models import User
from accounts.serializers import UserSerializer

class ThreadSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = Thread
        fields = ('id', 'PostCount', 'Title', 'Timestamp', 'Category', 'Creator', 'Base_View')

class PostSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'Creator', 'TimeStamp', 'Body', 'Poll_Title', 'Poll_Yes', 'Poll_No')

# class ListingsSerializer(serializers.ModelSerializer):
#     ParentThread = ThreadSerializer(read_only=True)
#     ParentPost = PostSerializer(read_only=True)
#     class Meta:
#         model = Postings
#         fields = ('id', 'ParentThread', 'ParentPost')

# class ConversationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Conversation
#         fields = ('id', 'Sender', 'Recipient')

# class MessageSerializer(serializers.ModelSerializer):
#     Communicators = ConversationSerializer(read_only=True)
#     Sender = UserSerializer(read_only=True)
#     Receiver = UserSerializer(read_only=True)
#     class Meta:
#         model = Message
#         fields = ('id', 'Sender', 'Receiver', 'Communicators', 'Timestamp', 'Body')
