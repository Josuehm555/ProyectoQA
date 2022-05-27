import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Idioma } from 'src/app/models/idioma';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-tabla-categorias',
  templateUrl: './tabla-categorias.component.html',
  styleUrls: ['../../../../animaciones.css', './tabla-categorias.component.css']
})
export class TablaCategoriasComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  categorias: Categoria[] = [];
  trigger_tabla: Subject<any> = new Subject<any>();
  rol: string = ''

  constructor(private http: HttpClient, private categorias_service: CategoriasService,
    private modal_service: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string
    this.iniciar_tabla();
    this.consultar_categorias();
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

  private consultar_categorias() {
    this.categorias_service.consultar_categorias().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.categorias = res.body.resultado;
          this.trigger_tabla.next();
        }
      },
      (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

  }

  /* ============= ELIMINAR CATEGORIA =============== */

  abrir_modal_eliminar(id_categoria: number, nombre_categoria: string) {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'categoria',
      mensaje: "Se eliminará la categoría " + nombre_categoria + ". Los blogs asociados a esta categoría se quedarán sin categoría.",
      id: id_categoria,
    }

    modal_ref.componentInstance.datos_eliminar = datos;
    modal_ref.result.then((result) => {
      if(result != 'cancelar'){window.location.reload()}
    }, (reason) => {
    });
  }

  formatear_fecha(fecha: Date) {
    return moment.utc(fecha).format('DD/MM/YYYY')
  }

  ngOnDestroy(): void {
    this.trigger_tabla.unsubscribe();
  }

}
