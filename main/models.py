from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class Publication(models.Model):
	Title = models.CharField(max_length = 150)
	Authors = models.CharField(max_length = 255)
	Publisher = models.CharField(max_length = 255, blank=True, null=True)
	Year_Publication = models.IntegerField(blank=True, null=True)
	Edition_Number = models.IntegerField(blank=True, null=True)
	ISBN = models.BigIntegerField(blank=True, null=True)
	Lang = models.CharField(max_length = 30)
	Description = models.TextField(max_length = 5000)
	Genres = models.CharField(max_length=255, default='')
	Best_Edition = models.BooleanField(default=False)
	Front_Cover = models.ImageField(upload_to='publications/', blank=True, null=True)
	Back_Cover = models.ImageField(upload_to='publications/', blank=True, null=True)
	Spine = models.ImageField(upload_to='publications/', blank=True, null=True)
	Reason_for_Best_Pub = models.TextField(max_length=5000, blank=True, null=True)

class Contribution(models.Model):
	Username = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
	Publication_ID = models.ForeignKey(Publication, on_delete=models.SET_NULL, null=True)
	Date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	EditChoices = models.TextChoices('EditChoices', 'ADD EDIT')
	Edit_Type = models.CharField(choices=EditChoices.choices, max_length=10, null=True)

class RelatedPublication(models.Model):
	Main_Publication = models.ForeignKey(Publication, on_delete=models.CASCADE, related_name="Main")
	Rel_Publication = models.ForeignKey(Publication, on_delete=models.CASCADE, related_name="Rel")

class Email(models.Model):
	Sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="Comm")
	Recipients = models.CharField(max_length=255)
	Subject = models.CharField(max_length=255)
	Content = models.TextField(max_length=5000)
	Date = models.DateField(auto_now_add=True)
	Time = models.TimeField(auto_now_add=True)

class Copyright(models.Model):
	Copy_Pub = models.ForeignKey(Publication, on_delete=models.SET_NULL, null=True)
	Authority = models.CharField(max_length=255)
	Reason = models.TextField(max_length=5000)
	Relationship = models.CharField(max_length=255, default='Owner')
	Name = models.CharField(max_length=255, default='CR')
	Email = models.EmailField(default='abc@gmail.com')
	Country = models.CharField(max_length=255, default='Pakistan')
	Date = models.DateField(auto_now_add=True)
	Time = models.TimeField(auto_now_add=True)
