from django.shortcuts import render, redirect
from .forms import RegisterForm, ForgotForm
from django.urls import reverse_lazy
from django.views.generic import View, UpdateView
from django.contrib.auth.models import User

from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from .tokens import account_activation_token

from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode

from mysite.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

from .models import Profile, AccountRemoval
from .serializers import UserSerializer, ForgotSerializer, RegisterSerializer, LoginSerializer, RemovalSerializer, BlacklistSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from knox.models import AuthToken

from django.core.validators import validate_email
from accounts.models import PersonalizedList 

value = "foo.bar@baz.qux"

# Create your views here.

# View for controlling the sign up functionality

class SignUpView(generics.GenericAPIView):
	serializer_class = RegisterSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data["data"])
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		user.is_active = False
		user.save()

		new_prof = Profile.objects.create(user=user)
		new_prof.save()
		#print(get_current_site(request))
		current_site = get_current_site(request)
		subject = 'Activate Your BookBound Account'
		message = render_to_string('account_activation_email.html', {
			'user': user,
			'domain': current_site.domain,
			'uid': urlsafe_base64_encode(force_bytes(user.pk)),
			'token': account_activation_token.make_token(user),
		})
		user.email_user(subject, message)

		return Response({"Result" : "Please Confirm your email to complete registration."}, status=status.HTTP_201_CREATED)

		

# class SignUpView(APIView):
	
# 	serializer_class = UserSerializer

# 	# Creating the user object and sending an email to the user for verification
# 	def post(self, request, *args, **kwargs):
# 		serializer = UserSerializer(data=request.data)
# 		if serializer.is_valid(): 
# 			serializer.save()
# 			user = User.objects.get(username=serializer.data["username"])
# 			user.is_active = False
# 			user.save()

# 			new_prof = Profile.objects.create(user=user)
# 			new_prof.save()
# 			print(get_current_site(request))
# 			current_site = get_current_site(request)
# 			subject = 'Activate Your BookBound Account'
# 			message = render_to_string('account_activation_email.html', {
# 				'user': user,
# 				'domain': current_site.domain,
# 				'uid': urlsafe_base64_encode(force_bytes(user.pk)),
# 				'token': account_activation_token.make_token(user),
# 			})
# 			user.email_user(subject, message)
# 			return Response({"Result" : "Please Confirm your email to complete registration."}, status=status.HTTP_201_CREATED)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivateAccount(APIView):

	def get(self, request, uidb64, token, *args, **kwargs):
		
		# Check if the user exists
		try:
			uid = force_text(urlsafe_base64_decode(uidb64))
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			return Response(status=status.HTTP_404_NOT_FOUND)

		# Authenticate the token from the email and mark user as active
		if user is not None and account_activation_token.check_token(user, token):
			user.is_active = True
			user.save(update_fields=["is_active"])
			try:
				prof = Profile.objects.get(user_id=uid)
				prof.email_confirmed = True
				prof.save(update_fields=["email_confirmed"])

				new_list = PersonalizedList.objects.create(Owner=user, Display_Type = 'ALPHABETICAL')
				new_list.save()
			except:
				pass
			login(request, user)
			return Response({"token" : AuthToken.objects.create(user)[1]})
		else:
			return Response({"Error" : "The confirmation link was invalid, possibly because it has already been used."}, status=status.HTTP_400_BAD_REQUEST)

class ForgotPassword(APIView):

	serializer_class = ForgotSerializer
	def post(self, request):
		parsed = request.data["data"]
		try:
			validate_email(parsed["email"])
		except:
			return Response({"Error" : "Incorrect email"}, status=status.HTTP_400_BAD_REQUEST)

		# Fetching the record from the database against the input email
		try:
			print(parsed["email"])
			Valid_Email = User.objects.filter(email=parsed["email"])[0]
		except:
			return Response({"Error" : "Non-existent email"}, status=status.HTTP_400_BAD_REQUEST)
	
		# Sending the password reset email
		current_site = get_current_site(request)
		subject = 'Password Reset'
		message = "Here are your details:\nUsername: " + Valid_Email.username + "\nPassword: PureGPlay"
		send_mail(subject, message, EMAIL_HOST_USER, [parsed["email"]], fail_silently = False)

		#Add here logic to change in DB
		Valid_Email.set_password('PureGPlay')
		Valid_Email.save(update_fields=["password"])
		return Response({"Result":"Gucci"}, status=status.HTTP_200_OK)

class LoginView(generics.GenericAPIView):
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data

		try:
			temp = Profile.objects.get(user=user)
		except:
			pass
		
		if temp.blacklisted == True:
			return Response({"User" : "Blacklisted"})

		login(request, user)

		return Response({"user" : UserSerializer(user, context=self.get_serializer_context()).data})

class LogoutView(generics.GenericAPIView):
	
	def get(self, request):
		logout(request)
		return Response({"Result":"Gucci"}, status=status.HTTP_200_OK)


class UserAPIView(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated,]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

class ChangePassword(APIView):

	def post(self, request):

		if(not request.user.is_authenticated()):
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		try:
			user = User.objects.get(username=request.user)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		parsed = request.data["data"]
		
		if parsed["current_password"] == user.password:
			user.set_password(parsed["new_password"])
			user.save()
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
		return Response(status=status.HTTP_200_OK)

class UserAccountRemoval(APIView):

	def post(self, request):
		
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		
		temp = AccountRemoval.objects.create(user=request.user)
		temp.save()

		user = User.objects.get(username=request.user)
		user.is_active = False
		user.save()
		logout(request)

class AdminAccountRemoval(APIView):

	def get(self, request):

		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		
		queryset = AccountRemoval.objects.all().order_by('-Date')
		temp = RemovalSerializer(queryset, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)
	
	def post(self, request, id):

		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user_to_delete = User.objects.get(id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		user_to_delete.delete()
		return Response(status=status.HTTP_200_OK)

class Blacklist(APIView):

	def get(self, request):
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			queryset = Profile.objects.filter(blacklisted=True)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		blaclisted_users = BlacklistSerializer(queryset, many=True)
		return Response(blaclisted_users.data, status=status.HTTP_200_OK)
	
	def post(self, request, act, id):

		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			queryset = Profile.objects.filter(blacklisted=True)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		
		try:
			user_to_blacklist = Profile.objects.get(user__id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		if act == "add":
			user_to_blacklist.blacklisted = True
		elif act == "delete":
			user_to_blacklist.blacklisted = False
		user_to_blacklist.save()
		return Response(status=status.HTTP_200_OK)


		
