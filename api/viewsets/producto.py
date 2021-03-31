import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.core.files import File

#permissions
from api.permission.producto import IsOwnProducto

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
        if self.action in ['list', 'retrieve']:
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

    def create(self, request):
        """Reescribiendo el metodo create"""
        try:
            profile = request.user.profile
            data = request.data
            imagen = data.get('imagen')
            data = json.loads(data["data"])
            serializer = ProductoSerializer(data=data)
            #import pdb; pdb.set_trace()
            if serializer.is_valid(raise_exception=True):
                Producto.objects.create(
                    nombre=data.get('nombre'),
                    precio=data.get('precio'),
                    descripcion=data.get('descripcion'),
                    imagen=File(imagen),
                    duenio=profile
                ) 
                return Response("creado exitosamete", status=status.HTTP_201_CREATED)
        except TypeError as e:
           return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        """Reescribiendo el metodo update"""
        try:
            data = request.data
            imagen = data.get('imagen')
            data = json.loads(data["data"])
            serializer = ProductoSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                producto = Producto.objects.get(pk=pk)
                if request.user.profile != producto.duenio:
                    return Response("no tiene permiso para realizar esta accion", status=status.HTTP_401_UNAUTHORIZED)
                if imagen is not None: 
                    if producto.imagen is not None:
                        producto.imagen.delete()
                        producto.imagen=File(imagen)
                producto.nombre = data.get('nombre')
                producto.precio = data.get('precio')
                producto.descripcion = data.get('descripcion')
                producto.nombre = data.get('nombre')
                producto.save()
                return Response("datos actualizados", status=status.HTTP_200_OK)
        except TypeError as e:
           return Response(e, status=status.HTTP_400_BAD_REQUEST)        

    def destroy(self, request, pk):
        producto = Producto.objects.get(pk=pk)
        producto.imagen.delete()
        producto.activo = False
        producto.save()
        return Response({"producto eliminado exitosamente"}, status=status.HTTP_200_OK)