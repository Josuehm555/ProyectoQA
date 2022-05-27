import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioCantidad'
})
export class PrecioCantidadPipe implements PipeTransform {
  
  // Calcular el precio de los artículos según la cantidad
  transform(precio: number, cantidad: number): number {
    if(cantidad == -1){ // es un producto digital
      return precio
    }
    return precio * cantidad;
  }

}
