from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .forms import *
import random
from django.contrib.auth.models import User
from register.models import Profile
from django.db.models import Q
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Publication, Contribution, RelatedPublication, Copyright
from .serializers import PublicationSerializer, CopyrightSerializer
from rest_framework import filters, permissions
from itertools import chain
from mysite.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from rest_framework.parsers import MultiPartParser, FormParser
from django.template.loader import render_to_string
from .filters import *


# Function to generate publications for home page
class Index(generics.ListCreateAPIView):
	
	# Function to find publications for home page
	def FindSet():

		# Find the most recently added best edition
		try:
			Best_Edition_Daily = Publication.objects.filter(Best_Edition=True).order_by('-contribution__Date')
		except:
			return Response({'Message' : 'There was an error loading this page.'}, status=status.HTTP_400_BAD_REQUEST)

		collected = []
		for k in Best_Edition_Daily:
			collected.append(k.id)
		
		# Find recent additions in descending order of date of addition ensuring no duplicates
		try:
			recents = Publication.objects.filter(~Q(id=collected[0])).order_by('-contribution__Date')[:7]
		except:
			return Response({'Message' : 'There was an error loading this page.'}, status=status.HTTP_400_BAD_REQUEST)

		total = Publication.objects.count() - 1
		j = 0
		
		for k in recents:
			collected.append(k.id)
		
		# Find the publication IDs for 5 random publications as recommendations
		new = []
		while j < 7:
			temp = random.randint(1, total)
			if temp not in collected and temp not in new:
				new.append(temp)
				j = j + 1

		# Find the relevant recommendations as per the IDs generated above
		temp = Best_Edition_Daily.union(recents, all=True)

		for i in new:
			try:
				recs = Publication.objects.filter(id=i)
				temp = temp.union(recs, all=True)
			except:
				continue

		return temp
	
	queryset = FindSet()
	print(queryset.count())
	serializer_class = PublicationSerializer

# Return all publications for the grid-like catalogue view
class CatalogueColumnar(APIView):

	def get(self, request):

		queryset = Publication.objects.all().order_by('Title')
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

# Return all publications for the column-like catalogue view
class CatalogueList(APIView):

	def get(self, request):

		queryset = Publication.objects.all().order_by('Title')
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

# Return all relevant publications as per search query and applied filters
class Search(generics.ListCreateAPIView):
    
	filter_backends = (DynamicSearchFilter,)
	queryset = Publication.objects.all()
	serializer_class = PublicationSerializer
    

# API to return the data relevant to a particular publication
class ViewPublication(APIView):

	def get(self, response, id):

		# Ensure that publication exists
		try:
			temp = Publication.objects.filter(id=id)
		except Exception as e:
			return Response({'Message' : 'The given publication does not exist!'},status=status.HTTP_400_BAD_REQUEST)
		
		# Find the list of all related publications
		try:
			rel_obj = Publication.objects.get(id=id)
			related = Publication.objects.filter(Main__Rel_Publication=rel_obj)
			print(related)
			queryset = temp.union(related, all=True)
		except:		
			queryset = temp
		
		# Return a list of publications
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data)

