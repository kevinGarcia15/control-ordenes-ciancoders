from rest_framework import serializers

#model
from api.models import Venta_producto

class VentaProductoReadSerializer(serializers.ModelSerializer):
    """Venta serializer"""
    class Meta:
        model = Venta_producto
        fields = '__all__'
        depth=3