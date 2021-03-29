from django.db import models

#models
from api.models import Profile

class Producto(models.Model):
    duenio = models.ForeignKey(Profile, related_name='duenios', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    precio = models.FloatField(default=0)
    descripcion = models.CharField(max_length=250, blank=True, null=True)
    imagen = models.ImageField(upload_to='img_productos', blank=True, null=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

