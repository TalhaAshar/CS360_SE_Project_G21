from rest_framework import serializers
from .models import Publication, Contribution, Copyright

# Serializer for a Publication Instance
class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ('id' , 'Title', 'Authors', 'Publisher', 'Year_Publication', 'Edition_Number', 'ISBN', 'Lang', 'Description', 'Genres', 'Best_Edition', 'Front_Cover', 'Back_Cover', 'Spine', 'Reason_for_Best_Pub')

# Serializer for a user's contribution to the publication database
class ContributionSerializer(serializers.ModelSerializer):
    Publication_ID = PublicationSerializer(read_only=True)
    class Meta:
        model = Contribution
        fields = ('id', 'Username', 'Publication_ID', 'Date', 'Edit_Type')

# Serializer for copyright claims
class CopyrightSerializer(serializers.ModelSerializer):
    Copy_Pub = PublicationSerializer(read_only=True)
    class Meta:
        model = Copyright
        fields = ('id', 'Copy_Pub', 'Authority', 'Relationship', 'Name', 'Country', 'Email' ,'Reason', 'Date', 'Time')