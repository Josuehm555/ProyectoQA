import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  private provincias_url = "https://ubicaciones.paginasweb.cr/provincias.json";
  private cantones_url = "https://ubicaciones.paginasweb.cr/provincia/"

  constructor(private http: HttpClient) { }

  public obtener_provincias = () => {
    return this.http.get(this.provincias_url, { observe: 'response' })
  }

  public obtener_cantones = (id_provincia:string) => {
    return this.http.get(this.cantones_url + id_provincia + '/cantones.json', { observe: 'response' })
  }
}
