"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from main.views import Index
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve 
from django.conf.urls import url


urlpatterns = [
    
    # Redirecting URLs
    path('api/main/', include("main.urls")),
    path('api/register/', include("register.urls")),
    path('api/accounts/', include("accounts.urls")),
    path('api/forum/', include("forum.urls")),
    path('', include("frontend.urls")),
    re_path(r'^.*$', include("frontend.urls")),
    
    #path('api/auth/', include('django.contrib.auth.urls')),
    #path('add/', include("main.urls")),
] 