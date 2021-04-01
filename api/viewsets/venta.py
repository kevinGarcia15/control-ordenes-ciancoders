import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination

#modelos
from api.models import Venta, Producto, Venta_producto

#serializers
from api.serializers import VentaSerializer, VentaReadSerializer

class VentaPageNumberPagination(PageNumberPagination):
    page_size=10


class VentaViewset(viewsets.ModelViewSet):
    """Venta vewset"""
    queryset = Venta.objects.filter(activo=True)
    serializer_class = VentaSerializer
    pagination_class=VentaPageNumberPagination


    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def create(self, request):
        """Reescribiendo el metodo create"""
        data = request.data
        serializer = VentaSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            with transaction.atomic():
                producto = Producto.objects.get(pk=data.get('id'))
                #guarda si el usuario es anonimo
                if not request.user.is_authenticated:
                    venta = Venta.objects.create(
                        email_contacto = data.get('email')
                    )
                    venta_producto = Venta_producto.objects.create(
                        producto=producto,
                        venta=venta,
                        cantidad=data.get('cantidad')
                    )                    
                    return Response("Ha comprado como usuario anonimo", status=status.HTTP_201_CREATED)

                if producto.duenio == request.user.profile:
                    return Response({"detail":"Usted no puede comprar su propio producto"}, status=status.HTTP_400_BAD_REQUEST)

                #guarda si el usuario esta logueado    
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
    
    def list(self, request):
        """Sobreescribiendo el metodo listar"""
        vendedor = request.user.profile
        queryset = Venta.objects.filter(activo=True, ventas__producto__duenio=vendedor)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = VentaReadSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = VentaReadSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)