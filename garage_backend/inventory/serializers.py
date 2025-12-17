from rest_framework import serializers
from .models import Item, StockLog

class ItemSerializer(serializers.ModelSerializer):
    low_stock = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    def get_low_stock(self, obj):
        return obj.is_low_stock()


class StockLogSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)

    class Meta:
        model = StockLog
        fields = '__all__'
