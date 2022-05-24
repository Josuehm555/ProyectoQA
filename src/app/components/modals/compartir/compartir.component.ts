import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compartir',
  templateUrl: './compartir.component.html',
  styleUrls: ['../compartir.css','./compartir.component.css']
})
export class CompartirComponent implements OnInit {

  @Input() datos_compartir: any;
  cargando: boolean = false;

  constructor(
    public activo_modal: NgbActiveModal,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit() {
  }

  cerrar_modal() {
    this.activo_modal.close();
  }

  copiar_enlace() {
    var enlace = document.getElementById("enlace") as any;
    enlace.select();
    enlace.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(enlace.value);
  }

}
