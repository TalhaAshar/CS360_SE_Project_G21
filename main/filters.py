from rest_framework import filters

# Function to dynamically generate filters for search requests
class DynamicSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        print(request)
        return request.GET.getlist('search_fields', [])