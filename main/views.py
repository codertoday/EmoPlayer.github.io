from django.shortcuts import render
from django.http.response import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from main.detect import getExpression
import json

def index(request):
    return render(request, 'index.html')

@csrf_exempt # allows the function to return a HTTP response... django problem
def expression(request):
    uri = json.loads(request.body)['image_uri']
    expression = getExpression(uri)
    return JsonResponse({"mood": expression})

def music(request):
    return render(request, 'music.html')

def login(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def contact(request):
    return render(request, 'contact.html')

def about(request):
    return render(request, 'about.html')

