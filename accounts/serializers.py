from rest_framework import serializers
from main.models import Publication
from .models import PersonalizedList, Listings, Report, ModeratorApplication, MyActivity
from register.models import Profile
from django.contrib.auth.models import User
from main.serializers import PublicationSerializer

# User class Serialier
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Listings Class Serializer
class ListingsSerializer(serializers.ModelSerializer):
    ListOwner = UserSerializer(read_only=True)
    ListPub = PublicationSerializer(read_only=True)
    class Meta:
        model = Listings
        fields = ('id', 'ListOwner', 'ListPub' , 'Status')

# Profile Serializer for users
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'user', 'email_confirmed', 'profession', 'company', 'education', 'institution', 'location', 'age', 'biography', 'blacklisted', 'User_Type', 'ProfileImage', 'Disable')

# Serializer for reports
class ReportSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    Relevant_Pub = PublicationSerializer(read_only=True)
    class Meta:
        model = Report
        fields = ('id', 'Creator', 'Reason', 'Description', 'Date', 'Time', 'Status', 'Relevant_Post', 'Relevant_Pub', 'Relevant_Thread')

# Serializer for mod apps
class ModeratorSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = ModeratorApplication
        fields = ('id', 'Creator', 'Name', 'Location' ,'Reason', 'Description', 'Date', 'Time', 'Status')

# Serializer for a user's activity
class ActivitySerializer(serializers.ModelSerializer):
    Owner = UserSerializer(read_only=True)
    FiledReport = ReportSerializer(read_only=True)
    ModApp = ModeratorSerializer(read_only=True)
    class Meta:
        model = MyActivity
        fields = ('id', 'Owner', 'FiledReport', 'ModApp', 'CreatedThread', 'CreatedPost')