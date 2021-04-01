from django.db import models

#model
from api.models import Producto
from api.models import Profile

class Venta(models.Model):
    """Modelo de Venta"""
    comprador = models.ForeignKey(Profile, related_name="compradores", on_delete=models.CASCADE, blank=True, null=True)
    email_contacto = models.EmailField(blank=True, null=True, help_text="Para los compradores sin perfil")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.producto.nombre


    def delete(self, *args):
        self.activo = False
        self.save()
        return True