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


# View for controlling the sign up functionality
class SignUpView(generics.GenericAPIView):
	serializer_class = RegisterSerializer

	def post(self, request, *args, **kwargs):

		# Parsing and validating data from the user's POST request
		serializer = self.get_serializer(data=request.data["data"])
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		# Marking the user as inactive until they eventually use the email verification
		user.is_active = False
		user.save()

		# Creating the profile for the new user
		new_prof = Profile.objects.create(user=user)
		new_prof.save()
		
		# Creating the email for account verification
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

# View for Account Activation through email verification
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

# View for if the user invokes the forgot password functionality
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

		# Updating the user's intermediary password in the database
		Valid_Email.set_password('PureGPlay')
		Valid_Email.save(update_fields=["password"])
		return Response({"Result":"Gucci"}, status=status.HTTP_200_OK)


# View for Logging into the system
class LoginView(generics.GenericAPIView):
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):

		# Ensure user exists
		serializer = self.get_serializer(data=request.data["data"])
		print(request.data["data"])
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data
		print(user)

		try:
			temp = Profile.objects.get(user=user)
		except:
			pass
		
		# Check if the user is authorized to login
		if temp.blacklisted == True:
			return Response({"User" : "Blacklisted"})

		print("The user has been authenticated")
		login(request, user)

		return Response({"user" : UserSerializer(user, context=self.get_serializer_context()).data})

# View to logout user from the system
class LogoutView(generics.GenericAPIView):
	
	def get(self, request):
		logout(request)
		return Response({"Result":"Gucci"}, status=status.HTTP_200_OK)


class UserAPIView(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated,]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user

# View for if the user wishes to change their account's password
class ChangePassword(APIView):

	def post(self, request):

		# Authenticate user identity
		if(not request.user.is_authenticated()):
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		try:
			user = User.objects.get(username=request.user)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		parsed = request.data["data"]
		
		# Update user password
		if parsed["current_password"] == user.password:
			user.set_password(parsed["new_password"])
			user.save()
		else:
			return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
		return Response(status=status.HTTP_200_OK)

# Class for if user wishes to apply for their account's removal
class UserAccountRemoval(APIView):

	def post(self, request):
		
		# Authenticate user identity
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		
		# Mark user as having removed their account
		temp = AccountRemoval.objects.create(user=request.user)
		temp.save()

		user = User.objects.get(username=request.user)
		user.is_active = False
		user.save()
		logout(request)

# Administrator view for account removal requests
class AdminAccountRemoval(APIView):

	def get(self, request):

		# Authenticate if user is Admin
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)
		
		# Fetch all pending account removal requests
		queryset = AccountRemoval.objects.all().order_by('-Date')
		temp = RemovalSerializer(queryset, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)
	
	def post(self, request, id):

		# Authenticate if user is an Admin
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		# Remove the relevant user's account
		try:
			user_to_delete = User.objects.get(id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		user_to_delete.delete()
		return Response(status=status.HTTP_200_OK)

# View for handling blacklisted users
class Blacklist(APIView):

	def get(self, request):

		# Authenticate if user is authorized to view blacklist
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN' and user != 'MODERATOR':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		# Fetch all blacklisted users
		try:
			queryset = Profile.objects.filter(blacklisted=True)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		blaclisted_users = BlacklistSerializer(queryset, many=True)
		return Response(blaclisted_users.data, status=status.HTTP_200_OK)
	
	def post(self, request, act, id):

		# Authenticate if user is authorized to blacklist others
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN':
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		# Find the user of interest
		try:
			queryset = Profile.objects.filter(blacklisted=True)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		
		try:
			user_to_blacklist = Profile.objects.get(user__id=id)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		# Add or delete from blacklist
		if act == "add":
			user_to_blacklist.blacklisted = True
		elif act == "delete":
			user_to_blacklist.blacklisted = False
		user_to_blacklist.save()
		return Response(status=status.HTTP_200_OK)