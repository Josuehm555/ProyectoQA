import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Canton, Provincia } from 'src/app/models/ubicaciones';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';

@Component({
  selector: 'app-checkout-pago',
  templateUrl: './checkout-pago.component.html',
  styleUrls: ['../compartir.css', './checkout-pago.component.css']
})
export class CheckoutPagoComponent implements OnInit {

  metodo_pago: string = 'pago_1';
  tipos_pago: any[] = []

  public provincias: Provincia[] = []
  public cantones: Canton[] = []

  provincia: string = '1'
  canton: string = '1'

  @Output() mensaje_padre = new EventEmitter<number>();
  @Input() enviado: boolean = false;
  @Input() cargando: boolean = false;
  @Input() misma_direccion: boolean = false;

  pago_form: FormGroup = {} as FormGroup;

  constructor(private ubicaciones_service: UbicacionesService,
    private checkout_service: CheckoutService,
    private toastr: ToastrService, private control_contenedor: ControlContainer,
    private estilos_service: EstilosService) {
    this.pago_form = <FormGroup>this.control_contenedor.control;
  }


  ngOnInit(): void {
    this.obtener_provincias(this.provincia, this.canton);
    this.checkout_service.consultar_tipos_de_pago().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.tipos_pago = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  get form() { return this.pago_form.controls }

  get form_direccion() { return (this.pago_form.get('direccion_pedido') as FormGroup).controls }

  cambiar_pago(evt: any) {
    this.metodo_pago = evt
  }

  anterior() {
    this.mensaje_padre.emit(1)
  }

  pagar() {
    if (!this.misma_direccion) {
      this.form_direccion.provincia.setValue(this.buscar_valor(this.provincias, this.provincia));
      this.form_direccion.canton.setValue(this.buscar_valor(this.cantones, this.canton));
    }
    this.form.id_metodo_pago.setValue(Number((document.querySelector('input[name="forma_pago"]:checked') as any).value));
    this.mensaje_padre.emit(999)
  }

  private buscar_valor(array: any[], valor: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == valor) {
        return array[i].nombre
      }
    }
  }

  obtener_provincias(provincia_actual: string, canton_actual: string) {
    this.ubicaciones_service.obtener_provincias().subscribe((res: any) => {
      let provincias = res.body;
      for (var key in provincias) {
        if (provincias.hasOwnProperty(key)) {
          let prov: Provincia = { id: key, nombre: provincias[key] }
          this.provincias.push(prov);
          if (provincias[key] == provincia_actual) {
            this.provincia = key
          }
        }
      }
      this.obtener_cantones(this.provincia, canton_actual)
    });
  }

  obtener_cantones(event: any, canton_actual: any) {
    this.cantones = []
    this.ubicaciones_service.obtener_cantones(event).subscribe((res: any) => {
      let cantones = res.body;
      for (var key in cantones) {
        if (cantones.hasOwnProperty(key)) {
          let canton: Canton = { id: key, nombre: cantones[key] }
          this.cantones.push(canton);
          if (cantones[key] == canton_actual) {
            this.canton = key
          }
        }
      }
    });
  }

  leer_imagen = (evento: any) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.form.comprobante
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

}
