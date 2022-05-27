import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cantidad_a_traer_global } from 'src/app/models/global';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { BusquedasService } from 'src/app/services/busquedas/busquedas.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['../compartir.css', './blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: any[] = []
  categorias: any[] = []
  termino: string = ''
  cantidad_a_traer: number = cantidad_a_traer_global;
  pagina: number = -(cantidad_a_traer_global - 1);


  rango_fechas: Date[] = this.obtener_dias(new Date("2021-05-01"), new Date("2021-05-02"));
  min_fecha = this.rango_fechas[0].getTime();
  max_fecha = this.rango_fechas[this.rango_fechas.length - 1].getTime();
  opciones_slider: Options = {
    stepsArray: this.rango_fechas.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: LabelType): string => {
      return this.fecha_formato(new Date(value));
    }
  };

  cargando_blogs: boolean = false;
  cargar_mas: boolean = false;

  constructor(private blogs_service: BlogsService, private toastr: ToastrService,
    private busquedas_service: BusquedasService, private categorias_service: CategoriasService) {
  }

  private obtener_dias(comienzo: Date, fin: Date) {
    for (var arr = [], dt = new Date(comienzo); dt <= fin; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  private fecha_formato(date: Date) {
    var strArray = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
  }

  ngOnInit(): void {
    this.consultar_blogs();
    this.consultar_filtro_categorias();
    this.consultar_filtro_fechas();
  }

  consultar_blogs() {
    this.blogs_service.consultar_blogs().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.blogs = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_filtro_categorias() {
    this.categorias_service.consultar_categorias_publico().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.categorias = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  consultar_filtro_fechas() {
    this.busquedas_service.consultar_fechas_blogs().subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          let fechas = res.body.resultado;
          this.opciones_slider = this.crear_slider(fechas.limite_min, fechas.limite_max);
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  crear_slider(min: string, max: string) {
    let rango_fechas = this.obtener_dias(new Date(min), new Date(max));
    this.min_fecha = rango_fechas[0].getTime();
    this.max_fecha = rango_fechas[rango_fechas.length - 1].getTime();
    return {
      stepsArray: rango_fechas.map((date: Date) => {
        return { value: date.getTime() };
      }),
      translate: (value: number, label: LabelType): string => {
        return this.fecha_formato(new Date(value));
      }
    };
  }

  buscar() {
    this.pagina = -(this.cantidad_a_traer - 1);
    this.blogs = []
    this.cargar_mas_blogs();
  }

  cargar_mas_blogs() {
    this.cargando_blogs = true;

    let categoria = (document.querySelector('input[name="categorias_filtro"]:checked') as any)!.value;
    categoria == "sin_filtro" ? categoria = null : null;

    let busqueda_info = {
      titulo: this.termino,
      id_categoria: categoria,
      fecha_min: new Date(this.min_fecha).toISOString(),
      fecha_max: new Date(this.max_fecha).toISOString(),
      cantidad_a_buscar: this.cantidad_a_traer,
      pagina: this.pagina + this.cantidad_a_traer
    }
    this.busquedas_service.buscar_blogs(busqueda_info).subscribe(
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
          this.blogs = this.blogs.concat(res.body.resultado.blogs)
          this.blogs.length < res.body.resultado.cantidad_total ? this.cargar_mas = true : this.cargar_mas = false;
          this.cargando_blogs = false;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }


}
