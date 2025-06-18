from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FashionItemViewSet, StyleRecommendationViewSet

router = DefaultRouter()
router.register(r'fashion-items', FashionItemViewSet)
router.register(r'recommendations', StyleRecommendationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]