import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioImpuesto'
})
export class PrecioImpuestoPipe implements PipeTransform {
  
  // Calcular el impuesto del precio
  transform(precio: number): number {
    return precio * 0.13;
  }

}
