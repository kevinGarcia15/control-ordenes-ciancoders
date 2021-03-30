import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination

#models
from api.models import Producto

#serializer
from api.serializers import ProductoSerializer, ProductoReadSerializer


class ProductoPageNumberPagination(PageNumberPagination):
    page_size=10


class ProductoViewset(viewsets.ModelViewSet):
    """Producto viewset"""
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoReadSerializer
    pagination_class=ProductoPageNumberPagination


    def get_permissions(self):
        if self.action in ['list', 'retreve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    @action(methods=['get'], detail=False)
    def misproductos(self, request):
        """Muestra la lista de productos de un usuario"""
        #import pdb; pdb.set_trace() 
        profile = request.user.profile
        productos = Producto.objects.filter(duenio=profile, activo=True)
        page = self.paginate_queryset(productos)
        if page is not None:
            serializer = ProductoReadSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ProductoReadSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)