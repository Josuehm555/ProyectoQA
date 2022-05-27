import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ControlContainer } from '@angular/forms'
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';

@Component({
  selector: 'app-creador-contenido-form',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css', '../../crear-usuario.component.css']
})
export class CreadorContenidoFormComponent implements OnInit {

  @Input() enviado: boolean = false;

  creador_contenido_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private control_contenedor: ControlContainer, private estilos_service: EstilosService) { }

  ngOnInit(): void {
    this.creador_contenido_form = <FormGroup>this.control_contenedor.control;
  }

  get form() { return this.creador_contenido_form.controls }

  get form_caracteristicas() { return (this.creador_contenido_form.get('caracteristicas') as FormGroup).controls }

  leer_imagen = (evento: any) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.form_caracteristicas.imagen
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

  obtener_imagen() {
    return this.form_caracteristicas.imagen.value;
  }

}
