"""Serializer de producto"""
from rest_framework import serializers

#model
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Producto
        fields = ('nombre', 'precio', 'descripcion', 'imagen')


class ProductoReadSerializer(serializers.ModelSerializer):
    totalVendido = serializers.IntegerField(default=0)
    ingresosObtenidos = serializers.FloatField(default=0)
    class Meta:
        model = Producto
        fields = "__all__"