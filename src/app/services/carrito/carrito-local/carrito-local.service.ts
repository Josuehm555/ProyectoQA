import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CarritoService } from '../carrito/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoLocalService {

  carrito_resumen: any = []
  precio_total: number = 0
  carrito_actualizado: Subject<boolean> = new Subject<boolean>();

  constructor(private carrito_service: CarritoService, private toastr: ToastrService) {

  }

  consultar_carrito_resumen() {
    this.carrito_service.carrito_resumen().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.carrito_resumen = res.body.resultado;
          this.calcular_precio_total_carrito()
          this.carrito_cambios()
        }
      },
      (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  eliminar_del_carrito(producto_info: any) {

    this.carrito_service.eliminar_del_carrito(producto_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          location.reload();
        }
      },
      (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  cambiar_cantidad_carrito(producto_info: any) {
    this.carrito_service.cambiar_cantidad_del_carrito(producto_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          let idx = this.carrito_resumen.items.findIndex((producto: any) => producto.id_producto == producto_info.id_producto && producto.id_estilo == producto_info.id_estilo)
          this.carrito_resumen.items[idx].cantidad = producto_info.cantidad;
          this.calcular_precio_total_carrito()
          this.carrito_cambios()
        }
      },
      (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  carrito_cambios() {
    this.carrito_actualizado.next(this.carrito_resumen);
  }

  calcular_precio_total_carrito() {
    this.precio_total = 0;
    this.carrito_resumen.items.forEach((producto: any) => {
      if (producto.cantidad == -1) {
        this.precio_total += producto.precio
      } else {
        this.precio_total += (producto.precio * producto.cantidad)
      }
    });

  }

}
