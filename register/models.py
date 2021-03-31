from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

# Model to hold personal information about registered users
class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	email_confirmed = models.BooleanField(default=False)
	profession = models.CharField(max_length=150, blank=True, null=True)
	company = models.CharField(max_length=150, blank=True, null=True)
	education = models.CharField(max_length=150, blank=True, null=True)
	institution = models.CharField(max_length=150, blank=True, null=True)
	location = models.CharField(max_length=150, blank=True, null=True)
	age = models.IntegerField(blank=True, null=True)
	biography = models.CharField(max_length=2000, blank=True, null=True)
	blacklisted = models.BooleanField(default=False)
	UserChoices = models.TextChoices('UserType', 'ADMIN MODERATOR VERIFIED UNVERIFIED')
	User_Type = models.CharField(choices=UserChoices.choices, max_length=15, default="UNVERIFIED")
	ProfileImage = models.ImageField(upload_to='profile_images/', blank=True, null=True)

class AccountRemoval(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	Status = models.CharField(max_length=10, default='Pending')
	Date = models.DateField(auto_now_add=True)
	Time = models.TimeField(auto_now_add=True)
