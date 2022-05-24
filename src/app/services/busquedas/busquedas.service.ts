import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  public consultar_generos_albumes = () => {
    return this.http.get(this.api_url + '/generos_albumes', { observe: 'response' })
  }

  public consultar_presentaciones_albumes = () => {
    return this.http.get(this.api_url + '/presentaciones_albumes', { observe: 'response' })
  }

  public consultar_tipos_conexiones_parlantes = () => {
    return this.http.get(this.api_url + '/tipos_conexiones_parlantes', { observe: 'response' })
  }

  public consultar_tipos_conexiones_audifonos = () => {
    return this.http.get(this.api_url + '/tipos_conexiones_audifonos', { observe: 'response' })
  }

  public consultar_marcas_parlantes = () => {
    return this.http.get(this.api_url + '/marcas_parlantes', { observe: 'response' })
  }

  public consultar_marcas_audifonos = () => {
    return this.http.get(this.api_url + '/marcas_audifonos', { observe: 'response' })
  }

  public consultar_precios_audifonos = () => {
    return this.http.get(this.api_url +'/limites_precios_audifonos', { observe: 'response' })
  }

  public consultar_precios_parlantes = () => {
    return this.http.get(this.api_url +'/limites_precios_parlantes', { observe: 'response' })
  }

  public consultar_precios_albumes = () => {
    return this.http.get(this.api_url + '/limites_precios_albumes', { observe: 'response' })
  }

  public consultar_fechas_blogs = () => {
    return this.http.get(this.api_url + '/limites_fechas_blogs', { observe: 'response' })
  }

  public buscar_albumes = (busqueda_info:any) => {
    return this.http.post(this.api_url + '/buscar_albumes', busqueda_info , { observe: 'response' })
  }

  public buscar_parlantes = (busqueda_info:any) => {
    return this.http.post(this.api_url + '/buscar_parlantes', busqueda_info , { observe: 'response' })
  }

  public buscar_audifonos = (busqueda_info:any) => {
    return this.http.post(this.api_url + '/buscar_audifonos', busqueda_info , { observe: 'response' })
  }

  public buscar_blogs = (busqueda_info:any) => {
    return this.http.post(this.api_url + '/buscar_blogs', busqueda_info , { observe: 'response' })
  }
}
