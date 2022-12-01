from django.urls import path, include
from main import views

urlpatterns = [
    path('', views.index, name="index"),
    path("expression", views.expression, name="expression"),
    path("music", views.music, name="music"),
    path("login", views.login, name="login"),
    path("signup", views.signup, name="signup"),
    path("contact", views.contact, name="contact"),
    path("about", views.about, name="about"),
]

