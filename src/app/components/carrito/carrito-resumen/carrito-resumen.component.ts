import { Component, OnInit } from '@angular/core';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';

@Component({
  selector: 'app-carrito-resumen',
  templateUrl: './carrito-resumen.component.html',
  styleUrls: ['./carrito-resumen.component.css']
})
export class CarritoResumenComponent implements OnInit {

  public colapsado = true;
  sesion: boolean = false;
  carrito:any[] = []
  precio_total:number = 0

  constructor(private acceso_service: AccesoService,
    private carrito_local_service: CarritoLocalService) {
    }

  ngOnInit(): void {
    this.sesion = this.acceso_service.esta_autenticado();
    this.carrito_local_service.carrito_actualizado.subscribe((carrito_actual:any) => {
      this.carrito = carrito_actual.items
      this.precio_total = this.carrito_local_service.precio_total
    });
    this.carrito_local_service.consultar_carrito_resumen()

  }

  abrir_cerrar() {
    this.colapsado = !this.colapsado;
  }

  cerrar() {
    this.colapsado = false;
  }

}
