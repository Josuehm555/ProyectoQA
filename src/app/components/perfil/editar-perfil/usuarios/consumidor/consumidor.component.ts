import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-consumidor-perfil',
  templateUrl: './consumidor.component.html',
  styleUrls: ['./consumidor.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ConsumidorPerfilComponent implements OnInit {

  modelo: string = '';
  ano_actual = (new Date()).getFullYear();
  @Input() enviado: boolean = false;
  consumidor_form: FormGroup = {} as FormGroup;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private fb: FormBuilder, private control_contenedor: ControlContainer) { }


  ngOnInit(): void {
    this.consumidor_form = <FormGroup>this.control_contenedor.control;
    this.modelo = this.form_caracteristicas['cumpleanos'].value
  }

  get form() { return this.consumidor_form.controls }

  get form_caracteristicas() { return (this.consumidor_form.get('caracteristicas') as FormGroup).controls }

  cambiar_fecha(){
    this.form_caracteristicas['cumpleanos'].setValue(this.modelo)
  }

}
