import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';

@Component({
  selector: 'app-parlantes-form',
  templateUrl: './parlantes.component.html',
  styleUrls: ['./parlantes.component.css', '../../crear-producto.component.css']
})
export class ParlantesFormComponent implements OnInit {

  @Input() enviado: boolean = false;
  @Input() modificar: boolean = false;

  precio: string = ''

  parlantes_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private control_contenedor: ControlContainer,
    private estilos_service: EstilosService) {
    this.parlantes_form = (<FormGroup>this.control_contenedor.control).get('producto') as FormGroup;
  }

  ngOnInit(): void {
  }

  get form() { return this.parlantes_form.controls }

  get form_caracteristicas() { return (this.parlantes_form.get('caracteristicas') as FormGroup).controls }

  get tipos(): FormArray { return (this.parlantes_form.get('caracteristicas') as FormGroup).get('tipo') as FormArray }

  get marca(): FormArray { return (this.parlantes_form.get('caracteristicas') as FormGroup).get('marca') as FormArray }

  get conexiones(): FormArray { return (this.parlantes_form.get('caracteristicas') as FormGroup).get('conexion') as FormArray }

  transformar_dinero(elemento: any) {
    this.precio = this.estilos_service.transformar_dinero(elemento)
  }

  nueva_caracteristica(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregar_conexion() {
    this.conexiones.push(this.nueva_caracteristica());
  }
  agregar_tipo() {
    this.tipos.push(this.nueva_caracteristica());
  }

  eliminar_conexion(i: number) {
    this.conexiones.removeAt(i);
  }
  eliminar_tipo(i: number) {
    this.tipos.removeAt(i);
  }

}
