import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public carrito = () => {
    return this.http.get(this.api_url + '/carrito', { headers: this.headers, observe: 'response' })
  }

  public carrito_resumen = () => {
    return this.http.get(this.api_url + '/thumbnail_carrito', { headers: this.headers, observe: 'response' })
  }

  public agregar_al_carrito = (info_producto:any) => {
    return this.http.post(this.api_url + '/agregar_al_carrito', info_producto, { headers: this.headers, observe: 'response' })
  }

  public eliminar_del_carrito = (info_producto:any) => {
    return this.http.post(this.api_url + '/eliminar_del_carrito', info_producto, { headers: this.headers, observe: 'response' })
  }

  public cambiar_cantidad_del_carrito = (info_producto:any) => {
    return this.http.post(this.api_url + '/cambiar_cantidad_carrito', info_producto, { headers: this.headers, observe: 'response' })
  }
}
