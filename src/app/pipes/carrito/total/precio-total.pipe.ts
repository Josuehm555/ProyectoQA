import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioTotal'
})
export class PrecioTotalPipe implements PipeTransform {

  // Calcular el precio de la compra con el envío (precio total)
  transform(precio: number, envio: number): number {
    return precio + envio;
  }
}
