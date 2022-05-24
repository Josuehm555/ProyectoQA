import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioSubtotal'
})
export class PrecioSubtotalPipe implements PipeTransform {
  
  // Calcular el precio sin el impuesto (subtotal)
  transform(precio: number): number {
    return precio - (precio * 0.13) ;
  }

}
