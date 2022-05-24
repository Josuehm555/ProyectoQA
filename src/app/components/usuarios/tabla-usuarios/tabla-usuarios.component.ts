import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../models/Usuarios/usuario';
import { Idioma } from '../../../models/idioma'
import { UsuariosService } from '../../../services/usuarios/usuarios.service'
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['../../../../animaciones.css', './tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  usuarios: Usuario[] = [];
  trigger_tabla: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private usuarios_service: UsuariosService,
    private toastr: ToastrService, private router: Router, private modal_service: NgbModal) { }

  ngOnInit(): void {
    this.iniciar_tabla();
    this.consultar_usuarios();
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

  /*========= VER USUARIOS ========== */

  private consultar_usuarios() {
    this.usuarios_service.consultar_usuarios().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.usuarios = res.body.resultado;
          this.trigger_tabla.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  ver_usuario(tipo_usuario: any, id_usuario: any) {
    switch (tipo_usuario) {
      case 2:
        this.router.navigate(['/ver-usuario-creador-contenido', id_usuario]);
        break;
      case 3:
        this.router.navigate(['/inicio/ver-usuario-consumidor', id_usuario]);
        break;
    }
  }

  /* ============ ELIMINAR USUARIOS ============= */

  abrir_modal_eliminar(id_usuario: number, nombre_usuario: string) {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'usuario',
      mensaje: "Se eliminará el usuario " + nombre_usuario +
        ". Si el usuario es un creador de contenido, se eliminarán los productos y blogs creados por dicho usuario.",
      id: id_usuario,
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


