import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public consultar_categorias = () => {
    return this.http.get(this.api_url + '/categorias', { headers: this.headers, observe: 'response' })
  }

  public consultar_categorias_publico = () => {
    return this.http.get(this.api_url + '/categorias_publico', { headers: this.headers, observe: 'response' })
  }

  public crear_una_categoria = (categoria_info: any) => {
    return this.http.post(this.api_url + '/crear_categoria', categoria_info, { headers: this.headers, observe: 'response' })
  }

  public eliminar_una_categoria = (id_categoria:any) => {
    return this.http.get(this.api_url +'/eliminar_categoria/'+id_categoria, { headers: this.headers, observe: 'response' })
  }

}
