"""Poroducto permissions"""
#django
from rest_framework.permissions import BasePermission

#models
from api.models import Producto

class IsOwnProducto(BasePermission):
    """verifica si el usuario tiene permiso 
    para manipular un produco
    """
    def has_object_permission(self, request, view, obj):
        """Permite manipular un producto si el lo creo"""
        try:
            #import pdb; pdb.set_trace()
            profile = request.user.profile
            if obj.duenio == profile:
                return True
            else:
                return False
        except:
            return False