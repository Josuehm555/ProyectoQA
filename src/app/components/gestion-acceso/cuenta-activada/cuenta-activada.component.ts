import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';

@Component({
  selector: 'app-cuenta-activada',
  templateUrl: './cuenta-activada.component.html',
  styleUrls: ['./cuenta-activada.component.css']
})
export class CuentaActivadaComponent implements OnInit {

  mostrar_exito: boolean = false;
  mostrar_error: boolean = false;
  titulo: string = "";
  descripcion: string = "Espere un momento mientras procesamos la activación de la cuenta...";

  constructor(private route: ActivatedRoute, private acceso_service: AccesoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let token = params['token'];
      this.acceso_service.activar_cuenta(token).subscribe(
        (res: any) => {
          if (res.body.error) {
            this.titulo = "Error";
            this.descripcion = res.body.error;
            this.mostrar_exito = false;
            this.mostrar_error = true;
          } else {
            this.titulo = "Cuenta Activada";
            this.descripcion = res.body.resultado;
            this.mostrar_exito = true;
            this.mostrar_error = false;
          }
        }, (error) => {
          this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
        }
      );
    });
  }

}
