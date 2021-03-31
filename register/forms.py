from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


#Creating a sign up form for users
class RegisterForm(UserCreationForm):
	email = forms.EmailField(help_text="Enter valid email")

	#Defining the order in which form fields should be saved
	class Meta:
		model = User
		fields = ["username", "email", "password1", "password2"]


#Creating a form for the Forget Password use case
class ForgotForm(forms.Form):
	email = forms.EmailField(help_text="Enter valid email")
	