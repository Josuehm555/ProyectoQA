import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  producto_form: FormGroup = {} as FormGroup;
  producto_form_copia: string = '';

  enviado: boolean = false;
  cargando: boolean = false;
  sub_form_creado: boolean = false;
  modificar: boolean = true

  private stepper: Stepper = {} as Stepper;
  tipo_producto: number = 1;
  id_producto: number = 0;
  estilo: string = '';

  constructor(private estilos_service: EstilosService, private productos_service: ProductosService,
    private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/productos'])
        }
      });
    if (this.router.getCurrentNavigation()!.extras.state) {
      this.id_producto = this.router.getCurrentNavigation()!.extras.state!.id;
      this.producto_form = this.fb.group({});
      this.crear_form_con_valores()
    }
  }

  crear_form_con_valores() {
    this.productos_service.consultar_un_producto(this.id_producto).subscribe((res: any) => {
      let producto = res.body.resultado;
      this.tipo_producto = producto.caracteristicas.id_tipo;
      this.productos_service.consultar_estilos_producto(this.id_producto).subscribe((res: any) => {
        let estilos = res.body.resultado
        this.producto_form = this.fb.group({
          producto: this.fb.group({
            id_producto: [producto.id_producto, [Validators.required]],
            fecha_lanzamiento: [producto.fecha_lanzamiento, [Validators.required]],
            titulo: [producto.titulo, [Validators.required]],
            precio: [producto.precio, [Validators.required]],
            tiempo_envio: [producto.tiempo_envio, [Validators.required]],
            descripcion: [producto.descripcion, [Validators.required]],
          }),
          estilos: this.fb.array([])
        });
        let estilos_final: any = []
        estilos.forEach((estilo: any) => {
          estilos_final.push(this.estilos_service.crear_estilo_form_modificar(estilo, true))
        });
        this.producto_form.setControl('estilos', this.fb.array(estilos_final || []));

        this.crear_configuracion(producto)
      })
    })
  }

  crear_configuracion(producto_obj: any) {
    this.construir_form(producto_obj)
    this.consultar_estilos()
    this.producto_form_copia = JSON.stringify(this.producto_form.getRawValue())

  }

  consultar_estilos() {
    this.estilo = this.estilos_service.consultar_estilo_producto(this.tipo_producto);

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
    })
  }

  private crear_array(obj: any[], nombre_valor: string, form: FormGroup) {
    form.setControl(nombre_valor, this.fb.array(obj || []));
  }

  private construir_form(producto_obj: any) {
    this.sub_form_creado = false;

    let sub_form: FormGroup = {} as FormGroup;
    let producto = this.producto_form.get("producto") as FormGroup

    let caracteristicas: FormGroup;

    switch (this.tipo_producto) {
      case 1:
        sub_form = this.fb.group({
          id_tipo: this.tipo_producto,
          artista: this.fb.array([]),
          generos: this.fb.array([]),
        })
        producto.addControl('caracteristicas', sub_form);
        caracteristicas = producto.get("caracteristicas") as FormGroup
        this.crear_array(producto_obj.caracteristicas.artista, "artista", caracteristicas)
        this.crear_array(producto_obj.caracteristicas.generos, "generos", caracteristicas)
        break;
      case 2:
      case 3:
        sub_form = this.fb.group({
          id_tipo: this.tipo_producto,
          tipo: this.fb.array([]),
          conexion: this.fb.array([]),
          marca: this.fb.array([]),
        })
        producto.addControl('caracteristicas', sub_form);
        caracteristicas = producto.get("caracteristicas") as FormGroup
        this.crear_array(producto_obj.caracteristicas.tipo, "tipo", caracteristicas)
        this.crear_array(producto_obj.caracteristicas.marca, "marca", caracteristicas)
        this.crear_array(producto_obj.caracteristicas.conexion, "conexion", caracteristicas)
        break;
      default:
        break;
    }
    this.sub_form_creado = true;
  }


  modificar_producto() {

    let json_form = JSON.stringify(this.producto_form.getRawValue());

    if (json_form === this.producto_form_copia) {
      this.toastr.info('No se realizó ningún cambio', 'Sin cambios', { timeOut: 5000 });
      return;
    }

    let producto_info = this.producto_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    if (this.producto_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.productos_service.modificar_un_producto(producto_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Se modificó el producto', { timeOut: 2000 });
          this.cargando = false;
          this.router.navigate(['/inicio/productos'])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

}

