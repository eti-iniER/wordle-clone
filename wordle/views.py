from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Session
from .serializers import SessionSerializer
import random
import json

# Create your views here.

possible_words = json.load(open('wordle/five_letters.json'))
session_answer = random.choice(possible_words)
this_round = None

def play(request):
    this_round = Session.objects.create(answer=session_answer)
    return HttpResponse("This is the main app page")

class SessionView(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    queryset = Session.objects.all()


    
