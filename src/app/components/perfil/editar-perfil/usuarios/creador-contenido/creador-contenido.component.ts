import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creador-contenido-perfil',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css']
})
export class CreadorContenidoPerfilComponent implements OnInit {

  @Input() enviado: boolean = false;

  creador_contenido_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private control_contenedor: ControlContainer) { }

  ngOnInit(): void {
    this.creador_contenido_form = <FormGroup>this.control_contenedor.control;
  }

  get form() { return this.creador_contenido_form.controls }

  get form_caracteristicas() { return (this.creador_contenido_form.get('caracteristicas') as FormGroup).controls }
  

}
