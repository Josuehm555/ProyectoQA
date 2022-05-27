import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Canton, Provincia } from 'src/app/models/ubicaciones';
import { Tipos_Usuario } from 'src/app/models/Usuarios/tipos_usuarios';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { UsuariosFactoryService } from 'src/app/services/construcciones/usuarios/usuarios-factory.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { UbicacionesService } from 'src/app/services/ubicaciones/ubicaciones.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  usuario_form: FormGroup = {} as FormGroup;
  contrasena_form: FormGroup = {} as FormGroup;

  sub_form_creado: boolean = false;
  usuario: Usuario = {
    correo: '',
    id_usuario: 0,
    nombre: '',
    caracteristicas: {} as Tipos_Usuario
  }

  enviado: boolean = false;
  cargando: boolean = false;


  public provincias: Provincia[] = []
  public cantones: Canton[] = []

  provincia: string = '1'
  canton: string = '1'

  rol: string = localStorage.getItem("rol") as string;

  constructor(private ubicaciones_service: UbicacionesService,
    private perfil_service: PerfilService, private fb: FormBuilder,
    private usuarios_builder_service: UsuariosFactoryService,
    private estilos_service: EstilosService,
    private toastr: ToastrService,
    private router: Router) {
    this.usuario_form = this.fb.group({
      nombre: ['', [Validators.required]]
    });
    this.contrasena_form = this.fb.group({
      contrasena: ['', [Validators.required]],
      confirmar: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.perfil_service.consultar_mi_perfil().subscribe((res: any) => {
      if (res.body.resultado) {
        let info = res.body.resultado;
        this.usuario = info
        if (this.rol == '2' || this.rol == '3') {
          this.obtener_provincias(info.caracteristicas.provincia, info.caracteristicas.canton)
        };
        this.usuario_form.controls['nombre'].setValue(info.nombre);
        this.construir_form(info)
      }

    });
  }

  get form() { return this.usuario_form.controls }
  get form_caracteristicas() { return (this.usuario_form.get('caracteristicas') as FormGroup).controls }
  get form_contrasena() { return this.contrasena_form.controls }

  obtener_provincias(provincia_actual: string, canton_actual: string) {
    this.ubicaciones_service.obtener_provincias().subscribe((res: any) => {
      let provincias = res.body;
      for (var key in provincias) {
        if (provincias.hasOwnProperty(key)) {
          let prov: Provincia = { id: key, nombre: provincias[key] }
          this.provincias.push(prov);
          if (provincias[key] == provincia_actual) {
            this.provincia = key
          }
        }
      }
      this.obtener_cantones(this.provincia, canton_actual)
    });
  }

  obtener_cantones(event: any, canton_actual: any) {
    this.cantones = []
    this.ubicaciones_service.obtener_cantones(event).subscribe((res: any) => {
      let cantones = res.body;
      for (var key in cantones) {
        if (cantones.hasOwnProperty(key)) {
          let canton: Canton = { id: key, nombre: cantones[key] }
          this.cantones.push(canton);
          if (cantones[key] == canton_actual) {
            this.canton = key
          }
        }
      }
    });
  }

  private construir_form(usuario_obj: any) {
    this.sub_form_creado = false;

    let sub_form: FormGroup = this.usuarios_builder_service.construir_form_usuario(this.rol, usuario_obj)
    this.usuario_form.addControl('caracteristicas', sub_form);

    this.sub_form_creado = true;
  }

  leer_imagen = (evento: any) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.form_caracteristicas.imagen
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

  obtener_imagen() {
    if (this.form_caracteristicas.imagen) {
      return this.form_caracteristicas.imagen.value;
    }
  }

  private buscar_valor(array: any[], valor: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == valor) {
        return array[i].nombre
      }
    }
  }

  editar_perfil() {
    let usuario_info = this.usuario_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    if (this.usuario_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    if (usuario_info.caracteristicas.provincia) {
      usuario_info.caracteristicas.provincia = this.buscar_valor(this.provincias, this.provincia)
      usuario_info.caracteristicas.canton = this.buscar_valor(this.cantones, this.canton)
    }

    this.perfil_service.editar_perfil(usuario_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Información editada', { timeOut: 2000 });
          this.cargando = false;
          this.router.navigate(['/inicio/'])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

  cambiar_contrasena() {
    let contrasena_info = this.contrasena_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    if (this.contrasena_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }
    if (contrasena_info.contrasena != contrasena_info.confirmar) {
      this.toastr.error('Las contraseñas no coinciden', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.perfil_service.cambiar_contrasena(contrasena_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Información editada', { timeOut: 2000 });
          this.cargando = false;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

}
