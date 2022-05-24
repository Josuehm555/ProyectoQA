import { Component, OnInit, OnDestroy } from '@angular/core';
import { Producto } from '../../../models/Productos/producto';
import { Idioma } from '../../../models/idioma'
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['../../../../animaciones.css', './tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  productos: Producto[] = [];
  trigger_tabla: Subject<any> = new Subject<any>();
  rol: string = ''

  constructor(private productos_service: ProductosService,
    private modal_service: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string
    this.iniciar_tabla();
    this.consultar_productos();
  }

  private iniciar_tabla() {
    this.dtOptions = {
      language: Idioma.espanol_tablas,
      pagingType: 'full_numbers',
      scrollX: true,
      pageLength: 10,
      responsive: true,
      processing: true,
    };
  }


  /* =========== VER PRODUCTOS =============== */

  private consultar_productos() {
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "2":
        this.consultar_productos_creador(rol)
        break;
      default:
        this.consultar_todos_productos()
    }

  }

  private consultar_todos_productos() {
    this.productos_service.consultar_productos().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
          this.trigger_tabla.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private consultar_productos_creador(rol: string) {
    this.productos_service.consultar_mis_productos().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
          this.trigger_tabla.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  ver_producto(id_producto: any) {
    this.router.navigate(['/ver-producto', id_producto]);
  }


  /* ============= MODIFICAR PRODUCTO =============== */

  modificar_producto(id_producto: any) {
    this.router.navigate(['/inicio/modificar-producto', { state: { id: id_producto } }]);
  }

  /* ============= ELIMINAR PRODUCTO =============== */

  abrir_modal_eliminar(id_producto: number, titulo_producto: string) {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'producto',
      mensaje: "Se eliminará el producto " + titulo_producto,
      id: id_producto,
    }

    modal_ref.componentInstance.datos_eliminar = datos;
    modal_ref.result.then((result) => {
      if(result != 'cancelar'){window.location.reload()}
    }, (reason) => {
    });
  }

  ngOnDestroy(): void {
    this.trigger_tabla.unsubscribe();
  }

}
