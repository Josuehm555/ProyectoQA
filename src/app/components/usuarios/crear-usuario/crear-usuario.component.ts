import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';
import { Provincia, Canton } from 'src/app/models/ubicaciones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario_Creador_de_Contenido } from 'src/app/models/Usuarios/usuario_creador_contenido';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuario_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;

  private stepper: Stepper = {} as Stepper;

  public provincias: Provincia[] = []
  public cantones: Canton[] = []

  constructor(private ubicaciones_service: UbicacionesService, private fb: FormBuilder,
    private usuarios_service: UsuariosService, private toastr: ToastrService, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/usuarios'])
        }
      });

    this.usuario_form = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      caracteristicas: this.fb.group(
        {
          id_tipo: [2, [Validators.required]],
          imagen: [''],
          celular: ['', [Validators.required]],
          descripcion: ['', [Validators.required]],
          sitio_web: [''],
          provincia: ['1', [Validators.required]],
          canton: ['1', [Validators.required]],
          direccion_exacta: ['']
        })
    });
  }

  get form() { return this.usuario_form.controls }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper1") as HTMLElement, {
      linear: false,
      animation: true,
      selectors: {
        steps: '.step',
        trigger: '.step-trigger',
        stepper: '.bs-stepper'
      }
    });
    this.obtener_provincias()
  }

  obtener_provincias() {
    this.ubicaciones_service.obtener_provincias().subscribe((res: any) => {
      let provincias = res.body;
      for (var key in provincias) {
        if (provincias.hasOwnProperty(key)) {
          let prov: Provincia = { id: key, nombre: provincias[key] }
          this.provincias.push(prov);
        }
      }
      this.obtener_cantones(1);
    });
  }

  obtener_cantones(event: any) {
    this.cantones = []
    this.ubicaciones_service.obtener_cantones(event).subscribe((res: any) => {
      let cantones = res.body;
      for (var key in cantones) {
        if (cantones.hasOwnProperty(key)) {
          let canton: Canton = { id: key, nombre: cantones[key] }
          this.cantones.push(canton);
        }
      }
    });
  }

  private buscar_valor(array: any[], valor: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == valor) {
        return array[i].nombre
      }
    }
  }

  crear_usuario() {
    let usuario_info = this.usuario_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    if (this.usuario_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    usuario_info = JSON.parse(JSON.stringify(usuario_info),
      (key, value) => value === null || value === '' ? undefined : value);


    usuario_info = usuario_info as Usuario_Creador_de_Contenido


    let provincia = usuario_info.caracteristicas.provincia;
    usuario_info.caracteristicas.provincia = this.buscar_valor(this.provincias, provincia)

    let canton = usuario_info.caracteristicas.canton;
    usuario_info.caracteristicas.canton = this.buscar_valor(this.cantones, canton)


    this.usuarios_service.crear_un_usuario(usuario_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Usuario Creado', { timeOut: 2000 });
          this.cargando = false;
          this.router.navigate(['/inicio/usuarios'])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

}
