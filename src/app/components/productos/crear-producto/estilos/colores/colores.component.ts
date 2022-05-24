import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css', '../../crear-producto.component.css', '../compartir-estilos.css']
})
export class ColoresComponent implements OnInit {

  @Input() enviado: boolean = false;
  @Input() modificar: boolean = false;

  colores_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private control_contenedor: ControlContainer,
    private estilos_service: EstilosService) {
    this.colores_form = <FormGroup>this.control_contenedor.control;
  }

  ngOnInit(): void {
  }

  get estilos(): FormArray { return this.colores_form.get('estilos') as FormArray }

  fotos(i: number): FormArray { return this.estilos.controls[i].get('fotos') as FormArray }

  agregar_estilo() {
    this.estilos.push(this.estilos_service.crear_estilo_form());
  }

  agregar_foto(i: number) {
    this.fotos(i).push(this.estilos_service.nueva_caracteristica());
  }

  eliminar_estilo(i: number) {
    this.estilos.removeAt(i);
  }
  eliminar_foto(i: number, j: number) {
    this.fotos(i).removeAt(j);
  }

  leer_imagen = (evento: any, i: number, j: number) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.fotos(i).at(j);
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

  obtener_imagen(i:number, j:number){
    return this.fotos(i).at(j).value;
  }




}