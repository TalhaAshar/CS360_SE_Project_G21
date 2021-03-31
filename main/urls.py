from django.urls import path
from .views import Index, CatalogueList, CatalogueColumnar, Search, ViewPublication, AddPublication, EditPublication, TakedownRequest, ContactUs
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
	path('home', Index.as_view()),
	path('', Index.as_view()),
	path('catalogue_list/<int:id>', CatalogueList.as_view()),
	path('catalogue_columnar/<int:id>', CatalogueColumnar.as_view()),
	path('search', Search.as_view()),
	path('publication/<int:id>', ViewPublication.as_view()),
	path("add_publication", AddPublication.as_view()),
	path("edit_publication/<int:id>", EditPublication.as_view()),
	path("takedown", TakedownRequest.as_view()),
	path("takedown/<int:id>", TakedownRequest.as_view()),
	path("contact", ContactUs.as_view()),
]

if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT)