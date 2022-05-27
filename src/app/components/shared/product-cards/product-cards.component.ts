import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Productos/producto';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

  @Input() producto: Producto = {
    id_creador: 0,
    titulo: '',
    id_producto: 0,
    nombre_creador: '',
    caracteristicas: {} as any,
    cantidad_resenas: 0,
    calificacion: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ver_producto() {
    this.router.navigate(['/ver-producto', this.producto.id_producto]);
  }

}
