from django.urls import path
from .views import MyListDefault, MyListGuest, MyListRead, MyListUnread, MyListAlphabetical, UserAccountView, Reports, ModeratorApps, MyPubActivity, UserGuestView, ModeratorDecision, Recommendations, EditProfileView, ReportResolution, UserActivityHistory, ChangeListStatus
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
	#URLs for personalized lists
	path("mylist/", MyListDefault.as_view()),
	path("mylist/add/<int:id>", MyListDefault.as_view()),
	path("mylist/delete/<int:id>", MyListDefault.as_view()),
	path("mylist/alphabetical", MyListAlphabetical.as_view()),
	path("mylist/unread", MyListUnread.as_view()),
	path("mylist/read", MyListRead.as_view()),
	path("list/<int:id>", MyListGuest.as_view()),

	#URLs for profile views
    path("profile", UserAccountView.as_view()),
	path("profile/<int:id>", UserGuestView.as_view()),

	#URLs for reports and mod apps
	path("reports", Reports.as_view()),
	path("reports/<int:id>", ReportResolution.as_view()),
	path("modapps", ModeratorApps.as_view()),
	path("pub_activity", MyPubActivity.as_view()),
	path("modapps/<int:id>", ModeratorDecision.as_view()),
	path("modapps/<int:id>/<str:act>", ModeratorDecision.as_view()),
	path("recs", Recommendations.as_view()),
	
	#URLs for auxiliary support functions 
	path("edit_profile", EditProfileView.as_view()),
	path("my_activity", UserActivityHistory.as_view()),
	path("listings/<int:id>/<str:state>", ChangeListStatus.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)