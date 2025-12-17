from django.db import models

class Item(models.Model):
    CATEGORY_CHOICES = [
        ('engine', 'Engine Parts'),
        ('oil', 'Oils & Lubricants'),
        ('electrical', 'Electrical'),
        ('tools', 'Tools'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    quantity = models.PositiveIntegerField()
    min_quantity = models.PositiveIntegerField(default=5)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    supplier = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_low_stock(self):
        return self.quantity <= self.min_quantity

    def __str__(self):
        return self.name


class StockLog(models.Model):
    ACTION_CHOICES = [
        ('IN', 'Stock In'),
        ('OUT', 'Stock Out'),
    ]

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    action = models.CharField(max_length=3, choices=ACTION_CHOICES)
    quantity = models.PositiveIntegerField()
    note = models.CharField(max_length=200, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk is None:  # Only on first save
            if self.action == 'IN':
                self.item.quantity += self.quantity
            elif self.action == 'OUT':
                if self.item.quantity >= self.quantity:
                    self.item.quantity -= self.quantity
                else:
                    raise ValueError("Not enough stock available")

            self.item.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.item.name} - {self.action}"
