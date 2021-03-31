from django.urls import path
from .views import MyListDefault, MyListGuest, MyListRead, MyListUnread, MyListAlphabetical, UserAccountView, Reports, ModeratorApps, MyPubActivity, UserGuestView, ModeratorDecision
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
	path("mylist/", MyListDefault.as_view()),
	path("mylist/add/<int:id>", MyListDefault.as_view()),
	path("mylist/alphabetical", MyListAlphabetical.as_view()),
	path("mylist/unread", MyListUnread.as_view()),
	path("mylist/read", MyListRead.as_view()),
	path("list/<int:id>", MyListGuest.as_view()),
    path("profile", UserAccountView.as_view()),
	path("profile/<int:id>", UserGuestView.as_view()),
	path("reports", Reports.as_view()),
	path("modapps", ModeratorApps.as_view()),
	path("pub_activity", MyPubActivity.as_view()),
	path("modapps/<str:act>/<int:id>", ModeratorDecision.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)