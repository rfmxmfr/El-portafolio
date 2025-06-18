from django.urls import path
from . import views

urlpatterns = [
    path('generate-ideas', views.generate_ideas, name='generate-ideas'),
    path('generate-image', views.generate_image, name='generate-image'),
    path('analyze-style', views.analyze_style, name='analyze-style'),
    path('model-status', views.model_status, name='model-status'),
    path('health', views.health_check, name='health-check'),
]