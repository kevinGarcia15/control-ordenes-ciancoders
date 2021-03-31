from rest_framework import serializers

#model
from api.models import Venta

class VentaSerializer(serializers.ModelSerializer):
    """Venta serializer"""
    class Meta:
        model = Venta
        fields = ('cantidad', 'email_contacto')