import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/Productos/producto';
import { Producto_Albumes } from 'src/app/models/Productos/producto_albumes';
import { Producto_Audifonos } from 'src/app/models/Productos/producto_audifonos';
import { Producto_Parlantes } from 'src/app/models/Productos/producto_parlantes';

@Injectable({
  providedIn: 'root'
})

/*
Las especificaciones están definidas según el tipo de producto

1 - Albumes 
2 - Audifonos 
3 - Parlantes 

*/

export class EspecificacionesProductoService {

  constructor() { }

  crear_especificaciones_producto(producto: Producto): any[] {
    let producto_obj;
    switch (producto.caracteristicas.id_tipo) {
      case 1:
        producto_obj = new ProductosAlbumesFactory();
        return producto_obj.crear_especificaciones(producto)
      case 2:
        producto_obj = new ProductosAudifonosFactory();
        return producto_obj.crear_especificaciones(producto)
      case 3:
        producto_obj = new ProductosParlantesFactory();
        return producto_obj.crear_especificaciones(producto)
      default:
        return [];
    }

  }
}


interface ProductosFactory {
  crear_especificaciones(producto: Producto): any[]
}

class ProductosAlbumesFactory implements ProductosFactory {

  crear_especificaciones(producto: Producto): any[] {
    let producto_album = producto.caracteristicas as Producto_Albumes
    let especificaciones = [
      {
        especificacion: 'Artista',
        valor: producto_album.artista
      },
      {
        especificacion: 'Tíltulo',
        valor: producto.titulo
      },
      {
        especificacion: 'Género Musical',
        valor: producto_album.generos
      },
      {
        especificacion: 'Año de lanzamiento',
        valor: producto.fecha_lanzamiento
      },
    ];
    return especificaciones;
  }
}

class ProductosAudifonosFactory implements ProductosFactory {

  crear_especificaciones(producto: Producto): any[] {
    let producto_audifonos = producto.caracteristicas as Producto_Audifonos
    let especificaciones = [
      {
        especificacion: 'Marca',
        valor: producto_audifonos.marca
      },
      {
        especificacion: 'Tipo',
        valor: producto_audifonos.tipo
      },
      {
        especificacion: 'Conexión',
        valor: producto_audifonos.conexion
      },
      {
        especificacion: 'Año de lanzamiento',
        valor: producto.fecha_lanzamiento
      },
    ];
    return especificaciones;
  }
}

class ProductosParlantesFactory implements ProductosFactory {

  crear_especificaciones(producto: Producto): any[] {
    let producto_parlantes = producto.caracteristicas as Producto_Parlantes
    let especificaciones = [
      {
        especificacion: 'Marca',
        valor: producto_parlantes.marca
      },
      {
        especificacion: 'Tipo',
        valor: producto_parlantes.tipo
      },
      {
        especificacion: 'Conexión',
        valor: producto_parlantes.conexion
      },
      {
        especificacion: 'Año de lanzamiento',
        valor: producto.fecha_lanzamiento
      },
    ];
    return especificaciones;
  }
}
