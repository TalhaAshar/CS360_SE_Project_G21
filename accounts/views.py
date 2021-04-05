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
from forum.models import Post
from .models import PersonalizedList, Listings, Report, ModeratorApplication
from .serializers import ListingsSerializer, ProfileSerializer, ReportSerializer, ModeratorSerializer
from main.serializers import ContributionSerializer, PublicationSerializer
from mysite.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
import random

# Create your views here.
class Recommendations(APIView):

    def get(self, request):
        
        try:
            queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        collected = []
        for k in queryset:
            collected.append(k.id)
            
        total = Publication.objects.count() - 1
        j = 0

        recs = []
        while j < 5:
            temp = random.randint(1, total)
            if temp not in collected and temp not in recs:
                recs.append(temp)
                j = j + 1
        
        recs = Publication.objects.filter(Q(id=recs[0]) | Q(id=recs[1]) | Q(id=recs[2]) | Q(id=recs[3]) | Q(id=recs[4]))
        
        temp = PublicationSerializer(recs, many=True)
        return Response(temp.data, status=status.HTTP_200_OK)


class MyListDefault(APIView):

    def get(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            display_type = PersonalizedList.objects.get(Owner=request.user).Display_Type
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print("ye", request.user)
        if display_type == 'ALPHABETICAL':

            try:
                queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)

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

        try:
            pub_to_add = Publication.objects.get(id=id)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
		
        try:
            pub_exists_in_list = Listings.objects.filter(Q(ListOwner=request.user) & Q(ListPub=pub_to_add))
        except:
            new_list_item = Listings.objects.create(ListOwner=request.user, ListPub=pub_to_add, Status='UNREAD')
            new_list_item.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_226_IM_USED)
	
    def delete(self, request, id):

        try:
            pub_to_del = Publication.objects.get(id=id)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
		
        try:
            pub_exists_in_list = Listings.objects.filter(Q(ListOwner=request.user) & Q(ListPub=pub_to_del))[0]
            pub_exists_in_list.delete()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK)

class MyListAlphabetical(APIView):

	def get(self, request):
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
		try:
			queryset = Listings.objects.filter(ListOwner=request.user).order_by('ListPub__Title')
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		temp = ListingsSerializer(queryset, many=True)
		preference = PersonalizedList.objects.get(Owner=request.user)
		preference.Display_Type = 'ALPHABETICAL'
		preference.save(update_fields=["Display_Type"])
		return Response(temp.data, status=status.HTTP_200_OK)
		

class MyListUnread(APIView):

	def get(self, request):
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)

		temp = PersonalizedList.objects.get(Owner=request.user)
		temp.Display_Type = 'UNREAD'
		temp.save(update_fields=["Display_Type"])

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

class MyListRead(APIView):

	def get(self, request):
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)

		temp = PersonalizedList.objects.get(Owner=request.user)
		temp.Display_Type = 'READ'
		temp.save(update_fields=["Display_Type"])

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

class MyListGuest(APIView):

	def get(self, request, id):

		try:
			user = User.objects.get(id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		try:
			queryset = Listings.objects.filter(ListOwner=user).order_by('ListPub__Title')
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		temp = ListingsSerializer(queryset, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)

class UserAccountView(APIView):

	def get(self, request):

		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		try:
			user = Profile.objects.get(user=request.user)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		temp = ProfileSerializer(user)
		return Response(temp.data, status=status.HTTP_200_OK)


class UserGuestView(APIView):
    def get(self, request, id):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
		
        try:
            user = Profile.objects.get(user__id=id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        temp = ProfileSerializer(user)
        return Response(temp.data, status=status.HTTP_200_OK)


class Reports(APIView):

    serializer_class = ReportSerializer
    def get(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            user = Profile.objects.get(user=request.user).User_Type
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user == 'UNVERIFIED' or user == 'VERIFIED':
            return self.NormalReport(request)
        else:
            return self.AdminReport()
        
    
    def post(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(username=request.user)
        parsed = request.data
        try:
            if(parsed["Type"] == 'Post'):
                post_to_report = Post.objects.get(id=parsed["id"])
                Report.objects.create(Creator=user, Reason=parsed["Reason"], Description=parsed["Body"], Status='UNRESOLVED', Relevant_Post=post_to_report)
            else:
                pub_to_report = Publication.objects.get(id=parsed["id"])
                Report.objects.create(Creator=user, Reason=parsed["Reason"], Description=parsed["Body"], Status='UNRESOLVED', Relevant_Pub=pub_to_report)
            return Response(status=status.HTTP_201_CREATED)
        except:
            print(request.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def NormalReport(self, request):

        try:
            queryset = Report.objects.filter(Creator=request.user).order_by("-Date")
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        report_list = ReportSerializer(queryset, many=True)
        return Response(report_list.data, status=status.HTTP_200_OK)
    
    def AdminReport(self):

        try:
            queryset = Report.objects.all().order_by("-Date")
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        report_list = ReportSerializer(queryset, many=True)
        return Response(report_list.data, status=status.HTTP_200_OK)

class ModeratorApps(APIView):

    serializer_class = ModeratorSerializer
    def NormalUser(self, request):

        try:
            queryset = ModeratorApplication.objects.filter(Creator=request.user).order_by("-Date")
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        mod_list = ModeratorSerializer(queryset, many=True)
        return Response(mod_list.data, status=status.HTTP_200_OK)
    
    def AdminUser(self):

        try:
            queryset = ModeratorApplication.objects.all().order_by("-Date")
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)
        mod_list = ModeratorSerializer(queryset, many=True)
        return Response(mod_list.data, status=status.HTTP_200_OK)

    def get(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            user = Profile.objects.get(user=request.user).User_Type
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user == 'UNVERIFIED' or user == 'VERIFIED':
            return self.NormalUser(request)
        else:
            return self.AdminUser()
        
    
    def post(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(username=request.user)
        parsed = request.data["data"]
        print(parsed)
        try:
            ModeratorApplication.objects.create(Creator=user, Name=parsed["Name"], Location=parsed["Location"] ,Reason=parsed["Why"], Description=parsed["Body"], Status='PENDING')
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

#Do when forum models made
#class MyActivity(APIView)

class MyPubActivity(APIView):

    def get(self, request):
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            queryset = Contribution.objects.filter(Username=request.user).order_by('-Date')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        contrib_list = ContributionSerializer(queryset, many=True)
        return Response(contrib_list.data, status=status.HTTP_200_OK)

class ModeratorDecision(APIView):

    def post(self, request, act, id):
        
        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            user = Profile.objects.get(user=request.user).User_Type
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if user == 'ADMIN':
            if act == 'accept':
                try:
                    new_mod = Profile.objects.get(user__id=id)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                
                new_mod.User_Type = 'MODERATOR'
                new_mod.save(update_fields=["User_Type"])

                try:
                    user = User.objects.get(id=id)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)

                message = "Congratulations " + user.username + "! You have been appointed as a moderator for BookBound!"
            elif act == 'reject':
                try:
                    user = User.objects.get(id=id)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)

                message = "Hello " + user.username + "! We regret to inform you that your moderator application for BookBound has been rejected."

            subject = 'BookBound Moderator Application Decision'
            send_mail(subject, message, EMAIL_HOST_USER, [user.email], fail_silently = False)

class EditProfileView(APIView):
    
    def put(self, request):

        if(not request.user.is_authenticated):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        try:
            user = Profile.objects.get(user=request.user)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)