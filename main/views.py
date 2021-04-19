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


# Create your views here.

class Index(generics.ListCreateAPIView):
	
	def FindSet():
		try:
			#Best_Edition_Daily = Contribution.objects.select_related.filter(Publication_ID__Best_Edition=True).order_by('-Date')[:1]
			Best_Edition_Daily = Publication.objects.filter(Best_Edition=True).order_by('-contribution__Date')
			#Best_Edition_Daily = Publication.objects.filter(id=35)
		except:
			return Response({'Message' : 'There was an error loading this page.'}, status=status.HTTP_400_BAD_REQUEST)

		collected = []
		for k in Best_Edition_Daily:
			collected.append(k.id)
		
		try:
			recents = Publication.objects.filter(~Q(id=collected[0])).order_by('-contribution__Date')[:5]
		except:
			return Response({'Message' : 'There was an error loading this page.'}, status=status.HTTP_400_BAD_REQUEST)

		total = Publication.objects.count() - 1
		j = 0
		
		for k in recents:
			collected.append(k.id)
		
		new = []
		while j < 5:
			temp = random.randint(1, total)
			if temp not in collected and temp not in new:
				new.append(temp)
				j = j + 1

		#recs = Publication.objects.all()[limit:limit+5]
		temp = Best_Edition_Daily.union(recents, all=True)
		print(temp)
		for i in new:
			try:
				recs = Publication.objects.filter(id=i)
				temp = temp.union(recs, all=True)
			except:
				continue
	
		#print(Best_Edition_Daily)
		#print(temp)
		#temp = 'new'
		return temp
	
	queryset = FindSet()
	print("negrito")
	serializer_class = PublicationSerializer

class CatalogueColumnar(APIView):

	def get(self, request):

		queryset = Publication.objects.all().order_by('Title')
		print(queryset)
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

class CatalogueList(APIView):

	def get(self, request):

		queryset = Publication.objects.all().order_by('Title')
		print(queryset)
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

class Search(generics.ListCreateAPIView):
    
	filter_backends = (DynamicSearchFilter,)
	queryset = Publication.objects.all()
	serializer_class = PublicationSerializer
    

class ViewPublication(APIView):

	def get(self, response, id):
		try:
			temp = Publication.objects.filter(id=id)
		except Exception as e:
			return Response({'Message' : 'The given publication does not exist!'},status=status.HTTP_400_BAD_REQUEST)
		
		try:
			rel_obj = Publication.objects.get(id=id)
			related = Publication.objects.filter(Main__Rel_Publication=rel_obj)
			print(related)
			queryset = temp.union(related, all=True)
		except:		
			queryset = temp
		
		serializer = PublicationSerializer(queryset, many=True)
		return Response(serializer.data)

class AddPublication(APIView):

	parser_classes = (MultiPartParser, FormParser)
	serializer_class = PublicationSerializer

	def post(self, request):
		print(request.data)
		if request.user.is_authenticated:
			print("AUTHENTIC")
			user_to_check = Profile.objects.values_list('User_Type', flat=True).get(user=request.user)
			if user_to_check == 'UNVERIFIED':
				return Response({'Message' : 'You do not have the permission to perform this task!'}, status=status.HTTP_401_UNAUTHORIZED)

			serializer = PublicationSerializer(data=request.data)
			print(request.data)
			if serializer.is_valid(): 
				serializer.save()
				user = User.objects.get(username=request.user)
				main = Publication.objects.get(id=serializer.data["id"])
				temp = Contribution.objects.create(Username=user, Publication_ID=main, Edit_Type='ADD')
				temp.save()
				try:
					related_pubs = request.data["Related"].split(',')
				except:
					related_pubs = []

				for i in related_pubs:
					try:
						rel = Publication.objects.get(id=int(i))
						new_rel = RelatedPublication.create(Main=main, Rel=rel)
						new_rel.save()
						second_rel = RelatedPublication.create(Main=rel, Rel=main)
						second_rel.save()
					except:
						pass
				return Response(status=status.HTTP_201_CREATED)
			print(serializer.errors)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		print("UNAUTHENTIC")
		return Response({'Message' : 'Please login to continue!'}, status=status.HTTP_401_UNAUTHORIZED)

class EditPublication(APIView):

	serializer_class = PublicationSerializer

	def post(self, request, id):
		if request.user.is_authenticated:
			user_to_check = Profile.objects.values_list('User_Type', flat=True).get(user=request.user)
			
			if user_to_check == 'UNVERIFIED':
				return Response(status=status.HTTP_401_UNAUTHORIZED)
			
			try:
				pub_to_edit = Publication.objects.get(id=id)
				print("found")
			except:
				return Response(status=status.HTTP_404_NOT_FOUND)
			
			try:
				parsed = request.data
				edited_pub = {}
				
				for key in parsed:
					if parsed[key] != 'null' and key != 'Related':
						edited_pub[key] = parsed[key]
                
				serializer = PublicationSerializer(data=edited_pub, partial=True)
			except:
				return Response({'Message' : 'Invalid data input!'}, status=status.HTTP_400_BAD_REQUEST)

			if serializer.is_valid():
				serializer.save()
				
			try:
				related_pubs = parse["Related"].split(',')
			except:
				related_pubs = []

			main = pub_to_edit
			for i in related_pubs:
				rel = Publication.objects.get(id=int(i))
				if not RelatedPublication.objects.filter(Q(Main=main) & Q(Rel=rel)).exists():
					new_rel = RelatedPublication.create(Main=main, Rel=rel)
					new_rel.save()
					second_rel = RelatedPublication.create(Main=rel, Rel=main)
					second_rel.save()

			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_401_UNAUTHORIZED)

class TakedownRequest(APIView):

	def get(self, request):

		try:
			queryset = Copyright.objects.all().order_by('-Date')
		except:
			return Response({'Message' : 'The given publication does not exist!'}, status=status.HTTP_404_NOT_FOUND)
		copy_list = CopyrightSerializer(queryset, many=True)
		return Response(copy_list.data, status=status.HTTP_200_OK)

	def post(self, request, id):

		try:
			copyrighted_pub = Publication.objects.get(id=id)
		except:
			return Response({'Message' : 'The given publication does not exist!'},status=status.HTTP_404_NOT_FOUND)
		
		complaint = request.data["data"]
		temp = Copyright.objects.create(Copy_Pub=copyrighted_pub, Authority=complaint["Party"], Reason=complaint["Body"], Email=complaint["Email"], Relationship=complaint["Relationship"], Name=complaint["Copyright"], Country=complaint["Country"])		
		temp.save()
		return Response(status=status.HTTP_200_OK)

class ContactUs(APIView):

	def post(self, request):
		
		parsed = request.data["data"]
		subject = "BookBound - " + parsed["Reason"]
		message = render_to_string('contact_us.html', {
			'user': parsed["Name"],
			'email': parsed["Email"],
			'body' : parsed["Body"],
		})
		plain = ''
		try:
			send_mail(subject, plain , EMAIL_HOST_USER, ['talhaashar01@gmail.com', 'animerjk@gmail.com', '22100036@lums.edu.pk'], fail_silently = True, html_message=message)
		except:
			return Response({'Message' : 'There was an error processing your request!'}, status=status.HTTP_400_BAD_REQUEST)
		return Response(status=status.HTTP_200_OK)