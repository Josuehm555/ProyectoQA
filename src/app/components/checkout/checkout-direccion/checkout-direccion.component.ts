import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import { Canton, Provincia } from 'src/app/models/ubicaciones';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';

@Component({
  selector: 'app-checkout-direccion',
  templateUrl: './checkout-direccion.component.html',
  styleUrls: ['../compartir.css', './checkout-direccion.component.css']
})
export class CheckoutDireccionComponent implements OnInit {

  @Output() mensaje_padre = new EventEmitter<number>();
  @Input() enviado: boolean = false;
  @Output() misma_direccion_evento = new EventEmitter<boolean>();

  misma_direccion: boolean = false;

  public provincias: Provincia[] = []
  public cantones: Canton[] = []

  provincia: string = '1'
  canton: string = '1'

  checkout_form: FormGroup = {} as FormGroup;
  usuario: any = {}

  constructor(private ubicaciones_service: UbicacionesService, private fb: FormBuilder,
    private control_contenedor: ControlContainer,
    private perfil_service: PerfilService) {
    this.checkout_form = <FormGroup>this.control_contenedor.control
  }

  ngOnInit(): void {
    this.perfil_service.consultar_mi_perfil().subscribe((res: any) => {
      if (res.body.resultado) {
        let info = res.body.resultado;
        this.usuario = info;
        this.form_direccion.nombre_consumidor.setValue(this.usuario.nombre)
        if (this.usuario.caracteristicas.celular) this.form_direccion.telefono.setValue(this.usuario.caracteristicas.celular)
        if (this.usuario.caracteristicas.direccion_exacta) this.form_direccion.direccion.setValue(this.usuario.caracteristicas.direccion_exacta)
        if (this.usuario.caracteristicas.provincia) {
          this.provincia = this.usuario.caracteristicas.provincia;
          this.canton = this.usuario.caracteristicas.canton;
          this.obtener_provincias(this.usuario.caracteristicas.provincia, this.usuario.caracteristicas.canton)
        } else {
          this.obtener_provincias(this.provincia, this.canton)
        }
      }
    });
  }

  private buscar_valor(array: any[], valor: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == valor) {
        return array[i].nombre
      }
    }
  }

  siguiente() {
    this.form_direccion.provincia.setValue(this.buscar_valor(this.provincias, this.provincia));
    this.form_direccion.canton.setValue(this.buscar_valor(this.cantones, this.canton));
    this.misma_direccion_evento.emit(this.misma_direccion)
    this.mensaje_padre.emit(2)
  }

  get form() { return this.checkout_form.controls }

  get form_direccion() { return (this.checkout_form.get('direccion_pedido') as FormGroup).controls }

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

}
