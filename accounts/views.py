from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from register.models import Profile
from django.db.models import Q
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from main.models import Publication, Contribution
from forum.models import Post, Thread
from .models import PersonalizedList, Listings, Report, ModeratorApplication, MyActivity
from .serializers import ListingsSerializer, ProfileSerializer, ReportSerializer, ModeratorSerializer, ActivitySerializer
from main.serializers import ContributionSerializer, PublicationSerializer
from forum.serializers import ThreadSerializer
from mysite.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
import random

# API View for generating recommnedaions based on the user's personalized list
class Recommendations(APIView):

    def get(self, request):
        
		# Find all the publications in the user's list
        try:
            queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

		# Keep track of the IDs of pubs in a user's list 
        collected = []
        for k in queryset:
            collected.append(k.id)
            
        total = Publication.objects.count() - 1
        j = 0

		# Find 5 recommended pubs
        recs = []
        while j < 5:
            temp = random.randint(1, total)
            if temp not in collected and temp not in recs:
                recs.append(temp)
                j = j + 1
        
        recs = Publication.objects.filter(Q(id=recs[0]) | Q(id=recs[1]) | Q(id=recs[2]) | Q(id=recs[3]) | Q(id=recs[4]))
        
		# Return the serialized publications
        temp = PublicationSerializer(recs, many=True)
        return Response(temp.data, status=status.HTTP_200_OK)


