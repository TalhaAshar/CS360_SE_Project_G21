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
import random
import string

value = "foo.bar@baz.qux"

# Check if user is signed in
class AuthenticationCheck(APIView):

	def get(self, request):

		if request.user.is_authenticated:
			return Response({'Status' : 'Authentic'})
		else:
			return Response({'Status' : 'Unauthentic'})

# View for controlling the sign up functionality
class SignUpView(generics.GenericAPIView):
	serializer_class = RegisterSerializer

	def post(self, request, *args, **kwargs):

		# Checking for duplicate username or email
		if(User.objects.filter(email=request.data["data"]["email"]).exists()):
			return Response({'Message' : 'Email Taken!'}, status=status.HTTP_400_BAD_REQUEST)
		
		if(User.objects.filter(username=request.data["data"]["username"]).exists()):
			return Response({'Message' : 'Username Taken!'}, status=status.HTTP_400_BAD_REQUEST)

		# Parsing and validating data from the user's POST request
		serializer = self.get_serializer(data=request.data["data"])

		
		if(not serializer.is_valid()):
			return Response({'Message' : 'Invalid data input!'}, status=status.HTTP_400_BAD_REQUEST)
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
		try:
			user.email_user(subject, message)
		except:
			return Response({'Message' : 'There was an error processing your request!'}, status=status.HTTP_400_BAD_REQUEST)

		return Response({"Result" : "Please Confirm your email to complete registration."}, status=status.HTTP_201_CREATED)

# View for Account Activation through email verification
#class ActivateAccount(APIView):

def ActivateAccount(request, uidb64, token, *args, **kwargs):
		
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
		return redirect('/')
	else:
		return Response({"Error" : "The confirmation link was invalid, possibly because it has already been used."}, status=status.HTTP_400_BAD_REQUEST)

# View for if the user invokes the forgot password functionality
class ForgotPassword(APIView):

	serializer_class = ForgotSerializer
	def post(self, request):
		parsed = request.data["data"]
		
		# Fetching the record from the database against the input email
		try:
			print(parsed["email"])
			Valid_Email = User.objects.filter(email=parsed["email"])[0]
		except:
			return Response({"Error" : "Non-existent email"}, status=status.HTTP_400_BAD_REQUEST)

		#generating new 10-digit random password
		new_password = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))

		# Sending the password reset email
		current_site = get_current_site(request)
		subject = 'Password Reset'
		message = "Here are your details:\nUsername: " + Valid_Email.username + "\nPassword: " + new_password
		send_mail(subject, message, EMAIL_HOST_USER, [parsed["email"]], fail_silently = False)

		# Updating the user's intermediary password in the database
		Valid_Email.set_password(new_password)
		Valid_Email.save(update_fields=["password"])
		return Response({"Result":"Gucci"}, status=status.HTTP_200_OK)


# View for Logging into the system
class LoginView(generics.GenericAPIView):
	serializer_class = LoginSerializer

	def post(self, request, *args, **kwargs):

		# Ensure user exists
		serializer = self.get_serializer(data=request.data["data"])
		print(request.data["data"])
		
		if(not serializer.is_valid()):
			return Response({'Message' : 'Your credentials are invalid!'}, status=status.HTTP_400_BAD_REQUEST)
		
		user = serializer.validated_data
		print(user)

		try:
			temp = Profile.objects.get(user=user)
		except:
			return Response({'Message' : 'Please signup!'}, status=status.HTTP_401_UNAUTHORIZED)
		
		# Check if the user is authorized to login
		if temp.blacklisted == True:
			return Response({"Message" : "Blacklisted"}, status=status.HTTP_403_FORBIDDEN)

		print("The user has been authenticated")
		login(request, user)

		return Response({"user" : UserSerializer(user, context=self.get_serializer_context()).data}, status=status.HTTP_200_OK)

# View to logout user from the system
class LogoutView(generics.GenericAPIView):

	serializer_class = UserSerializer
	
	def post(self, request):
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
		if(not request.user.is_authenticated):
			return Response({'Message' : 'You must login to continue!'} ,status=status.HTTP_404_NOT_FOUND)
		
		try:
			user = User.objects.get(username=request.user)
		except:
			return Response({'Message' : 'You must login or signup to continue!'}, status=status.HTTP_404_NOT_FOUND)

		parsed = request.data["data"]
		print(parsed)
		# Update user password
		if user.check_password(parsed["currentpassword"]):
			user.set_password(parsed["newpassword"])
			user.save()
		else:
			return Response({'Message' : 'Invalid data entry!'} , status=status.HTTP_406_NOT_ACCEPTABLE)
		return Response({'Message' : 'Your password has been successfully updated!'} , status=status.HTTP_200_OK)

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
		return Response(status=status.HTTP_200_OK)

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

		# Fetch all pending account removal requests
		queryset = AccountRemoval.objects.all().order_by('-Date')
		temp = RemovalSerializer(queryset, many=True)
		return Response(temp.data, status=status.HTTP_200_OK)

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
		
		blacklisted_users = BlacklistSerializer(queryset, many=True)
		return Response(blacklisted_users.data, status=status.HTTP_200_OK)
	
	def post(self, request, act, id):

		# Authenticate if user is authorized to blacklist others
		if(not request.user.is_authenticated):
			return Response(status=status.HTTP_401_UNAUTHORIZED)

		try:
			user = Profile.objects.get(user=request.user).User_Type
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)

		if user != 'ADMIN' and user != 'MODERATOR':
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
		user_to_blacklist.save(update_fields=["blacklisted"])

		# Fetch all blacklisted users
		try:
			queryset = Profile.objects.filter(blacklisted=True)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)
		
		if(act == "delete"):
			blacklisted_users = BlacklistSerializer(queryset, many=True)
			return Response(blacklisted_users.data, status=status.HTTP_200_OK)
		else:
			temp = BlacklistSerializer(user_to_blacklist)
			return Response(temp.data, status=status.HTTP_200_OK)