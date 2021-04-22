from django.urls import path
from .views import Index, CatalogueList, CatalogueColumnar, Search, ViewPublication, AddPublication, EditPublication, TakedownRequest, ContactUs
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [

	# URLs for the home pages
	path('home', Index.as_view()),
	path('', Index.as_view()),

	# URLs for publication catalogues
	path('catalogue_list/', CatalogueList.as_view()),
	path('catalogue_columnar/', CatalogueColumnar.as_view()),
	path('query/', Search.as_view()),

	# URLs for operations related to a single publication
	path('publication/<int:id>', ViewPublication.as_view()),
	path("add_publication", AddPublication.as_view()),
	path("edit_publication/<int:id>", EditPublication.as_view()),

	# URLs for contacting site admins
	path("takedown", TakedownRequest.as_view()),
	path("takedown/<int:id>", TakedownRequest.as_view()),
	path("contact", ContactUs.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)