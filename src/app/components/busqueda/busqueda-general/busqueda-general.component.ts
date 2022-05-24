import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { Producto } from 'src/app/models/Productos/producto';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['../../gestion-acceso/compartir-form.css', './busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {

  buscar_form: FormGroup = {} as FormGroup;
  resultados: any[] = [];
  resultados_busqueda: any[] = [];
  resultados_listos: boolean = false;
  tipo_busqueda: string = 'productos';


  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService, private router: Router,
    private usuarios_service: UsuariosService,
    private productos_service: ProductosService,
    private blogs_service: BlogsService) { }

  ngOnInit(): void {
    this.buscar_form = this.formBuilder.group({
      termino: ['']
    });
    this.consultar_productos();
  }

  get form() { return this.buscar_form.controls }

  confirmar_resultados() {
    if (this.resultados_busqueda.length == 0) {
      this.toastr.warning('No hay resultados para esta búsqueda', 'Sin resultados', { timeOut: 5000 });
    }
    this.resultados_listos = true;
  }

  private consultar_creadores_contenido() {
    this.usuarios_service.consultar_creadores_contenido().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.resultados = res.body.resultado;
          let texto = this.buscar_form.getRawValue().termino;
          texto == '' ? this.resultados_busqueda = this.resultados : this.resultados_busqueda = this.buscar_resultado_vendedores(texto);
          this.confirmar_resultados();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  private consultar_productos() {
    this.productos_service.consultar_productos_thumbnail().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.resultados = res.body.resultado;
          let texto = this.buscar_form.getRawValue().termino;
          texto == '' ? this.resultados_busqueda = this.resultados : this.resultados_busqueda = this.buscar_resultado_productos(texto);
          this.confirmar_resultados();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  private consultar_blogs() {
    this.blogs_service.consultar_blogs().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.resultados = res.body.resultado;
          let texto = this.buscar_form.getRawValue().termino;
          texto == '' ? this.resultados_busqueda = this.resultados : this.resultados_busqueda = this.buscar_resultado_blogs(texto);
          this.confirmar_resultados();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  buscar() {
    this.resultados_listos = false;
    this.tipo_busqueda = (document.querySelector('input[name="tipo_busqueda"]:checked') as any)!.value;

    switch (this.tipo_busqueda) {
      case "productos":
        this.consultar_productos();
        break;
      case "vendedores":
        this.consultar_creadores_contenido();
        break;
      case "blogs":
        this.consultar_blogs();
        break;
      default:
        break;
    }
  }

  buscar_resultado_productos(texto: string): Producto[] {
    return this.resultados.filter((item: any) => {
      const termino = texto.toLowerCase();
      return item.titulo.toLowerCase().includes(termino)
        || (item.precio + '').includes(termino)
        || item.caracteristicas.nombre_tipo.toLowerCase().includes(termino);
    });
  }

  buscar_resultado_vendedores(texto: string): Usuario[] {
    return this.resultados.filter((item: any) => {
      const termino = texto.toLowerCase();
      return item.nombre.toLowerCase().includes(termino)
        || item.caracteristicas.provincia.toLowerCase().includes(termino)
        || item.caracteristicas.canton.toLowerCase().includes(termino);
    });
  }

  buscar_resultado_blogs(texto: string): Blog[] {
    return this.resultados.filter((item: any) => {
      const termino = texto.toLowerCase();
      if (item.nombre_categoria != null) {
        return item.titulo.toLowerCase().includes(termino)
          || item.nombre_categoria.toLowerCase().includes(termino)
          || item.nombre_creador.toLowerCase().includes(termino)
      }else{
        return item.titulo.toLowerCase().includes(termino)
          || item.nombre_creador.toLowerCase().includes(termino)
      }
    });
  }

}

