import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { Usuario_Consumidor } from 'src/app/models/Usuarios/usuario_consumidor';

@Component({
  selector: 'app-ver-usuario-consumidor',
  templateUrl: './ver-usuario-consumidor.component.html',
  styleUrls: ['../../../../animaciones.css', './ver-usuario-consumidor.component.css']
})
export class VerUsuarioConsumidorComponent implements OnInit {

  usuario: any = {
    caracteristicas: {}
  }

  caracteristicas: any = []

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_un_usuario(params['id']).subscribe(
        (res: any) => {
          if (res.body.error) {
            this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          } else {
            this.usuario = res.body.resultado as Usuario
            this.crear_caracteristicas_usuario()
          }
        }, (error) => {
          this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
        }
      )
    })
  }

  ngOnInit(): void {
  }

  crear_caracteristicas_usuario() {
    let usuario_consumidor = this.usuario.caracteristicas as Usuario_Consumidor
    let caracteristicas = [
      {
        caracteristica: 'Teléfono',
        valor: usuario_consumidor.celular
      },
      {
        caracteristica: 'Dirección Exacta',
        valor: usuario_consumidor.direccion_exacta
      },
      {
        caracteristica: 'Correo',
        valor: this.usuario.correo
      },
      {
        caracteristica: 'Cumpleaños',
        valor: usuario_consumidor.cumpleanos
      },
    ];
    this.caracteristicas = caracteristicas
  }


}
