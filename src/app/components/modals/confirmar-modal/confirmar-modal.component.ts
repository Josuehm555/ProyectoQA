import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmar-modal',
  templateUrl: './confirmar-modal.component.html',
  styleUrls: ['../compartir.css','./confirmar-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmarModalComponent implements OnInit {

  @Input() datos_confirmar: any;

  constructor(public activo_modal: NgbActiveModal,) { }

  ngOnInit(): void {
  }

  cerrar_modal(mensaje: string) {
    this.activo_modal.close(mensaje);
  }

}
