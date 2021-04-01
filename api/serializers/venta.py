from rest_framework import serializers

#model
from api.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    """Venta serializer"""
    class Meta:
        model = Venta
        fields = ('email_contacto',)


class VentaReadSerializer(serializers.ModelSerializer):
    """Venta serializer"""
    class Meta:
        model = Venta
        fields = '__all__'
        depth=2