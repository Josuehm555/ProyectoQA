import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['../compartir.css', './eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  @Input() datos_eliminar: any;
  cargando: boolean = false;

  constructor(
    public activo_modal: NgbActiveModal,
    private usuarios_service: UsuariosService,
    private productos_service: ProductosService,
    private toastr: ToastrService,
    private categorias_service: CategoriasService,
    private blogs_service: BlogsService,
    private comentarios_calificaciones_service: ComentariosCalificacionesService
  ) { }

  ngOnInit() {
  }

  cerrar_modal() {
    this.activo_modal.close();
  }

  cerrar_modal_cancelar() {
    this.activo_modal.close('cancelar');
  }

  eliminar() {
    switch (this.datos_eliminar.eliminar) {
      case "usuario":
        this.eliminar_usuario()
        break;
      case "producto":
        this.eliminar_producto()
        break;
      case "categoria":
        this.eliminar_categoria()
        break;
      case "blog":
        this.eliminar_blog()
        break;
      case "comentario":
        this.eliminar_comentario_blog()
        break;
      case "resena":
        this.eliminar_resena_producto()
        break;
      default:
        break;
    }
  }

  private eliminar_usuario() {
    this.cargando = true;
    this.usuarios_service.eliminar_un_usuario(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_producto() {
    this.cargando = true;
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "1":
        this.eliminar_producto_administrador()
        break;
      case "2":
        this.eliminar_producto_creador()
        break;
      default:
        this.toastr.error("No tiene permisos para eliminar", 'Error', { timeOut: 5000 });
        break;
    }
  }

  private eliminar_blog() {
    this.cargando = true;
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "1":
        this.eliminar_blog_administrador()
        break;
      case "2":
        this.eliminar_blog_creador()
        break;
      default:
        this.toastr.error("No tiene permisos para eliminar", 'Error', { timeOut: 5000 });
        break;
    }
  }

  private eliminar_producto_creador() {
    this.productos_service.eliminar_un_producto_creador(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.cargando = false;
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_producto_administrador() {
    this.productos_service.eliminar_un_producto(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_blog_creador() {
    this.blogs_service.eliminar_un_blog_creador(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.cargando = false;
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_blog_administrador() {
    this.blogs_service.eliminar_un_blog(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_categoria() {
    this.cargando = true;
    this.categorias_service.eliminar_una_categoria(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_comentario_blog() {
    this.cargando = true;
    this.comentarios_calificaciones_service.eliminar_comentario_blog(this.datos_eliminar.id, this.datos_eliminar.id_blog).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  private eliminar_resena_producto() {
    this.cargando = true;
    this.comentarios_calificaciones_service.eliminar_resena_producto(this.datos_eliminar.id).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal()
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

}