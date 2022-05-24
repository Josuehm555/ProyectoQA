import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public consultar_productos = () => {
    return this.http.get(this.api_url + '/productos', { headers: this.headers, observe: 'response' })
  }

  public consultar_un_producto = (id_producto: any) => {
    return this.http.get(this.api_url + '/productos/' + id_producto, { observe: 'response' })
  }

  public eliminar_un_producto = (id_producto: any) => {
    return this.http.get(this.api_url + '/eliminar_producto/' + id_producto, { headers: this.headers, observe: 'response' })
  }

  public eliminar_un_producto_creador = (id_producto: any) => {
    return this.http.get(this.api_url + '/eliminar_mi_producto/' + id_producto, { headers: this.headers, observe: 'response' })
  }

  public consultar_productos_creador = (id_creador: any) => {
    return this.http.get(this.api_url + '/productos_por_creador/' + id_creador, { headers: this.headers, observe: 'response' })
  }

  public consultar_mis_productos = () => {
    return this.http.get(this.api_url + '/mis_productos', { headers: this.headers, observe: 'response' })
  }

  public consultar_estilos_producto = (id_producto: any) => {
    return this.http.get(this.api_url + '/estilos/' + id_producto, { observe: 'response' })
  }

  public crear_un_producto = (producto_info: any) => {
    return this.http.post(this.api_url + '/crear_producto', producto_info, { headers: this.headers, observe: 'response' })
  }

  public modificar_un_producto = (producto_info: any) => {
    return this.http.post(this.api_url + '/modificar_producto', producto_info, { headers: this.headers, observe: 'response' })
  }

  public modificar_existencia_producto = (producto_info: any) => {
    return this.http.post(this.api_url + '/modificar_existencia', producto_info, { headers: this.headers, observe: 'response' })
  }

  public consultar_productos_creador_resumen = (id_creador: any) => {
    return this.http.get(this.api_url + '/thumbnail_productos_por_creador/' + id_creador, { observe: 'response' })
  }

  public consultar_productos_por_tipo = (id_tipo: any) => {
    return this.http.get(this.api_url + '/productos_por_tipo/' + id_tipo, { observe: 'response' })
  }

  public consultar_productos_thumbnail = () => {
    return this.http.get(this.api_url + '/thumbnail_productos', { observe: 'response' })
  }


}