# API view for getting a user's personalized list items
class MyListDefault(APIView):

	def get(self, request):

		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'Please login to continue!'}, status=status.HTTP_404_NOT_FOUND)
		try:
			display_type = PersonalizedList.objects.get(Owner=request.user).Display_Type
		except:
			return Response({'Message' : 'Empty!'},status=status.HTTP_404_NOT_FOUND)
		
		# Depending on the display type, get the pubs in the user's list
		if display_type == 'ALPHABETICAL':
			try:
				queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
			except:
				return Response({'Message' : 'Empty!'}, status=status.HTTP_204_NO_CONTENT)

			temp = ListingsSerializer(queryset, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		elif display_type == 'UNREAD':
			try:
				user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
			except:
				try:
					user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
				except:
					return Response(status=status.HTTP_404_NOT_FOUND)
				temp = ListingsSerializer(user_list_read, many=True)
				return Response(temp.data, status=status.HTTP_200_OK)
			try:
				user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
			except:
				temp = ListingsSerializer(user_list_unread, many=True)
				return Response(temp.data, status=status.HTTP_200_OK)
			user_list = user_list_unread.union(user_list_read, all=True)
			temp = ListingsSerializer(user_list, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		elif display_type == 'READ':
			try:
				user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
			except:
				try:
					user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
				except:
					return Response(status=status.HTTP_404_NOT_FOUND)
				temp = ListingsSerializer(user_list_unread, many=True)
				return Response(temp.data, status=status.HTTP_200_OK)
			try:
				user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
			except:
				temp = ListingsSerializer(user_list_read, many=True)
				return Response(temp.data, status=status.HTTP_200_OK)
			user_list = user_list_read.union(user_list_unread, all=True)
			temp = ListingsSerializer(user_list, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
	
	def post(self, request, id):

		# Ensure that the publication exists
		try:
			pub_to_add = Publication.objects.get(id=id)
		except:
			return Response(status=status.HTTP_204_NO_CONTENT)
		
		# Ensure that the user does not already have the publication in their list
		if(not Listings.objects.filter(Q(ListOwner=request.user) & Q(ListPub=pub_to_add)).exists()):

			# Create and save the publication as an instance int he user's list
			new_list_item = Listings.objects.create(ListOwner=request.user, ListPub=pub_to_add, Status='UNREAD')
			new_list_item.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)
	
	def delete(self, request, id):

		# Ensure that the publication exists
		try:
			pub_to_del = Publication.objects.get(id=id)
		except:
			return Response(status=status.HTTP_204_NO_CONTENT)

		user = User.objects.get(username=request.user)
		
		# Ensure that the user has the publication in their personalized list
		if Listings.objects.filter(Q(ListOwner=user) & Q(ListPub=pub_to_del)).exists():
			pub_exists_in_list = Listings.objects.filter(Q(ListOwner=user) & Q(ListPub=pub_to_del))[0]
			pub_exists_in_list.delete()
		else:
			return Response(status=status.HTTP_404_NOT_FOUND)

		# Return the remaining objects in the list
		queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
		serializer = ListingsSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

# API View to get the user's personalized list alphabetically
class MyListAlphabetical(APIView):

    def get(self, request):

		# Ensure that the user is authenticated
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)

		# Ensure that they have a list
        try:
            queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

		# Find and return the needed list data
        temp = ListingsSerializer(queryset, many=True)
        preference = PersonalizedList.objects.get(Owner=request.user)
        preference.Display_Type = 'ALPHABETICAL'
        preference.save(update_fields=["Display_Type"])

        return Response(temp.data, status=status.HTTP_200_OK)
		
# API View to get the user's personalized list by unread first
class MyListUnread(APIView):

	def get(self, request):

		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)

		# Ensure that they have a list
		temp = PersonalizedList.objects.get(Owner=request.user)
		temp.Display_Type = 'UNREAD'
		temp.save(update_fields=["Display_Type"])

		# Find and return the needed list data

		try:
			user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
		except:
			try:
				user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
			except:
				return Response(status=status.HTTP_404_NOT_FOUND)
			temp = ListingsSerializer(user_list_read, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		try:
			user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
		except:
			temp = ListingsSerializer(user_list_unread, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		user_list = user_list_unread.union(user_list_read, all=True)
		temp = ListingsSerializer(user_list, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)

# API View to get the user's personalized list by read first
class MyListRead(APIView):

	def get(self, request):

		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)

		temp = PersonalizedList.objects.get(Owner=request.user)
		temp.Display_Type = 'READ'
		temp.save(update_fields=["Display_Type"])

		# Find and return the needed list data

		try:
			user_list_read = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='READ')).order_by('ListPub__Title')
		except:
			try:
				user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
			except:
				return Response(status=status.HTTP_404_NOT_FOUND)
			temp = ListingsSerializer(user_list_unread, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		try:
			user_list_unread = Listings.objects.filter(Q(ListOwner=request.user) & Q(Status='UNREAD')).order_by('ListPub__Title')
		except:
			temp = ListingsSerializer(user_list_read, many=True)
			return Response(temp.data, status=status.HTTP_200_OK)
		user_list = user_list_read.union(user_list_unread, all=True)
		temp = ListingsSerializer(user_list, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)

# API View to return list items to an external user by alphabetical order
class MyListGuest(APIView):

	def get(self, request, id):

		# Ensure that a legitimate user is accessing the publication
		try:
			user = User.objects.get(id=id)
		except:
			return Response({'Message' : 'The user does not exist!'},status=status.HTTP_404_NOT_FOUND)

		# Find and return the list items
		try:
			queryset = Listings.objects.filter(ListOwner=user).order_by('ListPub__Title')
		except:
			return Response({'Message' : 'Empty!'}, status=status.HTTP_204_NO_CONTENT)
		temp = ListingsSerializer(queryset, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)

# API View to get a user's profile
class UserAccountView(APIView):

	def get(self, request):

		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'You must login to continue!'}, status=status.HTTP_404_NOT_FOUND)
		
		# Ensure that the user has the authoirity to perform the task
		try:
			user = Profile.objects.get(user=request.user)
		except:
			return Response({'Message' : 'You must login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)
		
		# Return user profile data
		temp = ProfileSerializer(user)
		return Response(temp.data, status=status.HTTP_200_OK)

# API View to get a user's profile for guest views
class UserGuestView(APIView):
    
	def get(self, request, id):

		# Ensure that the user has an account	
		try:
			user = Profile.objects.get(user__id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		# Return user profile data for all

		temp = ProfileSerializer(user)
		return Response(temp.data, status=status.HTTP_200_OK)

# API View to handle reports related functionality
class Reports(APIView):

	serializer_class = ReportSerializer
	def get(self, request):
		
		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		# Ensure that the user has authority for this task
		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		# Depending on if the user is an admin or not, generate a different Report view
		if user == 'UNVERIFIED' or user == 'VERIFIED':
			return self.NormalReport(request)
		else:
			return self.AdminReport()

    
	def post(self, request):

		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		user = User.objects.get(username=request.user)
		parsed = request.data["data"]

		# If the report is empty, return an error
		if(parsed["Body"] == ""):
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		# File the report
		try:
			# Create an instance of a filed report for a post
			if(parsed["Type"] == 'Post'):
				post_to_report = Post.objects.get(id=parsed["id"])
				temp = Report.objects.create(Creator=user, Reason=parsed["Reason"], Description=parsed["Body"], Status='UNRESOLVED', Relevant_Post=post_to_report, Relevant_Thread=post_to_report.ParentThread)
				temp.save()
			# Create an instance of a filed report for a publication
			else:
				pub_to_report = Publication.objects.get(id=parsed["id"])
				temp = Report.objects.create(Creator=user, Reason=parsed["Reason"], Description=parsed["Body"], Status='UNRESOLVED', Relevant_Pub=pub_to_report)
				temp.save()
            
			# Make a record of the user's activity
			user_activity = MyActivity.objects.create(Owner=user, FiledReport=temp)
			user_activity.save()

			# In the case where a post is reported, also return the remaining reported pubs
			if(parsed["Type"] == 'Post'):
				thread = Thread.objects.get(id=post_to_report.ParentThread.id)
				serializer = ThreadSerializer(thread)
				return Response(serializer.data, status=status.HTTP_201_CREATED)

			return Response(status=status.HTTP_201_CREATED)
		except Exception as e:
			print(e)
			return Response(status=status.HTTP_400_BAD_REQUEST)

	# Function to gather the reports history of a user
	def NormalReport(self, request):

		try:
			queryset = Report.objects.filter(Creator=request.user).order_by("-Date")
		except:
			return Response(status=status.HTTP_204_NO_CONTENT)
		report_list = ReportSerializer(queryset, many=True)
		return Response(report_list.data, status=status.HTTP_200_OK)
    
	# Function to gather the reports history by all users
	def AdminReport(self):

		try:
			queryset = Report.objects.all().order_by("-Date")
		except:
			return Response(status=status.HTTP_204_NO_CONTENT)
		report_list = ReportSerializer(queryset, many=True)
		return Response(report_list.data, status=status.HTTP_200_OK)

# API View for m0d apps
class ModeratorApps(APIView):

	serializer_class = ModeratorSerializer

	# Function to gather the mod apps history of a user
	def NormalUser(self, request):

		try:
			queryset = ModeratorApplication.objects.filter(Creator=request.user).order_by("-Date")
		except:
			return Response({'Message' : 'Empty'}, status=status.HTTP_204_NO_CONTENT)
		mod_list = ModeratorSerializer(queryset, many=True)
		return Response(mod_list.data, status=status.HTTP_200_OK)
    
	# Function to gather the mod apps history of all users
	def AdminUser(self):

		try:
			queryset = ModeratorApplication.objects.all().order_by("-Date")
		except:
			return Response({'Message' : 'Empty'}, status=status.HTTP_204_NO_CONTENT)
		mod_list = ModeratorSerializer(queryset, many=True)
		print(mod_list.data)
		return Response(mod_list.data, status=status.HTTP_200_OK)


	def get(self, request):

		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'Please login to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
		# Depending on the ser type, call the appropriate function for gathering mod app history
		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response({'Message' : 'Please login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)
		if user == 'UNVERIFIED' or user == 'VERIFIED' or user == 'MODERATOR':
			return self.NormalUser(request)
		else:
			return self.AdminUser()
        
    
	def post(self, request):
		
		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'Please login to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
		user = User.objects.get(username=request.user)
		parsed = request.data["data"]

		# In case of missing mod app fields, reject the app
		if(parsed["Why"] == "" or parsed["Body"] == ""):
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		try:
			# Create a new mod app object
			temp = ModeratorApplication.objects.create(Creator=user, Name=parsed["Name"], Location=parsed["Location"] ,Reason=parsed["Why"], Description=parsed["Body"], Status='PENDING')
			temp.save()

			# Create a record of the user's actvitiy
			user_activity = MyActivity.objects.create(Owner=user, ModApp=temp)
			user_activity.save()
			return Response(status=status.HTTP_201_CREATED)
		except Exception as e:
			return Response({'Message' : 'There was an error!'}, status=status.HTTP_400_BAD_REQUEST)
        

# API View to get the history of a user's activity
class UserActivityHistory(APIView):

	def get(self, request):

		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		user = User.objects.get(username=request.user)

		# Find all activities done by the user and return them
		try:
			queryset = MyActivity.objects.filter(Owner=user).order_by('-id')
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		activity_list = ActivitySerializer(queryset, many=True)
		return Response(activity_list.data, status=status.HTTP_200_OK)

# API View to get the history of a user's publication related activites
class MyPubActivity(APIView):

    def get(self, request):

		# Ensure the user is authenticated
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
		# Find all activities done by the user and return them
        try:
            queryset = Contribution.objects.filter(Username=request.user).order_by('-Date')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        contrib_list = ContributionSerializer(queryset, many=True)
        return Response(contrib_list.data, status=status.HTTP_200_OK)

# API View for handling moderator application decisions
class ModeratorDecision(APIView):

	def get(self, request, id):

		# Ensure the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		# Ensure the user has the authorization to perform this task
		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		if user == 'ADMIN':

			# Return all moderator applications
			try:
				mod_app = ModeratorApplication.objects.get(id=id)
			except:
				return Response(status=status.HTTP_400_BAD_REQUEST)
			
			serializer = ModeratorSerializer(mod_app)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)

	def post(self, request, id, act):
        
		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)

		# Ensure that the application record exists
		try:
			app_to_check = ModeratorApplication.objects.get(id=id)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		# Ensure that the user is authorized to perform this task
		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
        
		if user == 'ADMIN':

			# If the app must be accepted
			if act == 'accept':

				# Find the user that applied
				try:
					new_mod = Profile.objects.get(user__id=app_to_check.Creator.id)
				except:
					return Response(status=status.HTTP_404_NOT_FOUND)
                
				# Update their statis as a new moderator
				new_mod.User_Type = 'MODERATOR'
				new_mod.save(update_fields=["User_Type"])

				# Prepare the message for the email response
				try:
					user = User.objects.get(id=app_to_check.Creator.id)
				except:
					return Response(status=status.HTTP_404_NOT_FOUND)

				message = "Congratulations " + user.username + "! You have been appointed as a moderator for BookBound!"
				app_to_check.Status = "ACCEPTED"
			
			# If the app must be rejected
			elif act == 'reject':

				# Find the user that applied
				try:
					user = User.objects.get(id=app_to_check.Creator.id)
				except:
					return Response(status=status.HTTP_404_NOT_FOUND)
				
				# Prepare the message for the email response
				message = "Hello " + user.username + "! We regret to inform you that your moderator application for BookBound has been rejected."
				app_to_check.Status = "REJECTED"
			
			#Send the email
			subject = 'BookBound Moderator Application Decision'
			send_mail(subject, message, EMAIL_HOST_USER, [user.email], fail_silently = True)
			app_to_check.save(update_fields=["Status"])
			return Response(status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)


#API View to edit a user's profile
class EditProfileView(APIView):
    
    def put(self, request):

		# Ensure that the user is authenticated
        if(not request.user.is_authenticated):
            return Response({'Message' : 'You must login to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            user = Profile.objects.get(user=request.user)
        except:
            return Response({'Message' : 'You must login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            parsed = request.data
            edited_profile = {}

			# Find all freshly edited parts of the request
            for key in parsed:
                if parsed[key] != 'null':
                    edited_profile[key] = parsed[key]
            
			# Update the elevant fields in the instance
            serializer = ProfileSerializer(user, data=edited_profile, partial=True)
        except:
            return Response({'Message' : 'Invalid data input!'}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'Message' : 'Your profile was successfuly updated!'}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'Message' : 'Invalid data input!'}, status=status.HTTP_400_BAD_REQUEST)

# API View to resolve pending reports
class ReportResolution(APIView):

	def get(self, request, id):

		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'You must login to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
		try:
			user = Profile.objects.get(user=request.user)
		except:
			return Response({'Message' : 'You must login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)
		
		# Ensure the user is authorized to perfom this task
		if(user.User_Type != 'ADMIN' and user.User_Type != 'MODERATOR'):
			return Response({'Message' : 'You are not authorized to perform this action!'}, status=status.HTTP_404_NOT_FOUND)

		# Find and return the particular report to be considered
		try:
			report_to_resolve = Report.objects.get(id=id)
		except:
			return Response({'Message' : 'The report does not exist!'}, status=status.HTTP_404_NOT_FOUND)

		serializer = ReportSerializer(report_to_resolve)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def post(self, request, id):
		
		# Ensure that the user is authenticated
		if(not request.user.is_authenticated):
			return Response({'Message' : 'You must login to continue!'}, status=status.HTTP_404_NOT_FOUND)
        
		try:
			user = Profile.objects.get(user=request.user)
		except:
			return Response({'Message' : 'You must login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)
		
		# Ensure the user is authorized to perfom this task
		if(user.User_Type != 'ADMIN' and user.User_Type != 'MODERATOR'):
			return Response({'Message' : 'You are not authorized to perform this action!'}, status=status.HTTP_404_NOT_FOUND)

		# Find and return the resolve report to be considered
		try:
			report_to_resolve = Report.objects.get(id=id)
		except:
			return Response({'Message' : 'The report does not exist!'}, status=status.HTTP_404_NOT_FOUND)
		
		if(report_to_resolve.Status == 'UNRESOLVED'):
			report_to_resolve.Status = 'RESOLVED'
			report_to_resolve.save(update_fields=["Status"])
		
		return Response({'Message' : 'Success!'}, status=status.HTTP_200_OK)

# API View to change the status of a publication in the user's personalized list
class ChangeListStatus(APIView):

	def post(self, request, id, state):

		# Ensure the publication exists
		try:
			pub_to_edit = Publication.objects.get(id=id)
		except:
			return Response(status=status.HTTP_204_NO_CONTENT)

		user = User.objects.get(username=request.user)
		
		# Ensure that it is present in the user's personalized list
		if Listings.objects.filter(Q(ListOwner=user) & Q(ListPub=pub_to_edit)).exists():
			pub_exists_in_list = Listings.objects.filter(Q(ListOwner=user) & Q(ListPub=pub_to_edit))[0]

			if(pub_exists_in_list.Status == state):
				return Response(status=status.HTTP_404_NOT_FOUND)

			# Update status	
			if(pub_exists_in_list.Status == "UNREAD"):
				pub_exists_in_list.Status = state
			else:
				pub_exists_in_list.Status = state
			pub_exists_in_list.save(update_fields=["Status"])
		else:
			return Response(status=status.HTTP_404_NOT_FOUND)

		# Find and return remaining publications in the list
		queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
		serializer = ListingsSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

