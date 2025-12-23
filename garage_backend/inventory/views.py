from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner
from .models import Item
from .serializers import ItemSerializer

class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_permissions(self):
        # View items → Owner + Mechanic
        if self.request.method == "GET":
            return [IsAuthenticated()]

        # Add / Update / Delete → Owner only
        return [IsAuthenticated(), IsOwner()]


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
