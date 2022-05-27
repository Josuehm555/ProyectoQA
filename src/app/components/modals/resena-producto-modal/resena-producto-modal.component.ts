import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';

@Component({
  selector: 'app-resena-producto-modal',
  templateUrl: './resena-producto-modal.component.html',
  styleUrls: ['../compartir.css', './resena-producto-modal.component.css']
})
export class ResenaProductoModalComponent implements OnInit {

  @Input() datos_resena: any = {};
  cargando: boolean = false;
  calificacion_actual: number = 1;

  constructor(
    public activo_modal: NgbActiveModal,
    private toastr: ToastrService,
    config: NgbRatingConfig,
    private comentarios_calificaciones_service: ComentariosCalificacionesService,
    private modal_service:NgbModal
  ) {
    config.max = 5;
  }

  ngOnInit() {
  }

  cerrar_modal() {
    this.activo_modal.close();
  }

  cerrar_modal_cancelar() {
    this.activo_modal.close('cancelar');
  }

  abrir_modal_confirmar() {
    const modal_ref = this.modal_service.open(ConfirmarModalComponent,
      {
        scrollable: true,
        windowClass: 'modal_fondo',
        size: 'md'
      });

    let datos = {
      confirmar: 'comentario',
      mensaje: "¿Está seguro que desea realizar estos cambios?",
    }

    modal_ref.componentInstance.datos_confirmar = datos;
    modal_ref.result.then((result) => {
      if (result != 'cancelar') { this.crear_resena() }
    }, (reason) => {
    });
  }

  crear_resena() {
    this.cargando = true;
    if (this.datos_resena.comentario == '') { this.toastr.error('Debe escribir un comentario', 'Error', { timeOut: 5000 }) }
    let resena_info = {
      id_origen: this.datos_resena.id,
      comentario: this.datos_resena.comentario,
      calificaciones: this.datos_resena.calificaciones
    }
    this.comentarios_calificaciones_service.crear_resena_producto(resena_info).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando = false;
      } else {
        this.cargando = false;
        this.cerrar_modal();
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      this.cargando = false;
    })
  }

}
