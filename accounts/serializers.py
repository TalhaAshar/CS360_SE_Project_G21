from rest_framework import serializers
from main.models import Publication
from .models import PersonalizedList, Listings, Report, ModeratorApplication
from register.models import Profile
from django.contrib.auth.models import User
from main.serializers import PublicationSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ListingsSerializer(serializers.ModelSerializer):
    ListOwner = UserSerializer(read_only=True)
    ListPub = PublicationSerializer(read_only=True)
    class Meta:
        model = Listings
        fields = ('id', 'ListOwner', 'ListPub' , 'Status')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'user', 'email_confirmed', 'profession', 'company', 'education', 'institution', 'location', 'age', 'biography', 'blacklisted', 'User_Type', 'ProfileImage')

class ReportSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    Relevant_Pub = PublicationSerializer(read_only=True)
    class Meta:
        model = Report
        fields = ('id', 'Creator', 'Reason', 'Description', 'Date', 'Time', 'Status', 'Relevant_Post', 'Relevant_Pub')

class ModeratorSerializer(serializers.ModelSerializer):
    Creator = UserSerializer(read_only=True)
    class Meta:
        model = ModeratorApplication
        fields = ('id', 'Creator', 'Name', 'Location' ,'Reason', 'Description', 'Date', 'Time', 'Status')