
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { precio_envio_global } from 'src/app/models/global';
import { PrecioSubtotalPipe } from 'src/app/pipes/carrito/subtotal/precio-subtotal.pipe';
import { PrecioTotalPipe } from 'src/app/pipes/carrito/total/precio-total.pipe';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { CarritoService } from 'src/app/services/carrito/carrito/carrito.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../compartir.css', './checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  pagina_actual: number = 1;

  carrito: any = []
  precio_total: number = 0
  precio_envio: number = precio_envio_global;

  checkout_form: FormGroup = {} as FormGroup;
  pago_form: FormGroup = {} as FormGroup;
  sub_form_creado: boolean = false;

  enviado: boolean = false;
  misma_direccion: boolean = false;
  cargando: boolean = false;

  constructor(private carrito_local_service: CarritoLocalService,
    private carrito_service: CarritoService, private toastr: ToastrService,
    private fb: FormBuilder, private checkout_service: CheckoutService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.carrito_service.carrito().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          if (res.body.resultado.items.length == 0) {
            this.router.navigate(['/carrito'])
          }
          this.carrito = res.body.resultado.items
          this.precio_total = this.carrito_local_service.precio_total;
          this.construir_form_pedido();
          this.construir_form_pago();
          this.sub_form_creado = true;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  get form_checkout() { return this.checkout_form.controls }
  get form_pago() { return this.pago_form.controls }

  get form_checkout_direccion() { return (this.checkout_form.get('direccion_pedido') as FormGroup).controls }
  get form_pago_direccion() { return (this.pago_form.get('direccion_pedido') as FormGroup).controls }

  construir_form_pedido() {
    const total_pipe = new PrecioTotalPipe();
    const subtotal_pipe = new PrecioSubtotalPipe();
    this.checkout_form = this.fb.group({
      carrito: this.fb.array(this.carrito),
      subtotal: subtotal_pipe.transform(this.precio_total),
      costo_envio: this.precio_envio,
      monto_total: total_pipe.transform(this.precio_total, this.precio_envio),
      direccion_pedido: this.fb.group({
        direccion: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        canton: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        nombre_consumidor: ['', [Validators.required]]
      })
    });
  }

  construir_form_pago() {
    const total_pipe = new PrecioTotalPipe();
    const subtotal_pipe = new PrecioSubtotalPipe();
    this.pago_form = this.fb.group({
      id_pedido: [0, [Validators.required]],
      id_metodo_pago: ['', [Validators.required]],
      comprobante: [''],
      subtotal: subtotal_pipe.transform(this.precio_total),
      costo_envio: this.precio_envio,
      monto_total: total_pipe.transform(this.precio_total, this.precio_envio),
      direccion_pedido: this.fb.group({
        direccion: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        canton: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        nombre_consumidor: ['', [Validators.required]]
      })
    });
  }

  completar_pago_form() {
    this.form_pago_direccion.direccion.setValue(this.form_checkout_direccion.direccion.value);
    this.form_pago_direccion.provincia.setValue(this.form_checkout_direccion.provincia.value);
    this.form_pago_direccion.canton.setValue(this.form_checkout_direccion.canton.value);
    this.form_pago_direccion.cedula.setValue(this.form_checkout_direccion.cedula.value);
    this.form_pago_direccion.telefono.setValue(this.form_checkout_direccion.telefono.value);
    this.form_pago_direccion.nombre_consumidor.setValue(this.form_checkout_direccion.nombre_consumidor.value);
  }

  recibir_mensaje($event: any) {
    if ($event == 999) {
      this.realizar_checkout()
      return;
    }
    this.pagina_actual = $event
  }

  cambiar_direccion($event: any) {
    this.misma_direccion = $event;
  }

  cambiar_pagina(pagina: number) {
    this.pagina_actual = pagina
  }

  realizar_checkout() {
    if (this.misma_direccion) {
      this.completar_pago_form()
    }

    let checkout_info = this.checkout_form.getRawValue();
    let pago_info = this.pago_form.getRawValue();
    if (pago_info.id_metodo_pago == 2 || pago_info.id_metodo_pago == 3) {
      if (pago_info.comprobante == '') {
        this.toastr.error('Debe subir el comprobante de pago', 'Error', { timeOut: 5000 });
        this.cargando = false;
        return;
      }
    }

    this.enviado = true;
    this.cargando = true;

    if (this.checkout_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    if (this.pago_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.checkout_service.realizar_checkout(checkout_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          pago_info.id_pedido = res.body.resultado;
          this.checkout_service.realizar_pago(pago_info).subscribe(
            (res: any) => {
              this.toastr.clear();
              if (res.body.error) {
                this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
                this.cargando = false;
              } else {
                this.toastr.success(res.body.resultado, 'Pedido Completado', { timeOut: 2000 });
                this.cargando = false;
                this.carrito_local_service.consultar_carrito_resumen();
                this.router.navigate(['/carrito']);
              }
            }, (error) => {
              this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
            }
          );
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );


  }

}
