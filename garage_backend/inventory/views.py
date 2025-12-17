from rest_framework import viewsets
from .models import Item, StockLog
from .serializers import ItemSerializer, StockLogSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class StockLogViewSet(viewsets.ModelViewSet):
    queryset = StockLog.objects.all().order_by('-timestamp')
    serializer_class = StockLogSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    groups = user.groups.values_list('name', flat=True)

    role = groups[0] if groups else "Mechanic"

    return Response({
        "username": user.username,
        "role": role
    })
