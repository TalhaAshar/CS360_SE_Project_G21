from django.contrib import admin
from django.urls import path, include
from .views import SignUpView, ActivateAccount, ForgotPassword, LoginView, UserAPIView, LogoutView, ChangePassword, UserAccountRemoval, AdminAccountRemoval, Blacklist, AuthenticationCheck
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   # Account creation URLs
   path('signup', SignUpView.as_view()),
   path('activate/<uidb64>/<token>/', ActivateAccount, name='activate'),
   path('forgot', ForgotPassword.as_view(), name="forgot"),

   # Account access URLs
   path('login', LoginView.as_view()),
   path('logout', LogoutView.as_view()),
   path('auth', AuthenticationCheck.as_view()),

   # Account Management URLs
   path('change_password', ChangePassword.as_view()),
   path('user/delete', UserAccountRemoval.as_view()),
   path('admin/delete', AdminAccountRemoval.as_view()),
   path('admin/delete/<int:id>', AdminAccountRemoval.as_view()),
   path('blacklist', Blacklist.as_view()),
   path('blacklist/<str:act>/<int:id>', Blacklist.as_view()),
]

# Setting media path

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)
