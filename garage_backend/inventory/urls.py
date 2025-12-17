from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, StockLogViewSet, user_profile

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'stocklogs', StockLogViewSet)

urlpatterns = [
    path('me/', user_profile),
]

urlpatterns += router.urls
