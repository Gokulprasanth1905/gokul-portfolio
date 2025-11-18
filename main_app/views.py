from django.shortcuts import render

def index(request):
    """Renders the single-page portfolio homepage with all sections."""
    return render(request, 'main_app/index.html')


