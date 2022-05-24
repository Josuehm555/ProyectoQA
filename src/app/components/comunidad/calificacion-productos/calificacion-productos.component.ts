import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/models/Productos/producto';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { ResenaProductoModalComponent } from '../../modals/resena-producto-modal/resena-producto-modal.component';

@Component({
  selector: 'app-calificacion-productos',
  templateUrl: './calificacion-productos.component.html',
  styleUrls: ['./calificacion-productos.component.css']
})
export class CalificacionProductosComponent implements OnInit {

  @Input() producto: Producto = {
    id_creador: 0,
    titulo: '',
    id_producto: 0,
    nombre_creador: '',
    caracteristicas: {} as any,
    cantidad_resenas: 0,
    calificacion: 0
  }
  @Input() mi_resena: boolean = false;
  sesion: boolean = localStorage.getItem('token') ? true: false

  constructor(private modal_service: NgbModal,
    private comentarios_calificaciones_service: ComentariosCalificacionesService) { }

  ngOnInit(): void {
  }

  abrir_modal_resena() {
    let calificaciones: any[] = []
    this.producto.calificaciones?.forEach((item: any) => {
      let item_clonado = Object.assign({}, item)
      item_clonado.calificacion = 1;
      calificaciones.push(item_clonado);
    })
    const modal_ref = this.modal_service.open(ResenaProductoModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
        size: 'lg'
      });

    let datos = {
      resena: 'producto',
      calificaciones: calificaciones,
      comentario: '',
      id: this.producto.id_producto,
    }

    modal_ref.componentInstance.datos_resena = datos;
    modal_ref.result.then((result) => {
      if (result != 'cancelar') {
        window.location.reload()
      }
    }, (reason) => {
    });
  }

}
