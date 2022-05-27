import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cantidad_a_traer_global, opciones_slider_global } from 'src/app/models/global';
import { Producto } from 'src/app/models/Productos/producto';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-audifonos',
  templateUrl: './audifonos.component.html',
  styleUrls: ['../compartir.css', './audifonos.component.css']
})
export class AudifonosComponent implements OnInit {

  productos: Producto[] = []
  marcas: any[] = []
  conexiones: any[] = []
  termino: string = ''
  cantidad_a_traer: number = cantidad_a_traer_global;
  pagina: number = -(cantidad_a_traer_global - 1);

  min_precio: number = 0;
  max_precio: number = 0;
  opciones_slider: Options = opciones_slider_global;
  cargando_comentarios: boolean = false;
  cargar_mas: boolean = false;

  constructor(private productos_service: ProductosService, private toastr: ToastrService,
    private busquedas_service: BusquedasService) {
  }

  ngOnInit(): void {
    this.consultar_audifonos();
    this.consultar_filtro_marcas();
    this.consultar_filtro_conexiones();
    this.consultar_filtro_precios();
  }

  consultar_audifonos() {
    this.productos_service.consultar_productos_por_tipo(2).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_filtro_marcas() {
    this.busquedas_service.consultar_marcas_audifonos().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.marcas = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_filtro_conexiones() {
    this.busquedas_service.consultar_tipos_conexiones_audifonos().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.conexiones = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_filtro_precios() {
    this.busquedas_service.consultar_precios_audifonos().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          let precios = res.body.resultado;
          this.min_precio = precios.limite_min;
          this.max_precio = precios.limite_max;
          this.opciones_slider = this.crear_slider();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  crear_slider() {
    return {
      floor: this.min_precio,
      ceil: this.max_precio,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Mín.:</b> ₡' + value;
          case LabelType.High:
            return '<b>Máx.:</b> ₡' + value;
          default:
            return '₡' + value;
        }
      }
    }
  }

  buscar() {
    this.pagina = -(this.cantidad_a_traer - 1);
    this.productos = []
    this.cargar_mas_productos();
  }

  cargar_mas_productos() {
    this.cargando_comentarios = true;

    let marca = (document.querySelector('input[name="marcas_filtro"]:checked') as any)!.value;
    marca == "sin_filtro" ? marca = null : null;
    let tipo_conexion = (document.querySelector('input[name="conexiones_filtro"]:checked') as any)!.value;
    tipo_conexion == "sin_filtro" ? tipo_conexion = null : null;
    let busqueda_info = {
      titulo: this.termino,
      marca: marca,
      tipo_conexion: tipo_conexion,
      precio_min: this.min_precio,
      precio_max: this.max_precio,
      cantidad_a_buscar: this.cantidad_a_traer,
      pagina: this.pagina + this.cantidad_a_traer
    }
    this.busquedas_service.buscar_audifonos(busqueda_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          if (res.body.resultado.cantidad_total == 0) {
            this.toastr.warning('No hay resultados para esta búsqueda', 'Sin resultados', { timeOut: 5000 });
            return;
          }
          this.pagina += this.cantidad_a_traer;
          this.productos = this.productos.concat(res.body.resultado.productos)
          this.productos.length < res.body.resultado.cantidad_total ? this.cargar_mas = true : this.cargar_mas = false;
          this.cargando_comentarios = false;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

}
