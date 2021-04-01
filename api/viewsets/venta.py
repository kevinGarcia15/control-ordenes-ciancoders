import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

#modelos
from api.models import Venta, Producto, Venta_producto

#serializers
from api.serializers import VentaSerializer

class VentaViewset(viewsets.ModelViewSet):
    """Venta vewset"""
    queryset = Venta.objects.filter(activo=True)
    serializer_class = VentaSerializer

    def create(self, request):
        """Reescribiendo el metodo create"""
        data = request.data
        serializer = VentaSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            with transaction.atomic():
                producto = Producto.objects.get(pk=data.get('id'))
                if producto.duenio == request.user.profile:
                    return Response({"detail":"Usted no puede comprar su propio producto"}, status=status.HTTP_400_BAD_REQUEST)

                venta = Venta.objects.create(
                    comprador = request.user.profile,
                    email_contacto = data.get('email')
                )
                venta_producto = Venta_producto.objects.create(
                    producto=producto,
                    venta=venta,
                    cantidad=data.get('cantidad')
                )
                return Response("Creado exitosamente", status=status.HTTP_201_CREATED)            