# API to add a publication to the database
class AddPublication(APIView):

	# Defining a parser class to parse form data from the frontend
	parser_classes = (MultiPartParser, FormParser)
	serializer_class = PublicationSerializer

	def post(self, request):
		
		# Ensure that only a logged in user can add publications
		if request.user.is_authenticated:
			
			# Check if the user has the authorization to add a publication
			user_to_check = Profile.objects.values_list('User_Type', flat=True).get(user=request.user)
			if user_to_check == 'UNVERIFIED':
				return Response({'Message' : 'You do not have the permission to perform this task!'}, status=status.HTTP_401_UNAUTHORIZED)

			# Ensure that the description of the publication was not empty
			if(request.data["Description"] == ""):
				return Response(status=status.HTTP_400_BAD_REQUEST)
			
			serializer = PublicationSerializer(data=request.data)
			
			# Validate the input form data
			if serializer.is_valid(): 
				serializer.save()

				user = User.objects.get(username=request.user)
				main = Publication.objects.get(id=serializer.data["id"])

				# Create a record of the user's contribution to the database
				temp = Contribution.objects.create(Username=user, Publication_ID=main, Edit_Type='ADD')
				temp.save()

				# Parse the input data for the related publication fields
				try:
					related_pubs = request.data["Related"].split(',')
				except:
					related_pubs = []

				# For each related publication, create a pair of related objects
				for i in related_pubs:
					try:
						rel = Publication.objects.get(id=i)
						new_rel = RelatedPublication.objects.create(Main_Publication=main, Rel_Publication=rel)
						new_rel.save()
						second_rel = RelatedPublication.objects.create(Main_Publication=rel, Rel_Publication=main)
						second_rel.save()
					except Exception as e:
						print(e)
						pass

				return Response(serializer.data, status=status.HTTP_201_CREATED)

			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		return Response({'Message' : 'Please login to continue!'}, status=status.HTTP_401_UNAUTHORIZED)


# API to edit the data of an existing publication
class EditPublication(APIView):

	serializer_class = PublicationSerializer

	def post(self, request, id):

		# Ensure the user is logged in
		if request.user.is_authenticated:
			user_to_check = Profile.objects.values_list('User_Type', flat=True).get(user=request.user)
			
			# Ensure the user's authorization to perform this task
			if user_to_check == 'UNVERIFIED':
				return Response(status=status.HTTP_401_UNAUTHORIZED)
			
			# Ensure that the publication exists
			try:
				pub_to_edit = Publication.objects.get(id=id)
				print("found")
			except:
				return Response(status=status.HTTP_404_NOT_FOUND)
			
			# Ensure that the edited description is not empty
			if(request.data["Description"] == ""):
				return Response(status=status.HTTP_400_BAD_REQUEST)
			
			try:
				parsed = request.data
				edited_pub = {}

				# Find all the attributes from the form that are not null for updating	
				for key in parsed:
					if parsed[key] != 'null' and key != 'Related':
						edited_pub[key] = parsed[key]
                
				serializer = PublicationSerializer(pub_to_edit, data=edited_pub, partial=True)
			except:
				return Response({'Message' : 'Invalid data input!'}, status=status.HTTP_400_BAD_REQUEST)

			# Update the publication's data if its valid
			if serializer.is_valid():
				serializer.save()

			# Parse the input data for the related publication fields
			related_pubs = []
			try:
				temp = parsed["Related"].split(',')
				for i in temp:
					try:
						if(isinstance(int(i), int)):
							related_pubs.append(int(i))
					except:
						pass

			except:
				related_pubs = []
			 
			main = pub_to_edit
			# For each related publication, create a pair of related objects
			for i in related_pubs:
				rel = Publication.objects.get(id=i)
				if not RelatedPublication.objects.filter(Q(Main_Publication=main) & Q(Rel_Publication=rel)).exists():
					new_rel = RelatedPublication.objects.create(Main_Publication=main, Rel_Publication=rel)
					new_rel.save()
					second_rel = RelatedPublication.objects.create(Main_Publication=rel, Rel_Publication=main)
					second_rel.save()
			
			# Find removed related publications
			temp = RelatedPublication.objects.filter(Main_Publication=main)
			all_related_pubs = []
			for i in temp:

				if((i.Rel_Publication.id) not in related_pubs):
					all_related_pubs.append(i.Rel_Publication.id)
			
			for i in all_related_pubs:
				pub_to_delete = Publication.objects.get(id=i)
				RelatedPublication.objects.get(Q(Main_Publication=main) & Q(Rel_Publication=pub_to_delete)).delete()
				RelatedPublication.objects.get(Q(Main_Publication=pub_to_delete) & Q(Rel_Publication=main)).delete()

			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_401_UNAUTHORIZED)


