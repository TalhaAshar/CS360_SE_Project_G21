from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from .views import GuestRecentThreads, AddThread, UserRecentThreads, ThreadsHome , EditThread, DeleteThread#, DeletePost, AddThread, AddPost

urlpatterns = [
	path("guest/home", GuestRecentThreads.as_view()),
    path("user/home", UserRecentThreads.as_view()),
	path("threads/add", AddThread.as_view()),
    path("threads/<int:id>", ThreadsHome.as_view()),
	# path("threads/edit/<int:id>", EditThread.as_view()),
	path("threads/delete/<int:id>", DeleteThread.as_view()),
	# path("post/delete/<int:id>", DeletePost.as_view()),
	# path("threads/add/<int:id>", AddPost.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)