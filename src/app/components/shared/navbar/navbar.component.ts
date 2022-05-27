import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { CarritoResumenComponent } from '../../carrito/carrito-resumen/carrito-resumen.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  @ViewChild(CarritoResumenComponent) carrito_resumen: CarritoResumenComponent = {} as CarritoResumenComponent;

  mostrar_nav_espacio: boolean = false;
  sesion: boolean = false;
  mostrar_nav = true;
  rol = localStorage.getItem("rol");
  nombre = localStorage.getItem("nombre");

  cantidad_carrito: number = 0


  constructor(private router: Router, private acceso_service: AccesoService,
    private carrito_local_service: CarritoLocalService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationStart)
    )
      .subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          if (event.navigationTrigger != undefined && event.navigationTrigger.includes("popstate")) {
            this.cambiar_a_navbar_home();
          }

        }
        else if (event.urlAfterRedirects.includes('/checkout')) {
          this.mostrar_nav = false;
        }
        else if (event.urlAfterRedirects.includes('/home')) {
          this.cambiar_a_navbar_home()
        } else {
          this.mostrar_nav = true;
          this.cambiar_a_navbar_normal()
        }
      });
    this.carrito_local_service.carrito_actualizado.subscribe((carrito_actual: any) => {
      this.cantidad_carrito = carrito_actual.items.length
    });
  }

  cambiar_a_navbar_home() {
    document.documentElement.style.setProperty('--fondo_navbar', "linear-gradient(to right, rgba(15, 119, 210, 1), rgba(15, 119, 210, 1))");
    document.documentElement.style.setProperty('--texto_navbar', "white");
    document.documentElement.style.setProperty('--hover_navbar', "black");
    this.mostrar_nav_espacio = false;
  }

  cambiar_a_navbar_normal() {
    document.documentElement.style.setProperty('--fondo_navbar', "transparent");
    document.documentElement.style.setProperty('--texto_navbar', "black");
    document.documentElement.style.setProperty('--hover_navbar', "var(--rojizo)");
    this.mostrar_nav_espacio = true;
  }

  ngOnInit(): void {
    this.sesion = this.acceso_service.esta_autenticado();
  }

  abrir_cerrar_carrito() {
    this.carrito_resumen.abrir_cerrar()
  }


}
