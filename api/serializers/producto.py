"""Serializer de producto"""
from rest_framework import serializers

#model
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Producto
        fields = ('nombre', 'precio', 'descripcion', 'imagen')


class ProductoReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = "__all__"