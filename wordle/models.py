from django.db import models

# Create your models here.

class Session(models.Model):
    answer = models.CharField(max_length=5)
    first_guess = models.CharField(max_length=5)
    second_guess = models.CharField(max_length=5)
    third_guess = models.CharField(max_length=5)
    fourth_guess = models.CharField(max_length=5)
    fifth_guess = models.CharField(max_length=5)
    sixth_guess = models.CharField(max_length=5)