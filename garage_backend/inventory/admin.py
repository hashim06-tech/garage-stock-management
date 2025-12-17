from django.contrib import admin
from .models import Item, StockLog

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'quantity', 'min_quantity', 'low_stock_status')
    list_filter = ('category',)
    search_fields = ('name', 'supplier')

    def low_stock_status(self, obj):
        if obj.is_low_stock():
            return "⚠ LOW"
        return "OK"

    low_stock_status.short_description = 'Stock Status'


@admin.register(StockLog)
class StockLogAdmin(admin.ModelAdmin):
    list_display = ('item', 'action', 'quantity', 'timestamp')
    list_filter = ('action', 'timestamp')
