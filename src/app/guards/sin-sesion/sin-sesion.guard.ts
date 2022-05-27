import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class SinSesionGuard implements CanActivate {

  constructor(private acceso_service: AccesoService,
    private router: Router) { }

  // revisa si está loggeado
  canActivate() {
    if (this.acceso_service.esta_autenticado()) {
      this.router.navigate(["inicio/dashboard"]);
      return false;
    } else {
      localStorage.clear();
      return true;
    }
  }

}
