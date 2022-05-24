import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { enlace_global } from 'src/app/models/global';
import { Producto } from 'src/app/models/Productos/producto';
import { EspecificacionesProductoService } from 'src/app/services/construcciones/especificaciones-producto/especificaciones-producto.service';
import { EstilosService } from 'src/app/services/construcciones/estilos/estilos.service';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { CarritoService } from 'src/app/services/carrito/carrito/carrito.service';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CompartirComponent } from '../../modals/compartir/compartir.component';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  producto: Producto = {
    id_creador: 0,
    titulo: '',
    id_producto: 0,
    nombre_creador: '',
    caracteristicas: {} as any,
    cantidad_resenas: 0,
    calificacion: 0
  }
  id_estilo_seleccionado: number = 1;
  existencia_estilo_seleccionado: number = 0;

  cantidad: number = 1;


  nombre_estilo: string = ''
  estilos: any[] = []
  especificaciones: any[] = []
  imagenes: any[] = []
  precio: number = 0
  sesion: boolean = false;
  mi_resena: boolean = false;

  constructor(private ruta_activated: ActivatedRoute,
    private productos_service: ProductosService, private toastr: ToastrService,
    private estilos_service: EstilosService, private especificaciones_service: EspecificacionesProductoService,
    private acceso_service: AccesoService, private carrito_service: CarritoService,
    private carrito_local_service: CarritoLocalService,
    private modal_service: NgbModal,
    private router: Router,
    private comentarios_calificaciones_service: ComentariosCalificacionesService) {
    
    this.sesion = this.acceso_service.esta_autenticado();
    this.ruta_activated.params.subscribe(params => {
      this.productos_service.consultar_un_producto(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.producto = res.body.resultado;
          this.precio = this.producto.precio!;
          this.consultar_estilos_producto();
          this.consultar_especificaciones_producto();
          this.sesion ? this.consultar_mi_resena() : null;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  cambiar_atributos(estilo: any) {
    this.cambiar_imagenes(estilo.fotos)
    this.cambiar_precio(estilo.precio)
    this.existencia_estilo_seleccionado = estilo.existencia
  }

  cambiar_imagenes(fotos: any) {
    this.imagenes = fotos
  }

  cambiar_precio(precio: any) {
    this.precio = this.producto.precio + precio
  }

  consultar_estilos_producto() {
    let nombre_estilo = this.estilos_service.consultar_estilo_producto(this.producto.caracteristicas.id_tipo);
    this.productos_service.consultar_estilos_producto(this.producto.id_producto).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.nombre_estilo = nombre_estilo;
          this.estilos = res.body.resultado;
          this.cambiar_atributos(this.estilos[0])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_especificaciones_producto() {
    this.especificaciones = this.especificaciones_service.crear_especificaciones_producto(this.producto);
  }

  agregar() {
    if (this.cantidad < this.existencia_estilo_seleccionado) {
      this.cantidad = this.cantidad + 1;
    }else{
      this.toastr.error('No hay suficiente cantidad en el inventario', 'Error', { timeOut: 5000 });
    }
  }
  quitar() {
    if (this.cantidad != 1) {
      this.cantidad = this.cantidad - 1;
    }
  }

  agregar_producto() {

    if (!this.sesion) {
      this.toastr.warning('Debe iniciar sesión para comprar', 'Inicie Sesión', { timeOut: 5000 });
      return;
    }
    else if (localStorage.getItem('rol') != '3') {
      this.toastr.error('No tiene permisos para comprar', 'Error', { timeOut: 5000 });
      return;
    }

    if (this.existencia_estilo_seleccionado == -1) {
      this.cantidad = -1
    }

    let producto = {
      id_producto: this.producto.id_producto,
      id_estilo: this.id_estilo_seleccionado,
      cantidad: this.cantidad
    }

    this.carrito_service.agregar_al_carrito(producto).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Producto Agregado', { timeOut: 5000 });
          this.carrito_local_service.consultar_carrito_resumen();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  ver_creador(id_usuario: any) {
    this.router.navigate(['/ver-usuario-creador-contenido', id_usuario]);
  }

  ver_blog(id_blog: any) {
    this.router.navigate(['/ver-blog', id_blog]);
  }

  abrir_modal_compartir() {
    const modal_ref = this.modal_service.open(CompartirComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      compartir: 'producto',
      enlace: enlace_global + this.producto.enlace
    }

    modal_ref.componentInstance.datos_compartir = datos;
    modal_ref.result.then((result) => {
    }, (reason) => {
    });
  }

  consultar_mi_resena() {
    this.comentarios_calificaciones_service.consultar_resenas_producto(this.producto.id_producto, 1, 1).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        if (res.body.resultado.resenas[0]) {
          this.mi_resena = res.body.resultado.resenas[0].es_autor_actual
        }
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
    })
  }

}
