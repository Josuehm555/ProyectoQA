import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-asociar-productos',
  templateUrl: './asociar-productos.component.html',
  styleUrls: ['./asociar-productos.component.css']
})
export class AsociarProductosComponent implements OnInit {

  @Input() productos_asociados: any[] = [];
  @Input() mis_productos: any[] = [];

  cargado:boolean = false;

  constructor(private blogs_service: BlogsService,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    this.blogs_service.consultar_productos_sin_blogs().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          let productos = res.body.resultado;
          for (let i = 0; i < productos.length; i++) {
            this.mis_productos.push(productos[i]);
          }
          this.cargado = true;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

}