# API to handle TakeDown Requests
class TakedownRequest(APIView):

	def get(self, request):

		# Generate a list of all takedown requests filed in the system
		try:
			queryset = Copyright.objects.all().order_by('-Date')
		except:
			return Response({'Message' : 'The given publication does not exist!'}, status=status.HTTP_404_NOT_FOUND)
		copy_list = CopyrightSerializer(queryset, many=True)
		return Response(copy_list.data, status=status.HTTP_200_OK)

	def post(self, request, id):

		# Ensure that the publication that is being copyrighted exists
		try:
			copyrighted_pub = Publication.objects.get(id=id)
		except:
			return Response({'Message' : 'The given publication does not exist!'},status=status.HTTP_404_NOT_FOUND)
		
		complaint = request.data["data"]

		# Ensure a reason for the copyright is given
		if(complaint["Body"] == ""):
			return Response(status=status.HTTP_400_BAD_REQUEST)

		# Generate the body of the email
		subject = "BookBound - Takedown Request" 
		message = render_to_string('takedown.html', {
			'party': complaint["Party"],
			'relationship': complaint["Relationship"],
			'name': complaint["Copyright"],
			'country': complaint["Country"],
			'email': complaint["Email"],
			'publication': complaint["Publication"],
			'body' : complaint["Body"],
		})
		plain = ''

		# Send the email to all admins
		try:
			send_mail(subject, plain , EMAIL_HOST_USER, ['talhaashar01@gmail.com', 'animerjk@gmail.com', '22100036@lums.edu.pk'], fail_silently = True, html_message=message)
		except:
			return Response({'Message' : 'There was an error processing your request!'}, status=status.HTTP_400_BAD_REQUEST)

		# Create a record of the takedown request for admins to review later
		temp = Copyright.objects.create(Copy_Pub=copyrighted_pub, Authority=complaint["Party"], Reason=complaint["Body"], Email=complaint["Email"], Relationship=complaint["Relationship"], Name=complaint["Copyright"], Country=complaint["Country"])		
		temp.save()
		return Response(status=status.HTTP_200_OK)

# API View to send a contact us Email to the site administrators
class ContactUs(APIView):

	def post(self, request):
		
		parsed = request.data["data"]

		# Ensure that the form has data in the body
		if(parsed["Body"] == ""):
			return Response(status=status.HTTP_400_BAD_REQUEST)


		# Generate the body of the email
		subject = "BookBound - " + parsed["Reason"]
		message = render_to_string('contact_us.html', {
			'user': parsed["Name"],
			'email': parsed["Email"],
			'body' : parsed["Body"],
		})
		plain = ''

		# Send the email to all admins
		try:
			send_mail(subject, plain , EMAIL_HOST_USER, ['talhaashar01@gmail.com', 'animerjk@gmail.com', '22100036@lums.edu.pk'], fail_silently = True, html_message=message)
		except:
			return Response({'Message' : 'There was an error processing your request!'}, status=status.HTTP_400_BAD_REQUEST)
		return Response(status=status.HTTP_200_OK)

# API VIew to delete a particular publication
class DeletePublication(APIView):

	def post(self, request, id):

		# Ensure that only a logged in user can delete publications
		if not request.user.is_authenticated:
			return Response(status=status.HTTP_400_BAD_REQUEST)
			
		# Check if the user has the authorization to delete a publication
		user_to_check = Profile.objects.values_list('User_Type', flat=True).get(user=request.user)
		if user_to_check == 'UNVERIFIED' or user_to_check == 'VERIFIED':
			return Response({'Message' : 'You do not have the permission to perform this task!'}, status=status.HTTP_401_UNAUTHORIZED)
		
		# Check if the publication exists in the database
		try:
			pub_to_delete = Publication.objects.get(id=id)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		
		# Deleting the publication
		pub_to_delete.delete()
		return Response(status=status.HTTP_200_OK)

