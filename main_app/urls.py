from django.urls import path
from . import views

urlpatterns = [
    # Maps the root URL (/) to the index view (Home)
    path('', views.index, name='index'),
]