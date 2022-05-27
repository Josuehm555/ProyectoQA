import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Idioma } from 'src/app/models/idioma';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-tabla-blogs',
  templateUrl: './tabla-blogs.component.html',
  styleUrls: ['../../../../animaciones.css','./tabla-blogs.component.css']
})
export class TablaBlogsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  blogs: any[] = [];
  trigger_tabla: Subject < any > = new Subject<any>();
  rol: string = ''

  constructor(private http: HttpClient, private blogs_service:BlogsService,
    private modal_service: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string
    this.iniciar_tabla();
    this.consultar_blogs();
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


    /* =========== VER blogs =============== */
  
    private consultar_blogs() {
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "2":
        this.consultar_blogs_creador()
        break;
      default:
        this.consultar_todos_blogs()
    }

  }
  
    private consultar_todos_blogs() {
    this.blogs_service.consultar_blogs_admin().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.blogs = res.body.resultado;
          this.trigger_tabla.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }
  
  private consultar_blogs_creador() {
    this.blogs_service.consultar_mis_blogs().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.blogs = res.body.resultado;
          this.trigger_tabla.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  ver_blog(id_blog: any) {
    this.router.navigate(['/ver-blog', id_blog]);
  }


  /* ============= MODIFICAR BLOG =============== */

  modificar_blog(id_blog: any) {
    this.router.navigate(['/inicio/modificar-blog', { state: { id: id_blog } }]);
  }

  /* ============= ELIMINAR BLOG =============== */

  abrir_modal_eliminar(id_blog: number, titulo_blog: string) {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'blog',
      mensaje: "Se eliminará el blog " + titulo_blog + ". Los productos asociados ya no tendrán una referencia a un blog.",
      id: id_blog,
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

