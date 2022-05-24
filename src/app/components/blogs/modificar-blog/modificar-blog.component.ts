import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Categoria } from 'src/app/models/categoria';
import { editor_config_global } from 'src/app/models/editor';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { AsociarProductosComponent } from '../crear-blog/asociar-productos/asociar-productos.component';

@Component({
  selector: 'app-modificar-blog',
  templateUrl: './modificar-blog.component.html',
  styleUrls: ['./modificar-blog.component.css']
})
export class ModificarBlogComponent implements OnInit {

  editor_config: AngularEditorConfig = editor_config_global;

  blog_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;
  modificar: boolean = false;
  categorias: Categoria[] = []
  productos_asociados: any[] = [];
  mis_productos: any[] = [];
  sub_form_creado:boolean = false;

  private stepper: Stepper = {} as Stepper;
  id_blog: number = 0;

  @ViewChild(AsociarProductosComponent) asociacion: AsociarProductosComponent | undefined;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router,
    private categorias_service: CategoriasService, private estilos_service: EstilosService,
    private blog_service: BlogsService) {

    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/blogs'])
        }
    });
    if (this.router.getCurrentNavigation()!.extras.state) {
      this.id_blog = this.router.getCurrentNavigation()!.extras.state!.id;
      this.crear_form_con_valores()
    }
  }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper1") as HTMLElement, {
      linear: false,
      animation: true
    });
  }


  crear_form_con_valores() {
    this.blog_service.consultar_un_blog(this.id_blog).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        let blog = res.body.resultado;
        this.blog_form = this.fb.group({
          id_blog: [blog.id_blog, [Validators.required]],
          titulo: [blog.titulo, [Validators.required]],
          imagen: [blog.imagen, [Validators.required]],
          imagen_entrada: [''],
          id_categoria: [blog.id_categoria, [Validators.required]],
          contenido: [blog.contenido, [Validators.required]],
          etiquetas: this.fb.array(blog.etiquetas),
          productos: this.fb.array(blog.productos)
        });
        this.mis_productos = blog.productos;
        blog.productos.forEach((item: any) => {
          this.productos_asociados.push(item.id_producto);
        });
        this.sub_form_creado = true;
        this.consultar_categorias();
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
    });
  }

  consultar_categorias() {
    this.categorias_service.consultar_categorias_publico().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.categorias = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }


  get form() { return this.blog_form.controls }

  get etiquetas(): FormArray {
    return this.blog_form.get('etiquetas') as FormArray
  }

  nueva_etiqueta(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregar_etiqueta() {
    this.etiquetas.push(this.nueva_etiqueta());
  }

  eliminar_etiqueta(i: number) {
    this.etiquetas.removeAt(i);
  }

  leer_imagen = (evento: any) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.form.imagen
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

  obtener_imagen() {
    return this.form.imagen.value;
  }

  modificar_blog() {
    let blog_info = this.blog_form.getRawValue();
    blog_info.productos = this.asociacion?.productos_asociados;

    this.enviado = true;
    this.cargando = true;


    if (this.blog_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }
    this.blog_service.modificar_un_blog(blog_info).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.router.navigate(['/inicio/blogs'])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );



    this.enviado = false;
  }

}
