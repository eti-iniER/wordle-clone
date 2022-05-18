from rest_framework import serializers
from .models import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ('answer', 'first_guess', 'second_guess', 'third_guess', 'fourth_guess', 'fifth_guess', 'sixth_guess')
        