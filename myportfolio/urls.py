from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Route all root traffic to the main_app URL configuration
    path('', include('main_app.urls')),
]