import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creador-contenido-card',
  templateUrl: './creador-contenido-card.component.html',
  styleUrls: ['./creador-contenido-card.component.css']
})
export class CreadorContenidoCardComponent implements OnInit {

  @Input() creador_contenido: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ver_creador_contenido() {
    this.router.navigate(['/ver-usuario-creador-contenido', this.creador_contenido.id_usuario]);
  }

}
