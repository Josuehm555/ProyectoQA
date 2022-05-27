import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent implements OnInit {

  @Input() calificacion: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
