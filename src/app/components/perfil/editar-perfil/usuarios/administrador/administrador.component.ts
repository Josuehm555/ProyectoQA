import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrador-perfil',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorPerfilComponent implements OnInit {

  @Input() enviado: boolean = false;

  administrador_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private control_contenedor: ControlContainer) { }


  ngOnInit(): void {
    this.administrador_form = <FormGroup>this.control_contenedor.control;
  }

  get form() { return this.administrador_form.controls }

  get form_caracteristicas() { return (this.administrador_form.get('caracteristicas') as FormGroup).controls }

}
