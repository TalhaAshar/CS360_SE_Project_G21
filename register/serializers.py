from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import AccountRemoval, Profile

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, validated_data):
        #print(validated_data["id"])
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        print(user, " user")
        if user and user.is_active:
            return user
        return serializers.ValidationError("Incorrect credentials")

# Forgot Password Serializer
class ForgotSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email')

# Account Removal Serializer
class RemovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountRemoval
        fields = ('id', 'user', 'Status', 'Date', 'Time')

# Blacklist Serializer
class BlacklistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'user', 'email_confirmed', 'profession', 'company', 'education', 'institution', 'location', 'age', 'biography', 'blacklisted', 'User_Type', 'ProfileImage')


