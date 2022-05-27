import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { cantidad_a_traer_global } from 'src/app/models/global';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';
import { ResenaProductoModalComponent } from '../../modals/resena-producto-modal/resena-producto-modal.component';

@Component({
  selector: 'app-comentarios-productos',
  templateUrl: './comentarios-productos.component.html',
  styleUrls: ['./comentarios-productos.component.css']
})
export class ComentariosProductosComponent implements OnInit {

  @Input() id_producto: number = 0;
  cargando: boolean = false;
  cargando_comentarios: boolean = false;

  cantidad_a_traer: number = cantidad_a_traer_global;
  pagina: number = -(cantidad_a_traer_global - 1);
  resenas: any[] = [];
  cargar_mas: boolean = true;
  sesion:boolean = false;

  constructor(private modal_service: NgbModal,
    private comentarios_calificaciones_service: ComentariosCalificacionesService,
    private toastr: ToastrService, private acceso_service:AccesoService) { }

  ngOnInit(): void {
    this.sesion = this.acceso_service.esta_autenticado();
  }
  ngOnChanges(changes: SimpleChanges) {
    changes.id_producto.currentValue != 0 ? this.consultar_resenas() : null;
  }

  abrir_modal_eliminar() {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'resena',
      mensaje: "¿Está seguro que desea eliminar esta reseña?",
      id: this.id_producto,
    }

    modal_ref.componentInstance.datos_eliminar = datos;
    modal_ref.result.then((result) => {
      if (result != 'cancelar') { window.location.reload() }
    }, (reason) => {
    });
  }

  abrir_modal_resena() {
    const modal_ref = this.modal_service.open(ResenaProductoModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
        size: 'lg'
      });

    let datos = {
      resena: 'producto',
      calificaciones: this.resenas[0].calificaciones,
      comentario: this.resenas[0].comentario,
      id: this.id_producto
    }

    modal_ref.componentInstance.datos_resena = datos;
    modal_ref.result.then((result) => {
      if (result != 'cancelar') {
        window.location.reload()
      }
    }, (reason) => {
    });
  }

  consultar_resenas(){
    this.sesion ? this.consultar_resenas_producto() : this.consultar_resenas_producto_publico()
  }

  consultar_resenas_producto_publico() {
    this.cargando_comentarios = true;

    this.comentarios_calificaciones_service.consultar_resenas_producto_publico(
      this.id_producto!,
      this.cantidad_a_traer,
      this.pagina + this.cantidad_a_traer
    ).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando_comentarios = false;
      } else {
        this.pagina += this.cantidad_a_traer;
        this.resenas = this.resenas.concat(res.body.resultado.resenas)
        this.resenas.length < res.body.resultado.cantidad_total ? this.cargar_mas = true : this.cargar_mas = false;
        this.cargando_comentarios = false;
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      this.cargando_comentarios = false;
    })
  }

  consultar_resenas_producto() {
    this.cargando_comentarios = true;

    this.comentarios_calificaciones_service.consultar_resenas_producto(
      this.id_producto!,
      this.cantidad_a_traer,
      this.pagina + this.cantidad_a_traer
    ).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando_comentarios = false;
      } else {
        this.pagina += this.cantidad_a_traer;
        this.resenas = this.resenas.concat(res.body.resultado.resenas)
        this.resenas.length < res.body.resultado.cantidad_total ? this.cargar_mas = true : this.cargar_mas = false;
        this.cargando_comentarios = false;
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      this.cargando_comentarios = false;
    })
  }



}
