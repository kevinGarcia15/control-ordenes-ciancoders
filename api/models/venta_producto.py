from django.db import models

#model
from api.models import Producto, Venta

class Venta_producto(models.Model):
    """Modelo de Venta_producto"""
    producto = models.ForeignKey(Producto, related_name="productos",on_delete=models.CASCADE)
    venta = models.ForeignKey(Venta, related_name="ventas", on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    activo = models.BooleanField(default=True)
    def __str__(self):
        return self.producto.nombre


    def delete(self, *args):
        self.activo = False
        self.save()
        return True
