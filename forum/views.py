from django.shortcuts import render
from .models import Thread, Post
from django.contrib.auth.models import User

from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from register.models import Profile
from django.db.models import Q
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer, ThreadSerializer
from accounts.models import MyActivity
from accounts.serializers import ActivitySerializer

# API to get the most recently added threads for guest user's views
class GuestRecentThreads(APIView):

    def get(self, request):

        queryset = Thread.objects.all().order_by('-Timestamp')
        serializer = ThreadSerializer(queryset, many=True)
        return Response(serializer.data)


# API to get the most recently added threads for logged in users
class UserRecentThreads(APIView):

    def get(self, request):

        # Ensure the user is logged in
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Find and return 4 threads each of the Announcements, Other, and General categories
        announcements = Thread.objects.filter(Category='Announcements').order_by('-Timestamp')[:4]
        general = Thread.objects.filter(Category='General').order_by('-Timestamp')[:4]
        other = Thread.objects.filter(Category='Other').order_by('-Timestamp')[:4]
        
        temp = announcements.union(general, other, all=True)
        serializer = ThreadSerializer(temp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# API to generate a view for a particlar thread
class ThreadsHome(APIView):

    def get(self, request, id):
        
        # Find the thread and all its posts
        try:
            thread = Thread.objects.get(id=id)
            queryset = Post.objects.filter(ParentThread=thread).order_by('TimeStamp')
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        all_posts = PostSerializer(queryset, many=True)
        return Response(all_posts.data, status=status.HTTP_200_OK)
    
    # Create a new post on an existing thread
    def post(self, request, id):

        # Ensure that the thread exists
        try:
            queryset = Thread.objects.get(id=id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Ensure that the user is logged in
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Ensure the user is not trying to make an empty post
        if(request.data["data"]["Body"] == ""):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check if the body is less than 5000 characters
        if(len(request.data["data"]["Body"]) > 5000):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        # Update thread metadata
        user = User.objects.get(username=request.user)
        count = queryset.PostCount + 1
        queryset.PostCount = count
        queryset.save(update_fields=["PostCount"])

        parse = request.data["data"]

        # Create the new post
        temp = Post.objects.create(Creator=user, Body=parse["Body"], ParentThread=queryset)
        temp.save()

        all_posts = Post.objects.filter(ParentThread=queryset).order_by('TimeStamp')
        all_posts = PostSerializer(all_posts, many=True)

        # Record the user's activity
        user_activity = MyActivity.objects.create(Owner=user, CreatedPost=queryset)
        user_activity.save()

        return Response(all_posts.data, status=status.HTTP_200_OK)


# API View to add a thread to the forum
class AddThread(APIView):

    serializer_class = ThreadSerializer
    
    def post(self, request):

        # Ensure that the user is logged in
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user = User.objects.get(username=request.user)
        parse = request.data["data"]

        #  Ensure the user is not trying to make an empty post
        if(parse["Body"] == ""):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check if the body is less than 5000 characters
        if(len(parse["Body"]) > 5000):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Create the thread
        new_thread = Thread.objects.create(Title=parse["Title"], Category=parse["Category"], Creator=user)
        new_thread.save()
        new_thread.Base_View = parse["Body"][:60]
        new_thread.save(update_fields=["Base_View"])
        new_post = Post.objects.create(Creator=user,Body=parse["Body"], ParentThread=new_thread)
        new_post.save()
        print(new_post.Body)

        queryset = Thread.objects.get(id=new_thread.id)
        temp = ThreadSerializer(queryset)

        # Record the user's activity
        user_activity = MyActivity.objects.create(Owner=user, CreatedThread=new_thread)
        user_activity.save()

        return Response(temp.data, status=status.HTTP_200_OK)

# API to delete a thread from the forum
class DeleteThread(APIView):

    def post(self, request, id):

        # Ensure that the user is logged in
        if (not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Ensure that the thread to delete exists
        try:
            thread_to_delete = Thread.objects.get(id=id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(username=request.user)
        temp_check = Profile.objects.get(user=user)

        # Delete thread if the user has the authorization to
        if thread_to_delete.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':
            thread_to_delete.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


# API to edit a single post
class EditPost(APIView):

	def post(self, request, id, tid):

        # Ensure that the user is logged in
		if (not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

        # Ensure that the post to edit exists 
		try:
			post_to_edit = Post.objects.get(id=id)
			queryset = Thread.objects.get(id=tid)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

        # Ensure that the user is not trying to send an empty post
		if(request.data["data"]["Body"] == ""):
			return Response(status=status.HTTP_400_BAD_REQUEST)

		# Check if the body is less than 5000 characters
		if(len(request.data["data"]["Body"]) > 5000):
			return Response(status=status.HTTP_400_BAD_REQUEST)
    
		user = User.objects.get(username=request.user)
		temp_check = Profile.objects.get(user=user)

        # Edit post if the user has the authorization to
		if post_to_edit.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':

			parse = request.data["data"]
			post_to_edit.Body = parse["Body"]
			post_to_edit.save(update_fields=["Body"])

			all_posts = Post.objects.filter(ParentThread=queryset).order_by('TimeStamp')
			all_posts = PostSerializer(all_posts, many=True)
                
			return Response(all_posts.data, status=status.HTTP_200_OK)
		return Response(status=status.HTTP_401_UNAUTHORIZED)

# API to delete a single post from a thread
class DeletePost(APIView):

	def post(self, request, id, tid):

        # Ensure that the user is logged in
		if (not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Ensure that the post to delete exists 
		try:
			post_to_delete = Post.objects.get(id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		user = User.objects.get(username=request.user)
		temp_check = Profile.objects.get(user=user)

        # Delete post if the user has the authorization to
		if post_to_delete.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':
            
			parent_thread = Thread.objects.get(id=tid)

            # Update thread metadata
			count = parent_thread.PostCount - 1
			parent_thread.PostCount = count
			parent_thread.save(update_fields=["PostCount"])
            
			# Find all the posts under this particular thread
			all_children_posts = Post.objects.filter(ParentThread=parent_thread).order_by('TimeStamp')
			

			# If the post is the first post in the thread, delete the thread as well
			if(all_children_posts[0].id == id):

				# Delete the post in question
				post_to_delete.delete()
				
				parent_thread.delete()
				return Response(status=status.HTTP_200_OK)
			else:

				# Delete the post in question
				post_to_delete.delete()
				
				all_posts = Post.objects.filter(ParentThread=parent_thread).order_by('TimeStamp')
				all_posts = PostSerializer(all_posts, many=True)
				return Response(all_posts.data, status=status.HTTP_200_OK)

		return Response(status=status.HTTP_401_UNAUTHORIZED)


# API View to get all threads under a single category
class ThreadCategory(APIView):

	def get(self, request, category):

		try:
			queryset = Thread.objects.filter(Category=category).order_by('-Timestamp')
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		threads = ThreadSerializer(queryset, many=True)
		return Response(threads.data, status=status.HTTP_200_OK)

# API view to return a single thread
class IndividualThread(APIView):

	def get(self, request, id):

		try:
			thread_to_get = Thread.objects.get(id=id)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		serializer = ThreadSerializer(thread_to_get)
		return Response(serializer.data, status=status.HTTP_200_OK)

# API view to return a single post
class IndividualPost(APIView):

	def get(self, request, id):

		try:
			thread_to_get = Post.objects.get(id=id)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		serializer = PostSerializer(thread_to_get)
		return Response(serializer.data, status=status.HTTP_200_OK)

# API view to return a parent thread of post
class PostParent(APIView):

	def get(self, request, id):

		try:
			post_to_get = Post.objects.get(id=id)
			thread_to_get = Thread.objects.get(id=post_to_get.ParentThread.id)
		except Exception as e:
			print(e)
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		serializer = ThreadSerializer(thread_to_get)
		return Response(serializer.data, status=status.HTTP_200_OK)
