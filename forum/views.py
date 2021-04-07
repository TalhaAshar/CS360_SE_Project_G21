from django.shortcuts import render
from .models import Thread, Post#, Message, Conversation
from django.contrib.auth.models import User

from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from register.models import Profile
from django.db.models import Q
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer, ThreadSerializer#, ConversationSerializer, MessageSerializer

# Create your views here.

class GuestRecentThreads(APIView):

    def get(self, request):

        queryset = Thread.objects.all().order_by('-Timestamp')
        #print(queryset)
        serializer = ThreadSerializer(queryset, many=True)
        return Response(serializer.data)

# class UserRecentThreads(APIView):

#     def get(self, request):

#         if(not request.user.is_authenticated):
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         announcements = Postings.objects.filter(ParentThread__Category='Announcements').order_by('ParentThread__Timestamp')[:4]
#         general = Postings.objects.filter(ParentThread__Category='General').order_by('ParentThread__Timestamp')[:4]
#         other = Postings.objects.filter(ParentThread__Category='Other').order_by('ParentThread__Timestamp')[:4]
        
#         temp = announcements.union(general, other, all=True)
#         serializer = ListingsSerializer(temp)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class ThreadsHome(APIView):

#     def get(self, request, id):

#         try:
#             queryset = Post.objects.filter(postings__ParentThread__id=id).order_by('Timestamp')
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         all_posts = PostSerializer(queryset, many=True)
#         return Response(all_posts.data, status=status.HTTP_200_OK)
    
#     def post(self, request, id):
#         try:
#             queryset = Thread.objects.get(id=id)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         if(not request.user.is_authenticated):
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user = User.objects.get(username=request.user)
#         count = queryset.PostCount + 1
#         queryset.PostCount = count
#         queryset.save(update_fields=["PostCount"])

#         parse = request.data["data"]
#         temp = Post.objects.create(Creator=user, Body=parse["Body"])
#         temp.save()
#         new_rel = Postings.objects.create(ParentThread=queryset, ParentPost=temp)
#         new_rel.save()


class AddThread(APIView):
    serializer_class = ThreadSerializer
    def post(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        user = User.objects.get(username=request.user)
        parse = request.data["data"]
        new_thread = Thread.objects.create(Title=parse["Title"], Category=parse["Category"], Creator=user)
        new_thread.Base_View = parse["Body"][:60]
        new_thread.save()
        new_post = Post.objects.create(Creator=user,Body=parse["Body"], ParentThread=new_thread)
        new_post.save()

        return Response(status=status.HTTP_200_OK)

# class EditThread(APIView):

#     def post(self, request, id):

#         if (not request.user.is_authenticated):
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         try:
#             thread_to_edit = Thread.objects.get(id=id)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user = User.objects.get(username=request.user)
#         temp_check = Profile.objects.get(user=user)
#         if thread_to_edit.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':

#             parse = request.data["data"]
#             thread_to_edit.Category = parse["Category"]
#             thread_to_edit.Title = parse["Title"]
#             thread_to_edit.save(update_fields=["Title", "Category"])
#             return Response(status=status.HTTP_200_OK)
#         return Response(status=status.HTTP_401_UNAUTHORIZED)

# class DeleteThread(APIView):

#     def post(self, request, id):

#         if (not request.user.is_authenticated):
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         try:
#             thread_to_delete = Thread.objects.get(id=id)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user = User.objects.get(username=request.user)
#         temp_check = Profile.objects.get(user=user)
#         if thread_to_delete.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':
#             thread_to_delete.delete()
#             return Response(status=status.HTTP_200_OK)
#         return Response(status=status.HTTP_401_UNAUTHORIZED)

# # class EditPost(APIView):

# #     def post(self, request, id)

# #         if (not request.user.is_authenticated):
# #                 return Response(status=status.HTTP_401_UNAUTHORIZED)
            
# #             try:
# #                 post_to_edit = Post.objects.get(id=id)
# #             except:
# #                 return Response(status=status.HTTP_404_NOT_FOUND)
            
# #             user = User.objects.get(username=request.user)
# #             temp_check = Profile.objects.get(user=user)
# #             if post_to_edit.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':

# #                 parse = request.data["data"]
# #                 thread_to_edit.Category = parse["Category"]
# #                 thread_to_edit.Title = parse["Title"]
# #                 thread_to_edit.save(update_fields=["Title", "Category"])
# #                 return Response(status=status.HTTP_200_OK)
# #             return Response(status=status.HTTP_401_UNAUTHORIZED)
            

# class DeletePost(APIView):

#     def post(self, request, id, tid):

#         if (not request.user.is_authenticated):
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         try:
#             post_to_delete = POST.objects.get(id=id)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user = User.objects.get(username=request.user)
#         temp_check = Profile.objects.get(user=user)
#         if post_to_delete.Creator == user or temp_check.User_Type == 'ADMIN' or temp_check.User_Type == 'MODERATOR':
            
#             parent_thread = Postings.objects.filter(ParentThread__id=tid).order_by('Timestamp')

#             if parent_thread[0].ParentPost == post_to_delete:
#                 parent_thread.delete()
#             post_to_delete.delete()

#             return Response(status=status.HTTP_200_OK)
#         return Response(status=status.HTTP_401_UNAUTHORIZED)

# class AddPost(APIView):

#     def post(self, request, id):
#         if (not request.user.is_authenticated):
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
#         try:
#             thread_to_edit = Thread.objects.get(id=id)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         user = User.objects.get(username=request.user)
#         new_post = Post.objects.create(Creator=user,Body=parse["Body"])
#         new_post.save()
#         new_postings = Postings.objects.create(ParentThread=thread_to_edit, ParentPost=new_post)
#         new_postings.save()
#         return Response(status=status.HTTP_200_OK)



# # class Messages(APIView):

# #     def get(self, request):

# #         if (not request.user.is_authenticated):
# #             return Response(status=status.HTTP_401_UNAUTHORIZED)
        
# #         user = User.objects.get(username=request.user)


