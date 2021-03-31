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
from django.urls import path, include
from .views import SignUpView, ActivateAccount, ForgotPassword, LoginView, UserAPIView, LogoutView, ChangePassword, UserAccountRemoval, AdminAccountRemoval, Blacklist
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('signup', SignUpView.as_view()),
   path('activate/<uidb64>/<token>/', ActivateAccount.as_view(), name='activate'),
   path('forgot', ForgotPassword.as_view(), name="forgot"),
   path('login', LoginView.as_view()),
   path('logout', LogoutView.as_view()),
   path('change_password', ChangePassword.as_view()),
   path('user/delete', UserAccountRemoval.as_view()),
   path('admin/delete', AdminAccountRemoval.as_view()),
   path('admin/delete/<int:id>', AdminAccountRemoval.as_view()),
   path('blacklist', Blacklist.as_view()),
   path('blacklist/<str:act>/<int:id>', Blacklist.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)
