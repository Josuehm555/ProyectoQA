import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-modificar-cantidad-producto',
  templateUrl: './modificar-cantidad-producto.component.html',
  styleUrls: ['./modificar-cantidad-producto.component.css']
})
export class ModificarCantidadProductoComponent implements OnInit {

  producto_form: FormGroup = {} as FormGroup;
  producto_titulo:string = '';

  enviado: boolean = false;
  cargando: boolean = false;
  form_creado: boolean = false;

  id_producto: number = 0;
  tipo_producto: number = 1;


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
      this.producto_form = this.fb.group({
        estilos: this.fb.array([])
      });
      this.crear_form_con_valores()
    }
  }

  crear_form_con_valores() {
    this.form_creado = false;
    this.productos_service.consultar_un_producto(this.id_producto).subscribe((res: any) => {
      let producto = res.body.resultado;
      this.producto_titulo = producto.titulo;
      this.tipo_producto = producto.caracteristicas.id_tipo;

      this.productos_service.consultar_estilos_producto(this.id_producto).subscribe((res: any) => {
        let estilos = res.body.resultado

        let estilos_final: any = []
        estilos.forEach((estilo: any) => {
          if (estilo.existencia != -1) {
            estilos_final.push(this.estilos_service.crear_estilo_form_modificar_existencia(estilo, true))
          }
        });
        this.producto_form.setControl('estilos', this.fb.array(estilos_final || []));
      })
    })
    this.form_creado = true;
  }

  ngOnInit(): void {
  }

  get estilos(): FormArray { return this.producto_form.get('estilos') as FormArray }

  modificar_producto() {

    let producto_info = this.producto_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    if (this.producto_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.productos_service.modificar_existencia_producto(producto_info).subscribe(
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
