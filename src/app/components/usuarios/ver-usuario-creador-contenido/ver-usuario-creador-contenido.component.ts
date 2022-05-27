import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { Usuario_Creador_de_Contenido } from 'src/app/models/Usuarios/usuario_creador_contenido';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-ver-usuario-creador-contenido',
  templateUrl: './ver-usuario-creador-contenido.component.html',
  styleUrls: ['./ver-usuario-creador-contenido.component.css']
})
export class VerUsuarioCreadorContenidoComponent implements OnInit {

  usuario: any = {
    caracteristicas: {}
  }
  caracteristicas: any = []
  productos: any = []
  blogs: any = []

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService, private productos_service: ProductosService,
    private blogs_service: BlogsService, private router: Router) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_usuario_creador_contenido(params['id']).subscribe(
        (res: any) => {
          if (res.body.error) {
            this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          } else {
            this.usuario = res.body.resultado as Usuario
            this.crear_caracteristicas_usuario()
            this.consultar_productos()
            this.consultar_blogs()
          }
        }, (error) => {
          this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
        }
      )
    })
  }

  ngOnInit(): void {
  }

  consultar_productos() {
    this.productos_service.consultar_productos_creador_resumen(this.usuario.id_usuario).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.productos = res.body.resultado
      }
    })
  }

  consultar_blogs() {
    this.blogs_service.consultar_blogs_por_creador(this.usuario.id_usuario).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.blogs = res.body.resultado
      }
    })
  }

  crear_caracteristicas_usuario() {
    let usuario_consumidor = this.usuario.caracteristicas as Usuario_Creador_de_Contenido
    let caracteristicas = [
      {
        caracteristica: 'Teléfono',
        valor: usuario_consumidor.celular
      },
      {
        caracteristica: 'Dirección Exacta',
        valor: usuario_consumidor.direccion_exacta
      },
      {
        caracteristica: 'Sitio Web',
        valor: usuario_consumidor.sitio_web
      }
    ];
    this.caracteristicas = caracteristicas
  }

}
