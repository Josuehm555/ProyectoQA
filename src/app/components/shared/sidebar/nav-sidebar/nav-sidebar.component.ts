import { Component, OnInit } from '@angular/core';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {

  nombre = localStorage.getItem("nombre");
  constructor(private acceso_service: AccesoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cerrar_sesion(){
    this.acceso_service.cerrar_sesion();
    this.router.navigate(["#"]); 
  }

}
