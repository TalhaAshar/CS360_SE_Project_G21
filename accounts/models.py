from django.db import models
from django.contrib.auth.models import User
from main.models import Publication
from forum.models import Post, Thread

# Model for a user's personalized list
class PersonalizedList(models.Model):
	Owner = models.ForeignKey(User, on_delete=models.CASCADE)
	DisplayChoices = models.TextChoices('DisplayChoices', 'ALPHABETICAL READ UNREAD')
	Display_Type = models.CharField(choices=DisplayChoices.choices, max_length=15, null=True)

# Model for reports filed by a user
class Report(models.Model):
	Creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	ReasonChoices = models.TextChoices('ReasonChoices', 'SPAM OFFENSIVE MISLEADING ABUSE INCORRECT_DATA INACCURATE_DESCRIPTION NOT_EXIST_PUBLICATION IMAGE_UNCLEAR')
	Reason = models.CharField(choices=ReasonChoices.choices, max_length=60, null=True)
	Description = models.TextField(max_length=5000)
	Date = models.DateField(auto_now_add=True)
	Time = models.TimeField(auto_now_add=True)
	StatusChoices = models.TextChoices('StatusChoices', 'RESOLVED UNRESOLVED')
	Status = models.CharField(choices=StatusChoices.choices, max_length=15, null=True)
	Relevant_Post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
	Relevant_Pub = models.ForeignKey(Publication, on_delete=models.CASCADE, null=True)
	Relevant_Thread = models.ForeignKey(Thread, on_delete=models.CASCADE, null=True)

# Moderator for a user's application for moderatorship
class ModeratorApplication(models.Model):
	Creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	Name = models.CharField(max_length=255)
	Location = models.CharField(max_length=255)
	Reason = models.TextField(max_length=5000)
	Description = models.TextField(max_length=5000)
	Date = models.DateField(auto_now_add=True)
	Time = models.TimeField(auto_now_add=True)
	StatusChoices = models.TextChoices('StatusChoices', 'ACCEPTED REJECTED PENDING')
	Status = models.CharField(choices=StatusChoices.choices, max_length=15, null=True)

# Model to hold links between Posts and Threads
class Listings(models.Model):
	ListOwner = models.ForeignKey(User, on_delete=models.CASCADE)
	ListPub = models.ForeignKey(Publication, on_delete=models.CASCADE)
	StatusChoices = models.TextChoices('StatusChoices', 'READ UNREAD')
	Status = models.CharField(choices=StatusChoices.choices, max_length=15, null=True)

# Model to keep a track of the user's activity
class MyActivity(models.Model):
	Owner = models.ForeignKey(User, on_delete=models.CASCADE)
	FiledReport = models.ForeignKey(Report, on_delete=models.CASCADE, null=True, blank=True)
	ModApp =  models.ForeignKey(ModeratorApplication, on_delete=models.CASCADE, null=True, blank=True)
	CreatedThread =  models.ForeignKey(Thread, on_delete=models.CASCADE, null=True, blank=True, related_name="Thread")
	CreatedPost =  models.ForeignKey(Thread, on_delete=models.CASCADE, null=True, blank=True, related_name="Post")
