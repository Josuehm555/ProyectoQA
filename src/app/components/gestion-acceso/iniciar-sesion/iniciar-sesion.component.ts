import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['../compartir-form.css', './iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  sesion_form: FormGroup = {} as FormGroup;
  enviado: Boolean = false;

  constructor(private formBuilder: FormBuilder, private acceso_service: AccesoService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.sesion_form = this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  get form() { return this.sesion_form.controls }

  iniciar_sesion() {
    let sesion_info = this.sesion_form.getRawValue();

    this.enviado = true;

    if (this.sesion_form.invalid) { return; }

    this.acceso_service.iniciar_sesion(sesion_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(`Bienvenido`, 'Usuario autenticado', { timeOut: 2000 });
          this.exito(sesion_info.correo, res.body.resultado);
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

  exito(correo: string, res: any) {
    this.acceso_service.confirmar_iniciar_sesion(correo, res.token, res.id_tipo, res.nombre)
    this.router.navigate(['/inicio']); //navegar a la pagina de dashboard
  }
}
